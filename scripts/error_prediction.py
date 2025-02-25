# import argparse
# import json

# def predict_error(build_duration, dependency_changes, failed_previous_builds):
#     errors = []

#     # Predict failure based on build duration
#     if build_duration > 120:
#         errors.append('Warning: Build duration is unusually long.')

#     # Predict failure based on the number of dependencies changed
#     if dependency_changes > 5:
#         errors.append('Warning: A large number of dependencies have been modified.')

#     # Predict failure based on previous build failures
#     if failed_previous_builds > 2:
#         errors.append('Warning: Multiple recent build failures detected.')

#     if errors:
#         return {"status": "fail", "message": "Potential issues detected in the build.", "details": errors}
#     else:
#         return {"status": "success", "message": "Build appears to be stable."}

# def main():
#     parser = argparse.ArgumentParser(description="Error prediction based on build metadata")
#     parser.add_argument('--build_duration', type=int, required=True, help='Duration of the build in minutes')
#     parser.add_argument('--dependency_changes', type=int, required=True, help='Number of dependencies changed')
#     parser.add_argument('--failed_previous_builds', type=int, required=True, help='Number of failed previous builds')
#     parser.add_argument('--prediction_file', required=True, help='Path to save the prediction result')

#     args = parser.parse_args()

#     # Run error prediction
#     result = predict_error(args.build_duration, args.dependency_changes, args.failed_previous_builds)

#     # Save the prediction result to a JSON file
#     with open(args.prediction_file, 'w') as f:
#         json.dump(result, f, indent=4)

#     print(f"Prediction saved to {args.prediction_file}")

# if __name__ == "__main__":
#     main()

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
import joblib
import argparse
import json

# Step 1: Load the dataset (CSV file with build logs)
def load_data(file_path):
    data = pd.read_csv(file_path)
    return data

# Step 2: Train the machine learning model
def train_model(X_train, y_train):
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    return model

# Step 3: Evaluate the model
def evaluate_model(model, X_test, y_test):
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    report = classification_report(y_test, y_pred)
    print(f'Accuracy: {accuracy}')
    print(f'Classification Report:\n{report}')

# Step 4: Save the model and scaler
def save_model(model, scaler, model_path, scaler_path):
    joblib.dump(model, model_path)
    joblib.dump(scaler, scaler_path)
    print(f"Model saved to {model_path}")
    print(f"Scaler saved to {scaler_path}")

# Step 5: Predict error for new build
def predict_error(model, scaler, build_data):
    # Scale the build data before prediction
    scaled_data = scaler.transform([build_data])
    prediction = model.predict(scaled_data)
    return prediction[0]

def main():
    parser = argparse.ArgumentParser(description="Error prediction for Jenkins build logs")
    parser.add_argument('--build_duration', type=int, required=True, help='Build duration in minutes')
    parser.add_argument('--dependency_changes', type=int, required=True, help='Number of dependencies changed')
    parser.add_argument('--failed_previous_builds', type=int, required=True, help='Number of failed previous builds')
    parser.add_argument('--prediction_file', required=True, help='Path to save the prediction result')

    args = parser.parse_args()

    # Step 1: Load historical data from the CSV file
    data = load_data('C:/ProgramData/Jenkins/.jenkins/jobs/test/workspace/scripts/build_logs.csv')
    
    # Step 2: Separate features (X) and target (y)
    X = data[['build_duration', 'dependency_changes', 'failed_previous_builds']]  # Features
    y = data['error_occurred']  # Target

    # Step 3: Split the data into training and testing sets (80% train, 20% test)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Step 4: Feature scaling
    scaler = StandardScaler()


