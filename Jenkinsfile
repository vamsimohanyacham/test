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
                    def BUILD_STATUS = currentBuild.currentResult // Capture the status of the build
                    echo "Build Status: ${BUILD_STATUS}"

                    // Log file path
                    def logFile = "build_logs/build_${env.BUILD_ID}.log"
                    def predictionFile = "prediction_results/prediction_${env.BUILD_ID}.json"

                    // Check if build is successful
                    if (BUILD_STATUS == 'SUCCESS') {
                        echo "Build successful, saving logs and prediction data."
                        
                        // Force add the build log and prediction file (even if ignored in .gitignore)
                        bat "git add -f ${logFile} ${predictionFile}"
                        bat 'git commit -m "Add build logs and prediction results" || echo "Nothing to commit"'
                        bat 'git push origin main'  // Push changes to GitHub
                    } else {
                        echo "Build failed, saving failure logs."

                        // Force add only the build log in case of failure
                        bat "git add -f ${logFile}"
                        bat 'git commit -m "Build failed - capture logs" || echo "Nothing to commit"'
                        bat 'git push origin main'  // Push failure logs
                    }
                }
            }
        }
    }

    post {
        always {
            echo "Cleaning up after the build"
            // Clean up any temporary files if necessary
            bat 'del build_logs/*.log || echo "No log files to delete"'
            bat 'del prediction_results/*.json || echo "No prediction files to delete"'
        }

        success {
            echo 'Build completed successfully!'
        }

        failure {
            echo 'Build failed. Please check the logs for details.'
        }
    }
}
