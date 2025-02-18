pipeline {
    agent any

    environment {
        NODE_HOME = tool 'NODE_HOME'
        PATH = "${NODE_HOME}/bin:${env.PATH}:node_modules/.bin"
        ARTIFACT_NAME = 'middlewaretalents'
        ARTIFACT_VERSION = '1.0.1'
        GROUP_ID = 'com.middlewaretalents'
        NGINX_PATH = '/usr/share/nginx/html'
        IS_LTS = 'false'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/vamsimohanyacham/test.git', credentialsId: '2f167f4e-84fd-4929-8d9a-ba8f849897bd'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Ensure Vite is Executable') {
            steps {
                sh 'chmod +x node_modules/.bin/vite'
            }
        }

        stage('Build Vite App') {
            steps {
                sh 'npx vite build'
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
                    // Commit the version change to the GitHub repository
                    sh """
                        git config --global user.name 'Jenkins'
                        git config --global user.email 'jenkins@example.com'
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
            sh 'rm -f *.zip || true'
        }
        failure {
            script {
                echo "Pipeline failed, reverting to the previous version..."

                // Fetch the previous version from version.txt (if any)
                def versionFile = 'version.txt'
                def lastVersion = '1.0.1' // Default if no version file exists
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
