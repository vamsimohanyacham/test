pipeline {
    agent any

    environment {
        NODE_HOME = tool 'NODE_HOME'  // Use the NodeJS configured in Jenkins
        PATH = "${NODE_HOME}/bin:${env.PATH}:node_modules/.bin"  // Add node_modules/.bin to PATH
        NEXUS_URL = 'http://52.141.28.58:8081/repository/distn/'  // Nexus Repository URL
        NEXUS_USER = 'admin'  // Nexus Username
        NEXUS_PASSWORD = 'admin'  // Nexus Password
        ARTIFACT_NAME = 'middlewaretalents'  // Artifact Name
        ARTIFACT_VERSION = '1.0.1'  // Artifact Version (this will be the default starting version)
        GROUP_ID = 'com.middlewaretalents'  // Artifact Group ID
        NGINX_PATH = '/usr/share/nginx/html'   // Nginx Web Root Path
        AZURE_RESOURCE_GROUP = 'vamsi'  // Azure Resource Group
        AZURE_APP_NAME = 'vamsiweb'  // Azure Web App Name
        ZIP_FILE = "${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip"  // Zip file for Azure Web App deployment
        IS_LTS = 'false'  // Flag to determine if this version is LTS
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/vamsimohanyacham/test.git', credentialsId: '2f167f4e-84fd-4929-8d9a-ba8f849897bd'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm insl'  // Install dependencies
            }
        }

        stage('Ensure Vite is Executable') {
            steps {
                sh 'chmod +x node_modules/.bin/vite'  // Ensure Vite has execute permission
            }
        }

        stage('Build Vite App') {
            steps {
                sh 'npx vite build'  // Use npx to run vite build
            }
        }

        stage('Increment Version') {
            steps {
                script {
                    // Fetch the list of artifacts from Nexus repository
                    def artifactUrl = "http://52.141.28.58:8081/#browse/browse:distn"
                    echo "Fetching versions from Nexus repository: ${artifactUrl}"

                    // Get all available versions from Nexus
                    def response = sh(script: "curl -u ${NEXUS_USER}:${NEXUS_PASSWORD} -s \"http://52.141.28.58:8081/service/rest/v1/search?repository=distn\"", returnStdout: true).trim()
                   

                    // Extract the artifact versions from the response
                    def versionList = []
                    response.split('\n').each { line ->
                        if (line.contains("${ARTIFACT_NAME}-")) {
                            def versionMatch = (line =~ /${ARTIFACT_NAME}-(\d+\.\d+\.\d+)(-LTS)?\.zip/)
                            if (versionMatch) {
                                versionList.add(versionMatch[0][1]) // Collect normal version (without LTS)
                            }
                        }
                    }

                    // If no versions found, start with 1.0.1
                    if (versionList.isEmpty()) {
                        echo "No versions found in Nexus, starting with version: 1.0.1"
                        ARTIFACT_VERSION = '1.0.1'
                    } else {
                        // Sort and find the latest version
                        def latestVersion = versionList.sort().last()
                        echo "Latest version found: ${latestVersion}"

                        // Split version into major, minor, patch
                        def versionParts = latestVersion.tokenize('.')
                        def major = versionParts[0].toInteger()
                        def minor = versionParts[1].toInteger()
                        def patch = versionParts[2].toInteger()

                        // If patch is 9, increment the minor version and reset patch to 0
                        if (patch == 9) {
                            minor += 1
                            patch = 0
                        } else {
                            patch += 1
                        }

                        ARTIFACT_VERSION = "${major}.${minor}.${patch}"
                        echo "Incremented version to: ${ARTIFACT_VERSION}"
                    }

                    // Handle LTS versions separately if IS_LTS is true
                    echo "IS_LTS value: ${IS_LTS}"

                    if (IS_LTS == 'true' || IS_LTS.toString() == 'true') {
                        ARTIFACT_VERSION = "${ARTIFACT_VERSION}-LTS"
                        echo "LTS version detected. Version updated to: ${ARTIFACT_VERSION}"
                    } else {
                        echo "Non-LTS version detected. Version remains as: ${ARTIFACT_VERSION}"
                    }
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

        stage('Upload to Nexus') {
            steps {
                script {
                    def artifactFile = "${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip"
                    def nexusRepositoryUrl = "${NEXUS_URL}${artifactFile}"
                    sh """
                        echo Uploading ${artifactFile} to Nexus...
                        curl -u ${NEXUS_USER}:${NEXUS_PASSWORD} -X PUT -F "file=@${artifactFile}" ${nexusRepositoryUrl}
                    """
                }
            }
        }

        stage('Download Artifact from Nexus') {
            steps {
                script {
                    def artifactFile = "${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip"
                    echo "Downloading ${artifactFile} from Nexus..."
                    sh """
                        curl -u ${NEXUS_USER}:${NEXUS_PASSWORD} -O ${NEXUS_URL}${artifactFile}
                    """
                }
            }
        }

        stage('Extract Artifact from Nexus') {
            steps {
                script {
                    echo "Extracting ${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip..."

                    sh """
                        unzip -o -q ${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip || true
                    """
                    echo "Artifact extracted successfully"
                }
            }
        }

        stage('Deploy to Nginx') {
            steps {
                script {
                    // Assuming that after extracting the artifact, the dist folder is ready for deployment
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
                echo "Pipeline failed, deploying the latest LTS version..."

                // Fetch the list of artifacts from Nexus repository
                def artifactUrl = "http://52.141.28.58:8081/#browse/browse:dist"
                echo "Fetching versions from Nexus repository: ${artifactUrl}"

                // Get all available versions from Nexus
                def response = sh(script: "curl -u ${NEXUS_USER}:${NEXUS_PASSWORD} -s \"http://52.141.28.58:8081/service/rest/v1/search?repository=distn\"", returnStdout: true).trim()
                echo "Nexus Response: ${response}"

                // Extract LTS version numbers from the response
                def ltsVersionList = []
                response.split('\n').each { line ->
                    if (line.contains("${ARTIFACT_NAME}-") && line.contains("-LTS")) {
                        def versionMatch = (line =~ /${ARTIFACT_NAME}-(\d+\.\d+\.\d+)-LTS\.zip/)
                        if (versionMatch) {
                            ltsVersionList.add(versionMatch[0][1])
                        }
                    }
                }

                // If LTS versions are found, get the latest one
                if (ltsVersionList.size() > 0) {
                    def latestLTSVersion = ltsVersionList.sort().last()
                    echo "Latest LTS version found: ${latestLTSVersion}"

                    // Set the artifact version to the latest LTS version
                    ARTIFACT_VERSION = "${latestLTSVersion}-LTS"
                    echo "Deploying latest LTS version: ${ARTIFACT_VERSION}"

                    // Download the LTS artifact from Nexus
                    def artifactFile = "${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip"
                    echo "Downloading ${artifactFile} from Nexus..."
                    sh """
                        curl -u ${NEXUS_USER}:${NEXUS_PASSWORD} -O ${NEXUS_URL}${artifactFile}
                    """

                    // Extract the artifact
                    echo "Extracting ${artifactFile}..."
                    sh "unzip ${artifactFile}"
                    echo "Artifact extracted"

                    // Move the dist folder to Nginx directory
                    echo "Moving dist folder to Nginx directory..."
                    sh "sudo cp -r dist/* ${NGINX_PATH}/"
                    echo "Deployed ${artifactFile} to Nginx"
                } else {
                    echo "No LTS version found in Nexus, deploying the first version (1.0.1)..."

                    // Fallback to the first version if no LTS version found
                    def firstVersion = '1.0.1'
                    def artifactFile = "${ARTIFACT_NAME}-${firstVersion}.zip"
                    echo "Downloading ${artifactFile} from Nexus..."
                    sh """
                        curl -u ${NEXUS_USER}:${NEXUS_PASSWORD} -O ${NEXUS_URL}${artifactFile}
                    """

                    // Extract the artifact
                    echo "Extracting ${ARTIFACT_NAME}-${firstVersion}.zip..."
                    sh "unzip ${artifactFile}"
                    echo "Artifact extracted"
                }
            }
        }
    }
}
