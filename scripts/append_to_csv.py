import csv
import sys

def append_to_csv(build_duration, dependency_changes, failed_previous_builds, csv_file):
    try:
        # Check if the file exists and open it in append mode
        with open(csv_file, mode='a', newline='') as file:
            writer = csv.writer(file)
            # Write data to CSV
            writer.writerow([build_duration, dependency_changes, failed_previous_builds])
            print(f"Successfully appended to {csv_file}")
    except Exception as e:
        print(f"Error while appending to CSV: {e}")

if __name__ == '__main__':
    # Collect arguments passed to the script
    build_duration = sys.argv[1]
    dependency_changes = sys.argv[2]
    failed_previous_builds = sys.argv[3]
    csv_file = sys.argv[4]

    # Call function to append to CSV
    append_to_csv(build_duration, dependency_changes, failed_previous_builds, csv_file)
