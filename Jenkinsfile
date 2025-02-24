pipeline {
    agent any
    
    environment {
        BUILD_DIR = 'build_log\\build_logs'  // Use double-backslashes for Windows paths
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

                    // Check if the directory exists before proceeding
                    bat "if exist ${BUILD_DIR} echo Directory exists! || echo Directory creation failed."

                    // Write an initial entry into the log file to confirm writing
                    bat "echo 'Starting build at: $(date)' > ${logFile}"

                    // Run the build command and append the output to the log file
                    bat "npm run build >> ${logFile} 2>&1"

                    // Confirm the log file is written
                    bat "echo Log file written at: ${logFile}"
                }
            }
        }

        stage('Post Build Actions') {
            steps {
                echo 'Build Status: SUCCESS'

                // Print the log contents for debugging purposes
                bat "type ${env.WORKSPACE}\\${BUILD_DIR}\\build_${env.BUILD_ID}.log"
            }
        }
    }
}
