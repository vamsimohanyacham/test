pipeline {
    agent any

    environment {
        BUILD_DIR = "build_log\\build_logs"
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
                    
                    // Ensure the build_log\\build_logs directory exists
                    bat "if not exist ${BUILD_DIR} mkdir ${BUILD_DIR}"
                    
                    // Check if the directory and log file are created successfully
                    bat "echo Checking directory structure... && dir ${BUILD_DIR}"
                    
                    // Run the build and capture output in the log file
                    bat """
                        echo "Starting build..." > ${logFile}  // Writing initial content to the log
                        npm run build >> ${logFile} 2>&1   // Capture the build output to the log file
                    """
                    
                    // Optionally print log content to console for debugging
                    bat "type ${logFile}"
                }
            }
        }

        stage('Post Build Actions') {
            steps {
                echo "Build finished. Logs saved."
            }
        }
    }

    post {
        always {
            echo "Build completed."
        }
    }
}
