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
                bat 'npm run build'
            }
        }

        stage('Post Build Actions') {
            steps {
                script {
                    def BUILD_STATUS = currentBuild.currentResult
                    echo "Build Status: ${BUILD_STATUS}"

                    // Correct path to the build logs in the Git repository
                    def logFile = "build_log/build_logs/build_${env.BUILD_ID}.log"
                    def predictionFile = "prediction_results/prediction_${env.BUILD_ID}.json"

                    // Ensure build_log/build_logs exists in the Git repository
                    echo "Checking build_log/build_logs directory in the repository"
                    bat 'git status'  // Verify repository status

                    // If build is successful, handle files
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
