pipeline {
    agent any

    environment {
        BUILD_DIR = "build_log/build_logs"
    }

    stages {
        stage('Checkout SCM') {
            steps {
                echo "Checking out code from repository..."
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing dependencies..."
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                echo "Building the project..."
                script {
                    def logFile = "${env.WORKSPACE}\\${BUILD_DIR}\\build_${env.BUILD_ID}.log"
                    echo "Path to log file: ${logFile}"
                    bat "if not exist ${BUILD_DIR} mkdir ${BUILD_DIR}" // Create the log directory if it doesn't exist
                    bat "npm run build > ${logFile} 2>&1" // Save build logs to a file
                }
            }
        }

        // Optional: you can have a post-build action if needed
        stage('Post Build Actions') {
            steps {
                echo "Build finished. Logs saved."
                // Add any other actions after the build, like archiving artifacts, etc.
            }
        }
    }

    post {
        always {
            echo "Build completed."
            // You can include other actions like archiving build artifacts here if necessary.
        }
    }
}
