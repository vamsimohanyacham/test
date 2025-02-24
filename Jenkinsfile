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

                    // Define log file path (inside build_logs)
                    def logFile = "build_logs/build_${env.BUILD_ID}.log"
                    def predictionFile = "prediction_results/prediction_${env.BUILD_ID}.json"

                    // Ensure directories exist and check the logs
                    bat 'dir build_logs'
                    bat 'dir prediction_results'

                    // If build is successful, handle files
                    if (BUILD_STATUS == 'SUCCESS') {
                        echo "Build successful, saving logs and prediction data."
                        
                        // Example command to add the log and prediction result to Git
                        if (fileExists(logFile) && fileExists(predictionFile)) {
                            bat "git add -f ${logFile} ${predictionFile}"
                            bat 'git commit -m "Add build logs and prediction results" || echo "Nothing to commit"'
                            bat 'git push origin main'
                        } else {
                            echo "Log or prediction file is missing!"
                        }
                    } else {
                        echo "Build failed, saving failure logs."
                        
                        // Force add the build log in case of failure
                        if (fileExists(logFile)) {
                            bat "git add -f ${logFile}"
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
            // Clean up the build logs and prediction results
            bat 'if exist build_logs\\*.log del /q build_logs\\*.log || echo "No log files to delete"'
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
