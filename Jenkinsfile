// pipeline {
//     agent any

//     environment {
//         BUILD_DIR = 'build_log\\build_logs'  // Use double-backslashes for Windows path
//         PYTHON_PATH = 'C:\\Users\\MTL1020\\AppData\\Local\\Programs\\Python\\Python39\\'  // Path to Python installation
//         BUILD_DURATION = '300'  // Placeholder for build duration (in seconds)
//         DEPENDENCY_CHANGES = '0'  // 0 represents 'false'
//         FAILED_PREVIOUS_BUILDS = '0'  // Placeholder for number of failed previous builds
//         CSV_FILE = 'C:\\ProgramData\\Jenkins\\.jenkins\\jobs\\test\\workspace\\scripts\\build_logs.csv'  // Path to the CSV file where build data is stored
//         GIT_USER = 'vamsimohanyacham'  // Replace with your GitHub username
//         GIT_EMAIL = 'vamsimohanyacham@gmail.com'  // Replace with your email address
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

//             // Commit and push the changes to GitHub after appending to CSV
//             echo "Committing and pushing changes to GitHub..."
//             script {
//                 def gitCommitMessage = "Updated build log after build #${env.BUILD_ID}"
                
//                 // Configure Git
//                 bat """
//                     git config user.name "${env.GIT_USER}"
//                     git config user.email "${env.GIT_EMAIL}"
//                 """

//                 // Add, commit, and push the changes
//                 bat """
//                     git add "${env.CSV_FILE}"
//                     git commit -m "${gitCommitMessage}"
//                     git push origin HEAD:main  // Push to the main branch (modify if necessary)
//                 """
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

pipeline {
    agent any

    environment {
        // Default paths
        MODEL_PATH = 'D:/machinelearning/trained_models/build_error_prediction_model.pkl'
        LOG_FILE_PATH = 'D:/machinelearning/build_log/build_logs.csv'
        SCRIPT_PATH = 'D:/machinelearning/scripts'
        
        // Default to empty initially, will be populated dynamically
        BUILD_DURATION = 0
        DEPENDENCY_CHANGES = 0
        FAILED_PREVIOUS_BUILDS = 0
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm  // Checkout the code from the repository
            }
        }

        stage('Set Build Duration') {
            steps {
                script {
                    // Calculate build duration by using current time and previous build time
                    def startTime = currentBuild.getTimeInMillis()
                    echo "Start time of build: ${startTime}"

                    // After build completion, calculate the duration
                    currentBuild.getDurationString()
                    def endTime = currentBuild.getTimeInMillis()
                    env.BUILD_DURATION = (endTime - startTime) / 1000  // In seconds
                    echo "Build duration is: ${env.BUILD_DURATION} seconds"
                }
            }
        }

        stage('Track Dependency Changes') {
            steps {
                script {
                    // Fetch the last successful build and calculate dependency changes
                    def lastCommit = sh(script: 'git log -1 --format=%H', returnStdout: true).trim()
                    def lastSuccessfulCommit = sh(script: 'git log -1 --format=%H', returnStdout: true).trim() // You may need to adjust this to find the last successful build

                    // Compare dependencies between the current commit and the last successful commit
                    def dependencyChanges = sh(script: "git diff --name-only ${lastCommit} ${lastSuccessfulCommit} | grep 'package.json'", returnStdout: true).trim()
                    if (dependencyChanges) {
                        env.DEPENDENCY_CHANGES = 1
                    } else {
                        env.DEPENDENCY_CHANGES = 0
                    }

                    echo "Dependency changes: ${env.DEPENDENCY_CHANGES}"
                }
            }
        }

        stage('Check Failed Previous Builds') {
            steps {
                script {
                    // Check if previous builds failed
                    def failedBuilds = currentBuild.getPreviousBuilds()
                    def failedCount = 0

                    failedBuilds.each { build ->
                        if (build.result == 'FAILURE') {
                            failedCount++
                        }
                    }

                    env.FAILED_PREVIOUS_BUILDS = failedCount
                    echo "Failed previous builds count: ${env.FAILED_PREVIOUS_BUILDS}"
                }
            }
        }

        stage('Train Model') {
            steps {
                script {
                    echo 'Training the model...'

                    if (!fileExists("${env.MODEL_PATH}")) {
                        echo 'Training model...'
                        bat """
                            python ${env.SCRIPT_PATH}/train_model.py
                        """
                        // Set model path
                        env.MODEL_PATH = 'D:/machinelearning/trained_models/build_error_prediction_model.pkl'
                    } else {
                        echo 'Model already trained. Skipping training.'
                    }
                }
            }
        }

        stage('Generate Logs') {
            steps {
                script {
                    echo 'Generating logs...'

                    // Log the build data
                    def logData = "${env.BUILD_DURATION}, ${env.DEPENDENCY_CHANGES}, ${env.FAILED_PREVIOUS_BUILDS}"
                    echo "Logging data: ${logData}"
                    
                    // Append log data to CSV
                    bat """
                        echo ${logData} >> "${env.LOG_FILE_PATH}"
                    """
                }
            }
        }

        stage('Run ML Error Prediction') {
            steps {
                script {
                    def predictionFile = "D:/machinelearning/build_log/prediction_result.json"
                    echo "Running ML Error Prediction..."
                    
                    bat """
                        python ${env.SCRIPT_PATH}/ml_error_prediction.py --build_duration ${env.BUILD_DURATION} --dependency_changes ${env.DEPENDENCY_CHANGES} --failed_previous_builds ${env.FAILED_PREVIOUS_BUILDS} --prediction_file ${predictionFile}
                    """
                    echo "Prediction written to: ${predictionFile}"
                }
            }
        }

        stage('Post Build Actions') {
            steps {
                echo "Build Completed with status: ${currentBuild.result}"
            }
        }
    }

    post {
        always {
            echo "Final build status: ${currentBuild.result}"
        }

        success {
            echo "Build was successful!"
        }

        failure {
            echo "Build failed!"
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
