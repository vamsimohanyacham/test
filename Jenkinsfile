pipeline {
    agent any

    environment {
        ARTIFACT_VERSION = '1.0.0'  // Default version (will be overridden by verion.txt)
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm  // Use this single step to checkout the repository from GitHub
            }
        }

        stage('Retrieve Version') {
            steps {
                echo 'Retrieving version from version.txt'
                script {
                    def VERSION_FILE = 'version.txt'  // Path to version.txt

                    // Check if version.txt exists
                    if (fileExists(VERSION_FILE)) {
                        // Read the version from version.txt
                        def currentVersion = readFile(VERSION_FILE).trim()

                        // Check if version is empty or malformed, set default version if so
                        if (!currentVersion || !currentVersion.matches("\\d+\\.\\d+\\.\\d+")) {
                            currentVersion = '1.0.0'
                        }

                        // Increment the patch version
                        def versionParts = currentVersion.tokenize('.')
                        versionParts[2] = (versionParts[2].toInteger() + 1).toString()  // Increment patch version
                        ARTIFACT_VERSION = versionParts.join('.')

                    } else {
                        // If version.txt doesn't exist, initialize the version to 1.0.0
                        echo 'version.txt not found. Initializing to version 1.0.0'
                        ARTIFACT_VERSION = '1.0.0'

                        // Create version.txt with the initial version if it doesn't exist
                        writeFile(file: VERSION_FILE, text: ARTIFACT_VERSION)
                    }

                    // Write the new version back to version.txt
                    writeFile(file: VERSION_FILE, text: ARTIFACT_VERSION)

                    echo "New version: ${ARTIFACT_VERSION}"
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies using npm...'
                script {
                    // Ensure npm install works without skipping
                    bat 'npm install'
                }
            }
        }

        stage('Ensure Vite is Executable') {
            steps {
                echo 'Ensure Vite is executable'
                script {
                    // Skip chmod for Windows-based systems
                    if (isUnix()) {
                        sh 'chmod +x node_modules/.bin/vite'  // Ensure vite is executable for Unix
                    } else {
                        echo 'Skipping chmod on Windows, as it is not necessary'
                    }
                }
            }
        }

        stage('Build Vite App') {
            steps {
                echo 'Building the Vite app'
                script {
                    // Run the Vite build process
                    bat 'npm run build'
                }
            }
        }

        stage('Create .zip Archive') {
            steps {
                echo 'Creating .zip archive for build'
                script {
                    // Create zip file based on OS
                    if (isUnix()) {
                        sh 'zip -r build.zip dist/*'  // Create zip file for Unix-based systems
                    } else {
                        bat 'powershell -Command "Compress-Archive -Path dist/* -DestinationPath build.zip"'  // Windowcommand
                    }
                }
            }
        }

        stage('Deploy to Nginx') {
            steps {
                echo 'Deploying to Nginx'
                script {
                    // Add your deployment command here
                    echo 'Deploying the built app to Nginx or another web server'
                }
            }
        }

        stage('Push Version to GitHub') {
            steps {
                echo 'Pushing version.txt changes to GitHub'
                script {
                    // Add and commit version.txt changes
                    bat 'git add version.txt'
                    bat "git commit -m \"Update version to ${ARTIFACT_VERSION}\""
                    
                    // Ensure the repository is clean before pushing
                    bat 'git pull origin main'  // Pull latest changes from main branch

                    // Push the updated version.txt to the repository
                    bat 'git push origin main'  // Push changes to main branch
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed!'
        }

        always {
            echo 'Cleaning up resources if needed'
        }
    }
}
