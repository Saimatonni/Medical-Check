# import libraries
import pandas as pd 
import numpy as np 
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from xgboost import XGBClassifier
import pickle


df_diabetes = pd.read_csv("diabetes.csv")

x_diabetes = df_diabetes.drop(['Outcome'], axis=1)
y_diabetes = df_diabetes['Outcome']

X_train_diabetes, X_test_diabetes, y_train_diabetes, y_test_diabetes = train_test_split(x_diabetes, y_diabetes, test_size=0.3, random_state=51)

models_diabetes = {
    "XGBoost": XGBClassifier(),
    "Random Forest": RandomForestClassifier(),
    "KNN": KNeighborsClassifier(),
    "Decision Tree": DecisionTreeClassifier()
}

scores_diabetes = {}

for name, model in models_diabetes.items():
    model.fit(X_train_diabetes, y_train_diabetes)
    score_diabetes = model.score(X_test_diabetes, y_test_diabetes)
    scores_diabetes[name] = score_diabetes
    print(f"{name} Accuracy: {score_diabetes}")

best_model_name_diabetes = max(scores_diabetes, key=scores_diabetes.get)
best_model_diabetes = models_diabetes[best_model_name_diabetes]
print(f"\nBest Model: {best_model_name_diabetes}")

with open('diabetes.pkl', 'wb') as f_diabetes:
    pickle.dump(best_model_diabetes, f_diabetes)

