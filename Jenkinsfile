pipeline {
    agent any

    environment {
        NODE_HOME = tool 'NODE_HOME'  // Use the NodeJS tool configured in Jenkins
        PATH = "${NODE_HOME}/bin:${env.PATH}:node_modules/.bin"  // Add node_modules/.bin to PATH
        ARTIFACT_NAME = 'middlewaretalents'  // Artifact Name
        ARTIFACT_VERSION = '1.0.1'  // Artifact Version (this will be the default starting version)
        NGINX_PATH = '/usr/share/nginx/html'   // Nginx Web Root Path
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Checkout the code from Git repository'
                git branch: 'main', url: 'https://github.com/vamsimohanyacham/test.git', credentialsId: 'githubcred'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    echo "Installing dependencies using npm..."
                    try {
                        sh 'npm install'  // Install dependencies using npm
                    } catch (Exception e) {
                        echo "Failed to install dependencies: ${e.getMessage()}"
                        currentBuild.result = 'FAILURE'
                        throw e  // Re-throw the error to stop the pipeline
                    }
                }
            }
        }

        stage('Ensure Vite is Executable') {
            steps {
                echo "Ensure Vite is executable"
                sh 'chmod +x node_modules/.bin/vite'  // Ensure Vite has execute permission
            }
        }

        stage('Build Vite App') {
            steps {
                echo "Building the Vite app"
                sh 'npx vite build'  // Use npx to run vite build
            }
        }

        stage('Create .zip Archive') {
            steps {
                script {
                    def zipFileName = "${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip"
                    sh "zip -r ${zipFileName} dist/*"
                    echo "Created ${zipFileName}"
                }
            }
        }

        stage('Deploy to Nginx') {
            steps {
                script {
                    echo "Moving dist folder to Nginx directory..."
                    sh "sudo cp -r dist/* ${NGINX_PATH}/"
                    echo "Deployed ${ARTIFACT_NAME}-${ARTIFACT_VERSION} to Nginx"
                    
                    echo "Restarting Nginx..."
                    sh "sudo systemctl restart nginx"
                    echo "Nginx restarted successfully"
                }
            }
        }
    }

    post {
        always {
            echo "Cleaning up zip files"
            sh 'rm -f *.zip || true'
        }

        failure {
            echo "Pipeline failed. Investigating failure..."
            // Additional failure handling logic can go here if needed
        }
    }
}
