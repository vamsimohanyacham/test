import argparse
import pickle
import json
import os

model_path = os.path.join(os.getcwd(), 'trained_models', 'build_error_prediction_model.pkl')

if not os.path.exists(model_path):
    raise FileNotFoundError(f"Model file not found: {model_path}")

try:
    with open(model_path, 'rb') as f:
        model = pickle.load(f)
except Exception as e:
    raise RuntimeError(f"Error loading model: {e}")

def make_prediction(build_duration, dependency_changes, failed_previous_builds):
    input_data = [[build_duration, dependency_changes, failed_previous_builds]]
    
    if any(x is None or x < 0 for x in input_data[0]):
        raise ValueError("Invalid input values: All inputs must be non-negative integers.")

    prediction = model.predict(input_data)
    build_status = 'Success' if prediction[0] == 0 else 'Fail'
    
    response = {
        "status": "success" if build_status == 'Success' else "fail",
        "message": "No potential issues detected in the build." if build_status == 'Success' else "Potential issues detected in the build.",
        "details": []
    }

    if build_duration > 300:
        response["details"].append("Warning: Build duration is unusually long.")
    if dependency_changes > 0:
        response["details"].append("Warning: Significant dependency changes detected.")
    if failed_previous_builds > 0:
        response["details"].append("Warning: The build has failed previously.")

    return response

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--build_duration', type=int, required=True, help="Build duration in seconds.")
    parser.add_argument('--dependency_changes', type=int, required=True, help="Number of dependency changes.")
    parser.add_argument('--failed_previous_builds', type=int, required=True, help="Number of failed previous builds.")
    parser.add_argument('--prediction_file', type=str, required=True, help="Path to save the prediction result as JSON.")
    args = parser.parse_args()

    if args.build_duration < 0 or args.dependency_changes < 0 or args.failed_previous_builds < 0:
        raise ValueError("All input values (build_duration, dependency_changes, failed_previous_builds) must be non-negative.")

    prediction = make_prediction(args.build_duration, args.dependency_changes, args.failed_previous_builds)

    try:
        with open(args.prediction_file, 'w') as f:
            json.dump(prediction, f, indent=4)
        print(f"Prediction written to: {args.prediction_file}")
    except Exception as e:
        raise RuntimeError(f"Error writing prediction to file: {e}")
