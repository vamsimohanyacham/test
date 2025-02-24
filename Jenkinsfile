pipeline {
    agent any
    
    environment {
        BUILD_DIR = 'build_log/build_logs'
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

                // Ensure the build_log/build_logs directory exists
                bat "if not exist ${BUILD_DIR} mkdir ${BUILD_DIR}"

                // Create a path for the log file using the BUILD_ID
                def logFile = "${env.WORKSPACE}\\${BUILD_DIR}\\build_${env.BUILD_ID}.log"
                echo "Path to log file: ${logFile}"

                // Redirect the output of the build command to the log file
                bat """
                    echo "Starting build..." > ${logFile}  // Writing initial content to the log
                    npm run build >> ${logFile} 2>&1      // Capture the build output to the log file
                """
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
