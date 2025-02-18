pipeline {
    agent any
    
    environment {
        ARTIFACT_NAME = 'vite-app'
        VERSION_FILE = 'version.txt'  // File that holds the current version
        GITHUB_REPO = 'https://github.com/vamsimohanyacham/test.git'  // Your GitHub repo URL
        GITHUB_BRANCH = 'build-artifacts'  // Branch to store artifacts
        ZIP_FILE_NAME = "${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip"  // Artifact file name
    }
    
    stages {
        stage('Checkout Code') {
            steps {
                echo 'Checking out code from GitHub'
                git url: "${GITHUB_REPO}", branch: 'main'
            }
        }
        
        stage('Retrieve Version') {
            steps {
                echo 'Retrieving version from version.txt'
                script {
                    if (fileExists(VERSION_FILE)) {
                        // Read the current version from version.txt
                        def currentVersion = readFile(VERSION_FILE).trim()
                        // Increment the version by 0.0.1 (e.g., 1.0.0 to 1.0.1)
                        def versionParts = currentVersion.tokenize('.')
                        versionParts[2] = (versionParts[2].toInteger() + 1).toString()  // Increment minor version
                        ARTIFACT_VERSION = versionParts.join('.')
                    } else {
                        // If version.txt doesn't exist, start with version 1.0.0
                        ARTIFACT_VERSION = '1.0.0'
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
                    // Install dependencies (using npm)
                    bat 'npm install'
                }
            }
        }
        
        stage('Build Vite App') {
            steps {
                echo 'Building the Vite app'
                script {
                    // Build the Vite app
                    bat 'npm run build'
                }
            }
        }

        stage('Create .zip Archive') {
            steps {
                echo 'Creating the zip archive of the build'
                script {
                    // Create the zip file using PowerShell
                    bat "powershell Compress-Archive -Path dist/* -DestinationPath ${ZIP_FILE_NAME}"
                }
            }
        }
        
        stage('Push to GitHub - Store Artifact') {
            steps {
                echo 'Pushing artifact to GitHub'
                script {
                    // Ensure we're on the correct branch
                    sh """
                        git checkout -b ${GITHUB_BRANCH} || git checkout ${GITHUB_BRANCH}
                    """
                    
                    // Add the generated zip file
                    sh """
                        git add ${ZIP_FILE_NAME}
                        git commit -m "Add build artifact ${ZIP_FILE_NAME}"
                    """
                    
                    // Push to the `build-artifacts` branch
                    sh """
                        git push origin ${GITHUB_BRANCH}
                    """
                }
            }
        }
    }
    
    post {
        always {
            echo "Pipeline execution completed"
        }
    }
}
