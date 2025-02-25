pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo "Starting build..."
                bat 'npm run build'  // Example of your build command
            }
        }
        stage('Commit and Push Logs') {
            steps {
                echo "Committing and pushing logs to GitHub..."

                // Set up Git user to avoid "unknown" committer issue
                bat 'git config --global user.name "vamsimohanyacham"'
                bat 'git config --global user.email "vamsimohanyacham@gmail.com"'

                // Check if build log directory contains files
                script {
                    def logFilesExist = fileExists('build_log/build_logs/') && (sh(script: "ls build_log/build_logs/", returnStdout: true).trim() != '')
                    if (logFilesExist) {
                        // Add and commit logs if files exist
                        bat 'git add build_log/build_logs/*'
                        bat 'git add scripts/build_logs.csv'
                        bat 'git commit -m "Update build logs and CSV file" || echo "No changes to commit"'
                    } else {
                        echo "No build log files found to commit."
                    }
                }

                // Make sure we are on the main branch before pushing
                bat 'git checkout main || git checkout -b main'  // Create branch if not exists
                bat 'git push origin main'
            }
        }
        stage('Post Actions') {
            steps {
                echo "Appending build data to CSV file..."

                // Run the Python script to append data to the CSV
                bat """
                    "C:\\Users\\MTL1020\\AppData\\Local\\Programs\\Python\\Python39\\python.exe" -c "
                    import pandas as pd
                    from datetime import datetime
                    data = {'build_duration': [300], 'dependency_changes': [0], 'failed_previous_builds': [0], 'error_occurred': [0]}
                    df = pd.DataFrame(data)
                    df.to_csv(r'C:\\ProgramData\\Jenkins\\.jenkins\\jobs\\test\\workspace\\scripts\\build_logs.csv', mode='a', header=False, index=False)"
                """
            }
        }
    }

    post {
        always {
            echo "Pipeline finished."
        }
    }
}




// pipeline {
//     agent any

//     environment {
//         BUILD_DIR = 'build_log\\build_logs'  // Use double-backslashes for Windows path
//         PYTHON_PATH = 'C:\\Users\\MTL1020\\AppData\\Local\\Programs\\Python\\Python39\\'  // Path to Python installation
//         BUILD_DURATION = '300'  // Placeholder for build duration (in seconds)
//         DEPENDENCY_CHANGES = '0'  // 0 represents 'false'
//         FAILED_PREVIOUS_BUILDS = '0'  // Placeholder for number of failed previous builds
//         CSV_FILE = 'C:\\ProgramData\\Jenkins\\.jenkins\\jobs\\test\\workspace\\scripts\\build_logs.csv'  // Path to the CSV file where build data is stored
//     }

//     stages {
//         stage('Checkout SCM') {
//             steps {
//                 echo 'Checkout SCM'
//                 checkout scm
//             }
//         }

//         stage('Install Dependencies') {
//             steps {
//                 echo 'Installing npm dependencies...'
//                 bat 'npm install'  // Install npm dependencies
//             }
//         }

//         stage('Build') {
//             steps {
//                 echo 'Building the project...'

//                 script {
//                     def buildLogsDir = "${env.WORKSPACE}\\${BUILD_DIR}"
//                     if (!fileExists(buildLogsDir)) {
//                         echo "Creating directory: ${buildLogsDir}"
//                         bat "mkdir \"${buildLogsDir}\""
//                     }
//                 }

//                 script {
//                     def logFile = "${env.WORKSPACE}\\${BUILD_DIR}\\build_${env.BUILD_ID}.log"
//                     def currentDate = new Date().format('yyyy-MM-dd HH:mm:ss')
//                     echo "Starting build at: ${currentDate}"
//                     bat "echo 'Starting build at: ${currentDate}' > \"${logFile}\""
//                     bat "npm run build >> \"${logFile}\" 2>&1"
//                     echo "Build log written to: ${logFile}"
//                 }
//             }
//         }

//         stage('Run Error Prediction') {
//             steps {
//                 echo 'Running error prediction...'

//                 script {
//                     def logFile = "${env.WORKSPACE}\\${BUILD_DIR}\\build_${env.BUILD_ID}.log"
//                     def predictionFile = "${env.WORKSPACE}\\${BUILD_DIR}\\prediction_${env.BUILD_ID}.json"

//                     echo "Log file: ${logFile}"
//                     echo "Prediction result file: ${predictionFile}"

//                     // Ensure Python is available
//                     bat "\"C:\\Users\\MTL1020\\AppData\\Local\\Programs\\Python\\Python39\\python.exe\" --version"  // Check Python version

//                     // Run error prediction
//                     bat "\"C:\\Users\\MTL1020\\AppData\\Local\\Programs\\Python\\Python39\\python.exe\" scripts\\error_prediction.py --build_duration ${env.BUILD_DURATION} --dependency_changes ${env.DEPENDENCY_CHANGES} --failed_previous_builds ${env.FAILED_PREVIOUS_BUILDS} --prediction_file \"${predictionFile}\""

//                     // Display the contents of the prediction file
//                     bat "type \"${predictionFile}\""
//                 }
//             }
//         }

//         stage('Post Build Actions') {
//             steps {
//                 echo 'Build Status: SUCCESS'
//                 script {
//                     def logFile = "${env.WORKSPACE}\\${BUILD_DIR}\\build_${env.BUILD_ID}.log"
//                     echo "Log file contents:"
//                     bat "type \"${logFile}\""
//                 }
//             }
//         }
//     }

//     post {
//         always {
//             // Append build data to the CSV after each build
//             echo "Appending build data to CSV file..."
//             script {
//                 // Verify if the script exists in the correct directory
//                 def appendCsvCommand = """
//                     echo "Workspace path: ${env.WORKSPACE}"
//                     echo "Checking if append_to_csv.py exists..."
//                     dir "${env.WORKSPACE}\\scripts\\append_to_csv.py"  // Use correct syntax for Windows path
//                     if exist "${env.WORKSPACE}\\scripts\\append_to_csv.py" (
//                         echo "Running Python script to append to CSV..."
//                         \"${env.PYTHON_PATH}python.exe\" "${env.WORKSPACE}\\scripts\\append_to_csv.py" ${env.BUILD_DURATION} ${env.DEPENDENCY_CHANGES} ${env.FAILED_PREVIOUS_BUILDS} "${env.CSV_FILE}"
//                     ) else (
//                         echo "Error: append_to_csv.py not found!"
//                     )
//                 """
//                 bat appendCsvCommand
//             }
//         }
//     }
// }





// pipeline {
//     agent any

//     environment {
//         BUILD_DIR = 'build_log\\build_logs'  // Use double-backslashes for Windows path
//         PYTHON_PATH = 'C:\\Users\\MTL1020\\AppData\\Local\\Programs\\Python\\Python39\\'  // Path to Python installation
//         BUILD_DURATION = '300'  // Placeholder for build duration (in seconds)
//         DEPENDENCY_CHANGES = '0'  // 0 represents 'false'
//         FAILED_PREVIOUS_BUILDS = '0'  // Placeholder for number of failed previous builds
//     }

//     stages {
//         stage('Checkout SCM') {
//             steps {
//                 echo 'Checkout SCM'
//                 checkout scm
//             }
//         }

//         stage('Install Dependencies') {
//             steps {
//                 echo 'Installing npm dependencies...'
//                 bat 'npm install'  // Install npm dependencies
//             }
//         }

//         stage('Build') {
//             steps {
//                 echo 'Building the project...'

//                 script {
//                     def buildLogsDir = "${env.WORKSPACE}\\${BUILD_DIR}"
//                     if (!fileExists(buildLogsDir)) {
//                         echo "Creating directory: ${buildLogsDir}"
//                         bat "mkdir \"${buildLogsDir}\""
//                     }
//                 }

//                 script {
//                     def logFile = "${env.WORKSPACE}\\${BUILD_DIR}\\build_${env.BUILD_ID}.log"
//                     def currentDate = new Date().format('yyyy-MM-dd HH:mm:ss')
//                     echo "Starting build at: ${currentDate}"
//                     bat "echo 'Starting build at: ${currentDate}' > \"${logFile}\""
//                     bat "npm run build >> \"${logFile}\" 2>&1"
//                     echo "Build log written to: ${logFile}"
//                 }
//             }
//         }

//         stage('Run Error Prediction') {
//             steps {
//                 echo 'Running error prediction...'

//                 script {
//                     def logFile = "${env.WORKSPACE}\\${BUILD_DIR}\\build_${env.BUILD_ID}.log"
//                     def predictionFile = "${env.WORKSPACE}\\${BUILD_DIR}\\prediction_${env.BUILD_ID}.json"

//                     echo "Log file: ${logFile}"
//                     echo "Prediction result file: ${predictionFile}"

//                     // Ensure Python is available
//                     bat "\"C:\\Users\\MTL1020\\AppData\\Local\\Programs\\Python\\Python39\\python.exe\" --version"  // Check Python version

//                     // Run error prediction without --log_file argument
//                     bat "\"C:\\Users\\MTL1020\\AppData\\Local\\Programs\\Python\\Python39\\python.exe\" scripts\\error_prediction.py --build_duration ${env.BUILD_DURATION} --dependency_changes ${env.DEPENDENCY_CHANGES} --failed_previous_builds ${env.FAILED_PREVIOUS_BUILDS} --prediction_file \"${predictionFile}\""

//                     // Display the contents of the prediction file
//                     bat "type \"${predictionFile}\""
//                 }
//             }
//         }

//         stage('Post Build Actions') {
//             steps {
//                 echo 'Build Status: SUCCESS'
//                 script {
//                     def logFile = "${env.WORKSPACE}\\${BUILD_DIR}\\build_${env.BUILD_ID}.log"
//                     echo "Log file contents:"
//                     bat "type \"${logFile}\""
//                 }
//             }
//         }
//     }
// }






// pipeline {
//     agent any
    
//     environment {
//         BUILD_DIR = 'build_log\\build_logs'  // Use double-backslashes for Windows path
//     }

//     stages {
//         stage('Checkout SCM') {
//             steps {
//                 echo 'Checkout SCM'
//                 checkout scm
//             }
//         }

//         stage('Install Dependencies') {
//             steps {
//                 echo 'Installing dependencies...'
//                 bat 'npm install'
//             }
//         }

//         stage('Build') {
//             steps {
//                 echo 'Building the project...'

//                 // Ensure the build_log\\build_logs directory exists
//                 script {
//                     def buildLogsDir = "${env.WORKSPACE}\\${BUILD_DIR}"
//                     // Check if the directory exists; if not, create it
//                     if (!fileExists(buildLogsDir)) {
//                         echo "Creating directory: ${buildLogsDir}"
//                         bat "mkdir \"${buildLogsDir}\""
//                     }
//                 }

//                 script {
//                     // Define the log file path using the BUILD_ID
//                     def logFile = "${env.WORKSPACE}\\${BUILD_DIR}\\build_${env.BUILD_ID}.log"
//                     echo "Path to log file: ${logFile}"

//                     // Get the current date/time (using Groovy to capture date)
//                     def currentDate = new Date().format('yyyy-MM-dd HH:mm:ss')
//                     echo "Current date: ${currentDate}"

//                     // Write an initial entry into the log file to confirm writing
//                     bat "echo 'Starting build at: ${currentDate}' > \"${logFile}\""

//                     // Run the build command and append the output to the log file
//                     bat "npm run build >> \"${logFile}\" 2>&1"

//                     // Confirm the log file is written
//                     echo "Log file written at: ${logFile}"
//                 }
//             }
//         }

//         stage('Run Error Prediction') {
//             steps {
//                 echo 'Running error prediction...'

//                 script {
//                     // Assuming the error prediction script is available and ready to be run.
//                     def logFile = "${env.WORKSPACE}\\${BUILD_DIR}\\build_${env.BUILD_ID}.log"
//                     def predictionFile = "${env.WORKSPACE}\\${BUILD_DIR}\\prediction_${env.BUILD_ID}.json"

//                     echo "Log file: ${logFile}"
//                     echo "Prediction result file: ${predictionFile}"

//                     // Run the prediction script and save the result in a JSON file
//                     bat "python predict_errors.py --log_file \"${logFile}\" --prediction_file \"${predictionFile}\""
                    
//                     // Optional: Display the prediction result
//                     bat "type \"${predictionFile}\""
//                 }
//             }
//         }

//         stage('Post Build Actions') {
//             steps {
//                 echo 'Build Status: SUCCESS'

//                 // Optionally, print the log contents for debugging purposes
//                 script {
//                     def logFile = "${env.WORKSPACE}\\${BUILD_DIR}\\build_${env.BUILD_ID}.log"
//                     echo "Log file contents:"
//                     bat "type \"${logFile}\""
//                 }
//             }
//         }
//     }
// }
