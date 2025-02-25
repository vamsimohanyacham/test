import argparse
import json

def predict_error(build_duration, dependency_changes, failed_previous_builds):
    errors = []

    # Predict failure based on build duration
    if build_duration > 120:
        errors.append('Warning: Build duration is unusually long.')

    # Predict failure based on the number of dependencies changed
    if dependency_changes > 5:
        errors.append('Warning: A large number of dependencies have been modified.')

    # Predict failure based on previous build failures
    if failed_previous_builds > 2:
        errors.append('Warning: Multiple recent build failures detected.')

    if errors:
        return {"status": "fail", "message": "Potential issues detected in the build.", "details": errors}
    else:
        return {"status": "success", "message": "Build appears to be stable."}

def main():
    parser = argparse.ArgumentParser(description="Error prediction based on build metadata")
    parser.add_argument('--build_duration', type=int, required=True, help='Duration of the build in minutes')
    parser.add_argument('--dependency_changes', type=int, required=True, help='Number of dependencies changed')
    parser.add_argument('--failed_previous_builds', type=int, required=True, help='Number of failed previous builds')
    parser.add_argument('--prediction_file', required=True, help='Path to save the prediction result')

    args = parser.parse_args()

    # Run error prediction
    result = predict_error(args.build_duration, args.dependency_changes, args.failed_previous_builds)

    # Save the prediction result to a JSON file
    with open(args.prediction_file, 'w') as f:
        json.dump(result, f, indent=4)

    print(f"Prediction saved to {args.prediction_file}")

if __name__ == "__main__":
    main()
