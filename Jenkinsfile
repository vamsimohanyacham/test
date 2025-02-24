pipeline {
    agent any
    
    environment {
        BUILD_DIR = 'build_log\\build_logs'  // Ensure correct Windows path format
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

                    // Create the log file and write the initial content
                    bat "echo Starting build... > ${logFile}"

                    // Run the build command and capture the output in the log file
                    bat "npm run build >> ${logFile} 2>&1"
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
