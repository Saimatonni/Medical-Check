from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS
from flask_pymongo import PyMongo
import bcrypt
import pickle
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import preprocess_input, decode_predictions
from tensorflow.keras.applications import ResNet50
from bson import ObjectId
from flask import jsonify
from PIL import Image
from io import BytesIO
import base64

app = Flask(__name__)
CORS(app)

# MongoDB Configuration
app.config['MONGO_URI'] = 'mongodb://localhost:27017/medical_check'
mongo = PyMongo(app)

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    fullname = data.get('fullname')
    password = data.get('password')
    join_as = data.get('join_as')
    existing_user = mongo.db.users.find_one({'email': email})
    if existing_user:
        return jsonify({'message': 'Email already exists'}), 400
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    new_user = {
        'email': email,
        'fullname': fullname,
        'password': hashed_password,
        'join_as': join_as
    }
    mongo.db.users.insert_one(new_user)

    return jsonify({'message': 'User registered successfully'}), 201



@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    user = mongo.db.users.find_one({'email': email})
    
    if user:
        if bcrypt.checkpw(password.encode('utf-8'), user['password']):
            response_data = {
                'userid': str(user['_id']),
                'join_as': user['join_as']
            }
            return jsonify(response_data), 200
        else:
            return jsonify({'message': 'Invalid email or password'}), 401
    else:
        return jsonify({'message': 'User not found'}), 404


def ValuePredictor(to_predict_list, size):
    loaded_model = joblib.load('Models/heart_model')
    to_predict = np.array(to_predict_list).reshape(1, size)
    result = loaded_model.predict(to_predict)
    return result[0]

@app.route('/predict_heart', methods=['POST'])
def predict_heart():
    userid = request.args.get('userid')
    data = request.get_json()
    to_predict_list = [data[key] for key in sorted(data.keys())] 
    to_predict_list = list(map(float, to_predict_list))
    
    result = ValuePredictor(to_predict_list, 11)
    
    prediction_text = "Danger" if int(result) == 1 else "Healthy"
    user = mongo.db.users.find_one({'_id': ObjectId(userid)})
    fullname = user.get('fullname') if user else None
    prediction_data = {
        "fullname": fullname,
        "prediction": int(result),
        "prediction_text": prediction_text,
        "request_values": data
    }
    mongo.db.heart_predictions.insert_one(prediction_data)
    
    response_data = {
        "fullname": fullname,
        "prediction": int(result),
        "prediction_text": prediction_text,
        "request_values": data
    }
    
    return jsonify(response_data)


@app.route('/predict_diabetes', methods=['POST'])
def predict_diabetes():
    userid = request.args.get('userid')
    data = request.get_json()

    pregnancies = float(data.get('pregnancies', 0))
    glucose = float(data.get('glucose', 0))
    bloodpressure = float(data.get('bloodpressure', 0))
    skinthickness = float(data.get('skinthickness', 0))
    insulin = float(data.get('insulin', 0))
    bmi = float(data.get('bmi', 0))
    dpf = float(data.get('dpf', 0))
    age = float(data.get('age', 0))

    classifier = pickle.load(open('Models/diabetes.pkl', 'rb'))
    data_array = np.array([pregnancies, glucose, bloodpressure, skinthickness, insulin, bmi, dpf, age]).reshape(1, -1)
    my_prediction = int(classifier.predict(data_array)[0])
    prediction_text = "Danger" if my_prediction == 1 else "Safe"

    user = mongo.db.users.find_one({'_id': ObjectId(userid)})
    fullname = user.get('fullname') if user else None

    prediction_data = {
        "fullname": fullname,
        "prediction": my_prediction,
        "prediction_text": prediction_text,
        "request_values": {
            "pregnancies": pregnancies,
            "glucose": glucose,
            "bloodpressure": bloodpressure,
            "skinthickness": skinthickness,
            "insulin": insulin,
            "bmi": bmi,
            "dpf": dpf,
            "age": age
        }
    }

    mongo.db.diabetes_predictions.insert_one(prediction_data)

    response_data = {
        "userid": userid,
        "fullname": fullname,
        "prediction": my_prediction,
        "prediction_text": prediction_text,
        "request_values": {
            "pregnancies": pregnancies,
            "glucose": glucose,
            "bloodpressure": bloodpressure,
            "skinthickness": skinthickness,
            "insulin": insulin,
            "bmi": bmi,
            "dpf": dpf,
            "age": age
        }
    }

    return jsonify(response_data)




@app.route('/diabetes_reports', methods=['GET'])
def get_diabetes_reports():
    diabetes_reports = list(mongo.db.diabetes_predictions.find({}, {'_id': 0}))
    return jsonify(diabetes_reports)

@app.route('/heart_reports', methods=['GET'])
def get_heart_reports():
    heart_reports = list(mongo.db.heart_predictions.find({}, {'_id': 0}))
    return jsonify(heart_reports)


model = ResNet50(weights='imagenet')

def predict_malaria(file):
    img = image.load_img(BytesIO(file.read()), target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)
    preds = model.predict(img_array)
    predicted_labels = decode_predictions(preds, top=1)[0]
    
    label = predicted_labels[0][1]
    probability = predicted_labels[0][2]
    if 'malaria' in label.lower():
        malaria_presence = "Malaria Detected"
    else:
        malaria_presence = "No Malaria Detected"
    
    return malaria_presence, probability

@app.route('/malaria-predict', methods=['POST'])
def predict():
    userid = request.args.get('userid')
    if userid is None:
        return jsonify({'error': 'userId query parameter is missing'})
    
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    
    try:
        malaria_presence, probability = predict_malaria(file)
        user = mongo.db.users.find_one({'_id': ObjectId(userid)})
        fullname = user.get('fullname') if user else None
        prediction_data = {
            'userid': userid,
            'fullname': fullname,
            'prediction': malaria_presence,
            'probability': float(probability),
        }
        mongo.db.malaria_predictions.insert_one(prediction_data)
        return jsonify({'fullname': fullname, 'prediction': malaria_presence, 'probability': float(probability)})
    except Exception as e:
        return jsonify({'error': str(e)})
    
@app.route('/malaria_reports', methods=['GET'])
def get_malaria_reports():
    malaria_reports = list(mongo.db.malaria_predictions.find({}, {'_id': 0}))
    return jsonify(malaria_reports)


if __name__ == '__main__':
    app.run(debug=True)

