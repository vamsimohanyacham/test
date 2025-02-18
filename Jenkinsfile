pipeline {
    agent any

    environment {
        NODE_HOME = tool 'NODE_HOME'  // Use the NodeJS configured in Jenkins
        PATH = "${NODE_HOME}/bin:${env.PATH}:node_modules/.bin"  // Add node_modules/.bin to PATH
        ARTIFACT_NAME = 'middlewaretalents'  // Artifact Name
        ARTIFACT_VERSION = '1.0.1'  // Default starting version
        NGINX_PATH = '/usr/share/nginx/html'   // Nginx Web Root Path
        IS_LTS = 'false'  // Flag to determine if this version is LTS
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo "Checking out code from GitHub..."
                git branch: 'main', url: 'https://github.com/vamsimohanyacham/test.git', credentialsId: '2101c0b7-96a5-4534-918f-817d7b83255e'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing dependencies using npm..."
                sh 'npm install'  // Install dependencies using npm
            }
        }

        stage('Ensure Vite is Executable') {
            steps {
                echo "Ensuring Vite is executable..."
                sh 'chmod +x node_modules/.bin/vite'  // Ensure Vite has execute permission
            }
        }

        stage('Build Vite App') {
            steps {
                echo "Building the Vite app..."
                sh 'npx vite build'  // Use npx to run vite build
            }
        }

        stage('Increment Version') {
            steps {
                script {
                    // Fetch the current version from version.txt or default to 1.0.1
                    def versionFile = 'version.txt'
                    def currentVersion = ''
                    if (fileExists(versionFile)) {
                        currentVersion = readFile(versionFile).trim()
                        echo "Current version from file: ${currentVersion}"
                    } else {
                        echo "No version file found, using default version 1.0.1"
                        currentVersion = '1.0.1'
                    }

                    // Split the version into major, minor, patch
                    def versionParts = currentVersion.tokenize('.')
                    def major = versionParts[0].toInteger()
                    def minor = versionParts[1].toInteger()
                    def patch = versionParts[2].toInteger()

                    // Increment the patch version
                    if (patch == 9) {
                        minor += 1
                        patch = 0
                    } else {
                        patch += 1
                    }

                    if (minor == 9) {
                        major += 1
                        minor = 0
                    }

                    // Set the new artifact version
                    ARTIFACT_VERSION = "${major}.${minor}.${patch}"
                    echo "Incremented version to: ${ARTIFACT_VERSION}"

                    // Handle LTS versioning if required
                    if (IS_LTS == 'true' || IS_LTS.toString() == 'true') {
                        ARTIFACT_VERSION = "${ARTIFACT_VERSION}-LTS"
                        echo "LTS version detected. Version updated to: ${ARTIFACT_VERSION}"
                    } else {
                        echo "Non-LTS version detected. Version remains as: ${ARTIFACT_VERSION}"
                    }

                    // Update the version in version.txt
                    writeFile(file: versionFile, text: ARTIFACT_VERSION)
                    echo "Version stored in version.txt: ${ARTIFACT_VERSION}"
                }
            }
        }

        stage('Commit Version Update') {
            steps {
                script {
                    echo "Committing version update to GitHub..."
                    // Commit the version change to the GitHub repository
                    sh """
                        git config --global user.name 'vamsimohanyacham'
                        git config --global user.email 'vamsimohanyacham@gmail.com'
                        git add version.txt
                        git commit -m "Update version to ${ARTIFACT_VERSION}"
                        git push origin main
                    """
                    echo "Version updated and committed to GitHub"
                }
            }
        }

        stage('Create .zip Archive') {
            steps {
                echo "Creating .zip archive for deployment..."
                script {
                    def zipFileName = "${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip"
                    sh "zip -r ${zipFileName} dist/*"
                    echo "Created ${zipFileName}"
                }
            }
        }

        stage('Deploy to Nginx') {
            steps {
                echo "Deploying to Nginx..."
                script {
                    // Copy the extracted files from dist to Nginx's web root directory
                    sh "sudo cp -r dist/* ${NGINX_PATH}/"
                    echo "Deployed ${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip to Nginx"
                    
                    // Restart Nginx to serve the new files
                    echo "Restarting Nginx..."
                    sh "sudo systemctl restart nginx"
                    echo "Nginx restarted successfully"
                }
            }
        }
    }

    post {
        always {
            echo "Cleaning up..."
            sh 'rm -f *.zip || true'
        }

        failure {
            echo "Pipeline failed. Reverting to the previous version..."
            script {
                // If failure happens, you can optionally revert to the last successful version
                def versionFile = 'version.txt'
                def lastVersion = '1.0.1' // Default version if no version file exists
                if (fileExists(versionFile)) {
                    lastVersion = readFile(versionFile).trim()
                }

                echo "Reverting to last known version: ${lastVersion}"

                // Optionally, perform a rollback by deploying the previous version to Nginx
                // This part can include downloading the old version from the repository or maintaining backups.
            }
        }
    }
}
