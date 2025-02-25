pipeline {
    agent any

    environment {
        BUILD_DIR = 'build_log\\build_logs'  // Use double-backslashes for Windows paths
        PREDICTION_FILE = "${env.WORKSPACE}\\build_log\\prediction_result.json" // Path to save the prediction result
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
                echo 'Installing dependencies...'
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the project...'

                // Ensure the build_log\\build_logs directory exists
                bat "if not exist ${BUILD_DIR} mkdir ${BUILD_DIR}"

                script {
                    // Define the log file path using the BUILD_ID
                    def logFile = "${env.WORKSPACE}\\${BUILD_DIR}\\build_${env.BUILD_ID}.log"
                    echo "Path to log file: ${logFile}"

                    // Get the current date/time (using Groovy to capture date)
                    def currentDate = new Date().format('yyyy-MM-dd HH:mm:ss')
                    echo "Current date: ${currentDate}"

                    // Write an initial entry into the log file to confirm writing
                    bat "echo 'Starting build at: ${currentDate}' > ${logFile}"

                    // Run the build command and append the output to the log file
                    bat "npm run build >> ${logFile} 2>&1"

                    // Confirm the log file is written
                    bat "echo Log file written at: ${logFile}"
                }
            }
        }

        stage('Run Error Prediction') {
            steps {
                echo 'Running error prediction based on build metadata...'

                script {
                    // Get build metadata (replace these with actual values from your build)
                    def buildDuration = 150  // Example: build duration in minutes
                    def dependencyChanges = 7  // Example: number of dependencies changed
                    def failedPreviousBuilds = 3  // Example: number of failed builds

                    // Run the error prediction script
                    bat """
                        python predict_error.py --build_duration ${buildDuration} --dependency_changes ${dependencyChanges} --failed_previous_builds ${failedPreviousBuilds} --prediction_file ${PREDICTION_FILE}
                    """
                }
            }
        }

        stage('Post Build Actions') {
            steps {
                echo 'Build Status: SUCCESS'

                script {
                    // Read and print the prediction result
                    def predictionResult = readJSON file: PREDICTION_FILE
                    echo "Prediction result: ${predictionResult.status} - ${predictionResult.message}"

                    // Handle failure cases based on prediction
                    if (predictionResult.status == 'fail') {
                        echo "Warning: ${predictionResult.message}"
                        currentBuild.result = 'UNSTABLE'  // Mark the build as unstable if prediction indicates failure
                    } else {
                        echo "Build seems stable."
                    }
                }
            }
        }
    }
}
