pipeline {
    agent any

    environment {
        // Define any environment variables if required
        ARTIFACT_NAME = 'vite-app'  // Change this to your artifact name
        ARTIFACT_VERSION = '1.0.0'  // Change this to your version
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/vamsimohanyacham/test.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    echo 'Installing dependencies using npm...'
                    // If npm is installed and available, run `npm install` to install dependencies
                    bat 'npm install'
                }
            }
        }

        stage('Ensure Vite is Executable') {
            steps {
                script {
                    echo 'Ensure Vite is executable'
                    // Skipping chmod on Windows, as it's not necessary
                    echo 'Skipping chmod on Windows, as it is not necessary'
                }
            }
        }

        stage('Build Vite App') {
            steps {
                script {
                    echo 'Building the Vite app'
                    bat 'npm run build'  // Assuming you have a build script defined in your package.json
                }
            }
        }

        stage('Create .zip Archive') {
            steps {
                script {
                    def zipFileName = "${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip"
                    echo "Creating .zip archive: ${zipFileName}"

                    // Use PowerShell to create the zip archive on Windows
                    powershell """
                        Compress-Archive -Path dist/* -DestinationPath ${zipFileName}
                    """

                    echo "Created ${zipFileName}"
                }
            }
        }

        stage('Deploy to Nginx') {
            steps {
                script {
                    echo 'Deploying to Nginx'
                    // Add Nginx deployment commands here, e.g., copying the zip file to the server
                    // Example:
                    // bat 'scp ${zipFileName} user@nginx-server:/path/to/deploy'
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace...'
            // Add any cleanup commands if necessary
        }

        success {
            echo 'Pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed, check the logs for details.'
        }
    }
}
