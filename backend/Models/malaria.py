import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.applications.resnet50 import preprocess_input, decode_predictions

# Load pre-trained ResNet50 model
model = ResNet50(weights='imagenet')

def predict_malaria(image_path):
    # Load and preprocess the image
    img = image.load_img(image_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)

    # Predict class probabilities
    preds = model.predict(img_array)
    
    # Decode predictions
    predicted_labels = decode_predictions(preds, top=1)[0]
    
    # Get the predicted label and its probability
    label = predicted_labels[0][1]
    probability = predicted_labels[0][2]
    
    # Map the predicted label to malaria presence or absence
    if 'malaria' in label.lower():
        malaria_presence = "Malaria Detected"
    else:
        malaria_presence = "No Malaria Detected"
    
    return malaria_presence, probability

# Example usage:
image_path = "cell.jpeg"
predicted_label, probability = predict_malaria(image_path)
print("Prediction:", predicted_label)
print("Probability:", probability)

