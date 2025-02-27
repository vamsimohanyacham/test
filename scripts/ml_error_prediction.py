import argparse
import pickle
import json

# Load the trained model
with open('build_error_prediction_model.pkl', 'rb') as f:
    model = pickle.load(f)

def make_prediction(build_duration, dependency_changes, failed_previous_builds):
    # Prepare the input data for the model
    input_data = [[build_duration, dependency_changes, failed_previous_builds]]
    
    # Make the prediction
    prediction = model.predict(input_data)
    
    # Map the prediction to 'Success' or 'Fail'
    build_status = 'Success' if prediction[0] == 0 else 'Fail'
    
    # Prepare the response structure
    response = {
        "status": "success" if build_status == 'Success' else "fail",
        "message": "No potential issues detected in the build." if build_status == 'Success' else "Potential issues detected in the build.",
        "details": []
    }

    # Add additional details based on the model prediction and input features
    if build_duration > 300:
        response["details"].append("Warning: Build duration is unusually long.")
    if dependency_changes > 0:
        response["details"].append("Warning: Significant dependency changes detected.")
    if failed_previous_builds > 0:
        response["details"].append("Warning: The build has failed previously.")

    return response

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--build_duration', type=int, required=True)
    parser.add_argument('--dependency_changes', type=int, required=True)
    parser.add_argument('--failed_previous_builds', type=int, required=True)
    parser.add_argument('--prediction_file', type=str, required=True)
    args = parser.parse_args()

    # Make the prediction
    prediction = make_prediction(args.build_duration, args.dependency_changes, args.failed_previous_builds)

    # Write the prediction to a file
    with open(args.prediction_file, 'w') as f:
        json.dump(prediction, f, indent=4)
