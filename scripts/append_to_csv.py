import sys
import pandas as pd

# Get arguments passed from Jenkins pipeline
build_duration = int(sys.argv[1])
dependency_changes = int(sys.argv[2])
failed_previous_builds = int(sys.argv[3])
csv_file = sys.argv[4]

# Data to append to the CSV
data = {
    'build_duration': [build_duration],
    'dependency_changes': [dependency_changes],
    'failed_previous_builds': [failed_previous_builds],
    'error_occurred': [0]  # Assuming no error occurred for this build (modify as needed)
}

# Create a DataFrame from the data
df = pd.DataFrame(data)

# Append to the existing CSV file (without the header, to avoid duplication)
df.to_csv(csv_file, mode='a', header=False, index=False)
