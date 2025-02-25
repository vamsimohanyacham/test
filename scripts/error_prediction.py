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

# Step 1: Load the data (build_logs.csv)
data = pd.read_csv('build_logs.csv')  # Make sure the CSV file is in the same directory as this script

# Step 2: Separate features (X) and target (y)
X = data[['build_duration', 'dependency_changes', 'failed_previous_builds']]  # Features
y = data['error_occurred']  # Target

# Step 3: Split the data into training and testing sets (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 4: Feature scaling (important for some ML models)
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)  # Fit and transform the training data
X_test = scaler.transform(X_test)  # Transform the test data

# Step 5: Train a machine learning model (Random Forest)
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Step 6: Evaluate the model
y_pred = model.predict(X_test)
print(f'Accuracy: {accuracy_score(y_test, y_pred)}')
print(f'Classification Report:\n{classification_report(y_test, y_pred)}')

# Step 7: Save the trained model and scaler
joblib.dump(model, 'build_error_predictor.pkl')
joblib.dump(scaler, 'scaler.pkl')

print("Model and Scaler saved to files!")

