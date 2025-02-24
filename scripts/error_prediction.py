import sys
import json

def predict_error(log_file):
    try:
        with open(log_file, 'r') as f:
            logs = f.read()

        # Example heuristic: if error messages are found, return a prediction
        if 'ERROR' in logs or 'FAIL' in logs:
            return {'error': 'Build failure detected', 'severity': 'high'}
        else:
            return {'error': 'Build succeeded', 'severity': 'low'}

    except Exception as e:
        return {'error': str(e), 'severity': 'unknown'}

if __name__ == '__main__':
    log_file = sys.argv[1]
    prediction = predict_error(log_file)
    with open(f'../build_log/prediction_results/build_error_predictions_{log_file.split("/")[-1]}.json', 'w') as f:
        json.dump(prediction, f)
