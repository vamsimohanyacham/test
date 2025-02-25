pipeline {
    agent any
    
    environment {
        BUILD_DIR = 'build_log\\build_logs'  // Use double-backslashes for Windows paths
        GITHUB_REPO_URL = 'https://github.com/vamsimohanyacham/test.git'
        GITHUB_BRANCH = 'main'  // Specify the branch you want to push logs to
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

                    // Ensure the directory exists
                    bat "if exist ${BUILD_DIR} echo Directory exists! || echo Directory creation failed."

                    // Get the current date/time (using Groovy to capture date)
                    def currentDate = new Date().format('yyyy-MM-dd HH:mm:ss')
                    echo "Current date: ${currentDate}"

                    // Write an initial entry into the log file
                    bat "echo 'Starting build at: ${currentDate}' > ${logFile}"

                    // Run the build command and append the output to the log file
                    bat "npm run build >> ${logFile} 2>&1"
                }
            }
        }

        stage('Post Build Actions') {
            steps {
                echo 'Build Status: SUCCESS'

                // Print the log contents for debugging purposes
                bat "type ${env.WORKSPACE}\\${BUILD_DIR}\\build_${env.BUILD_ID}.log"

                // Push the log file to GitHub
                script {
                    def logFilePath = "${env.WORKSPACE}\\${BUILD_DIR}\\build_${env.BUILD_ID}.log"

                    // Clone the repository (if not already cloned)
                    bat """
                        git clone ${GITHUB_REPO_URL} repo
                        cd repo
                    """

                    // Create the necessary folder if it doesn't exist
                    bat "mkdir build_log\\build_logs"

                    // Copy the log file to the GitHub repository folder
                    bat "copy ${logFilePath} repo\\build_log\\build_logs\\build_${env.BUILD_ID}.log"

                    // Commit and push the log file to GitHub
                    bat """
                        cd repo
                        git config --global user.email "vamsimohanyacham@gmail.com"
                        git config --global user.name "vamsimohanyacham"
                        git add build_log\\build_logs\\build_${env.BUILD_ID}.log
                        git commit -m "Add build log ${env.BUILD_ID}"
                        git push origin ${GITHUB_BRANCH}
                    """
                }
            }
        }
    }
}
