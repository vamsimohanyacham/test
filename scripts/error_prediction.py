import argparse
import json
import re

# Enhanced prediction function with multiple error patterns
def predict_error(log_file):
    with open(log_file, 'r') as f:
        logs = f.read()

    # Initialize the errors list
    errors = []

    # Check for specific error patterns in the logs
    if re.search(r'invalid configuration', logs, re.IGNORECASE):
        errors.append('Error: Build failed due to invalid configuration')

    if re.search(r'missing dependency', logs, re.IGNORECASE):
        errors.append('Error: Missing dependency detected in the build')

    if re.search(r'version mismatch', logs, re.IGNORECASE):
        errors.append('Error: Version mismatch detected between dependencies')

    if re.search(r'command failed', logs, re.IGNORECASE):
        errors.append('Error: A command failed during the build process')

    # If errors are found, return a failure status, otherwise success
    if errors:
        return {"status": "fail", "message": "Errors detected in the build logs.", "details": errors}
    else:
        return {"status": "success", "message": "Build seems to be fine."}

def main():
    parser = argparse.ArgumentParser(description="Error prediction based on build logs")
    parser.add_argument('--log_file', required=True, help='Path to the build log file')
    parser.add_argument('--prediction_file', required=True, help='Path to save the prediction result')

    args = parser.parse_args()

    # Run error prediction
    result = predict_error(args.log_file)

    # Save the prediction result to a JSON file
    with open(args.prediction_file, 'w') as f:
        json.dump(result, f, indent=4)

    print(f"Prediction saved to {args.prediction_file}")

if __name__ == "__main__":
    main()
