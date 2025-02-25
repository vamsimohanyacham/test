pipeline {
    agent any

    environment {
        BUILD_DIR = 'build_log\\build_logs'  // Use double-backslashes for Windows path
        PYTHON_PATH = 'C:\\Users\\MTL1020\\AppData\\Local\\Programs\\Python\\Python39\\'  // Path to Python installation
        BUILD_DURATION = '300'  // Placeholder for build duration (in seconds)
        DEPENDENCY_CHANGES = 'false'  // Placeholder for dependency changes
        FAILED_PREVIOUS_BUILDS = '0'  // Placeholder for number of failed previous builds
    }

    stages {
        stage('Checkout SCM') {
            steps {
                echo 'Checkout SCM'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                bat 'npm install'  // Install npm dependencies
            }
        }

        stage('Build') {
            steps {
                echo 'Building the project...'

                script {
                    def buildLogsDir = "${env.WORKSPACE}\\${BUILD_DIR}"
                    if (!fileExists(buildLogsDir)) {
                        echo "Creating directory: ${buildLogsDir}"
                        bat "mkdir \"${buildLogsDir}\""
                    }
                }

                script {
                    def logFile = "${env.WORKSPACE}\\${BUILD_DIR}\\build_${env.BUILD_ID}.log"
                    def currentDate = new Date().format('yyyy-MM-dd HH:mm:ss')
                    echo "Starting build at: ${currentDate}"
                    bat "echo 'Starting build at: ${currentDate}' > \"${logFile}\""
                    bat "npm run build >> \"${logFile}\" 2>&1"
                    echo "Build log written to: ${logFile}"
                }
            }
        }

        stage('Run Error Prediction') {
            steps {
                echo 'Running error prediction...'

                script {
                    def logFile = "${env.WORKSPACE}\\${BUILD_DIR}\\build_${env.BUILD_ID}.log"
                    def predictionFile = "${env.WORKSPACE}\\${BUILD_DIR}\\prediction_${env.BUILD_ID}.json"

                    echo "Log file: ${logFile}"
                    echo "Prediction result file: ${predictionFile}"

                    // Ensure Python is available
                    bat '"C:\\Users\\MTL1020\\AppData\\Local\\Programs\\Python\\Python39\\python.exe" --version'  // Check Python version

                    // Pass the required arguments
                    bat '"C:\\Users\\MTL1020\\AppData\\Local\\Programs\\Python\\Python39\\python.exe" scripts\\error_prediction.py --build_duration \"${BUILD_DURATION}\" --dependency_changes \"${DEPENDENCY_CHANGES}\" --failed_previous_builds \"${FAILED_PREVIOUS_BUILDS}\" --log_file \"${logFile}\" --prediction_file \"${predictionFile}\"'

                    // Display the contents of the prediction file
                    bat "type \"${predictionFile}\""
                }
            }
        }

        stage('Post Build Actions') {
            steps {
                echo 'Build Status: SUCCESS'
                script {
                    def logFile = "${env.WORKSPACE}\\${BUILD_DIR}\\build_${env.BUILD_ID}.log"
                    echo "Log file contents:"
                    bat "type \"${logFile}\""
                }
            }
        }
    }
}





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
