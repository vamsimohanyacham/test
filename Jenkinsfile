pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Checkout SCM'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the project...'

                // Create the build_log/build_logs directory if it doesn't exist
                bat 'if not exist build_log\\build_logs mkdir build_log\\build_logs'

                // Debugging: Show workspace path
                echo 'Workspace: ' + env.WORKSPACE
                echo 'Path to log file: ' + "${env.WORKSPACE}\\build_log\\build_logs\\build_${env.BUILD_ID}.log"

                // Run the build command and capture logs in the specified directory
                bat "npm run build > ${env.WORKSPACE}\\build_log\\build_logs\\build_${env.BUILD_ID}.log 2>&1"
            }
        }

        stage('Post Build Actions') {
            steps {
                script {
                    def BUILD_STATUS = currentBuild.currentResult
                    echo "Build Status: ${BUILD_STATUS}"

                    // Define the absolute path for the log file
                    def logFile = "${env.WORKSPACE}\\build_log\\build_logs\\build_${env.BUILD_ID}.log"
                    def predictionFile = "${env.WORKSPACE}\\prediction_results\\prediction_${env.BUILD_ID}.json"

                    // Add more debugging to check if the log and prediction files exist
                    echo "Checking if log file exists: ${logFile}"
                    if (fileExists(logFile)) {
                        echo "Log file exists, adding to Git."
                    } else {
                        echo "Log file does not exist!"
                    }

                    // Handle log and prediction files
                    if (BUILD_STATUS == 'SUCCESS') {
                        echo "Build successful, saving logs and prediction data."

                        // Check if log and prediction files exist
                        if (fileExists(logFile) && fileExists(predictionFile)) {
                            echo "Log and prediction files exist. Adding them to the repository."
                            bat "git add ${logFile} ${predictionFile}"
                            bat 'git commit -m "Add build logs and prediction results" || echo "Nothing to commit"'
                            bat 'git push origin main'
                        } else {
                            echo "Log or prediction file is missing!"
                        }
                    } else {
                        echo "Build failed, saving failure logs."
                        
                        // Handle missing log files in case of failure
                        if (fileExists(logFile)) {
                            echo "Log file exists. Adding to Git."
                            bat "git add ${logFile}"
                            bat 'git commit -m "Build failed - capture logs" || echo "Nothing to commit"'
                            bat 'git push origin main'
                        } else {
                            echo "Log file is missing for failure!"
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            echo "Cleaning up after the build"
            // Clean up build logs and prediction results after the build
            bat 'if exist build_log\\build_logs\\*.log del /q build_log\\build_logs\\*.log || echo "No log files to delete"'
            bat 'if exist prediction_results\\*.json del /q prediction_results\\*.json || echo "No prediction files to delete"'
        }

        success {
            echo 'Build completed successfully!'
        }

        failure {
            echo 'Build failed. Please check the logs for details.'
        }
    }
}
