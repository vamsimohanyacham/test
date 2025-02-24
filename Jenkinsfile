pipeline {
    agent any

    environment {
        NODE_HOME = tool 'NODE_HOME'
        PATH = "${NODE_HOME}/bin:${env.PATH}"
        NEXUS_URL = 'http://localhost:8081/repository/dist/'
        NEXUS_USER = 'admin'
        NEXUS_PASSWORD = 'vamsi@123'
        ARTIFACT_NAME = 'middlewaretalents'
        ARTIFACT_VERSION = '1.0.1'
        GROUP_ID = 'com.middlewaretalents'
        NGINX_PATH = 'C:\\Users\\MTL1020\\Downloads\\nginx-1.26.2\\nginx-1.26.2\\html'
        AZURE_RESOURCE_GROUP = 'vamsi'
        AZURE_APP_NAME = 'vamsiweb'
        ZIP_FILE = "${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip"
        IS_LTS = 'false'
        ERROR_PREDICTION_MODEL = 'http://your-ml-model-endpoint' // Replace with actual model endpoint
        AZURE_ML_API_KEY = 'your-azure-api-key' // Replace with actual API key
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/vamsimohanyacham/test.git', credentialsId: '2f167f4e-84fd-4929-8d9a-ba8f849897bd'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build Vite App') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Error Prediction') {
            steps {
                script {
                    // Read build logs
                    def buildLogs = readFile('build_log.txt')

                    // Send logs to ML model for error prediction
                    def response = httpRequest(
                        url: ERROR_PREDICTION_MODEL,
                        httpMode: 'POST',
                        contentType: 'APPLICATION_JSON',
                        acceptType: 'APPLICATION_JSON',
                        requestBody: '{"log": "' + buildLogs + '"}',
                        customHeaders: [[name: 'Authorization', value: "Bearer ${AZURE_ML_API_KEY}"]]
                    )

                    // Parse the prediction response (assuming a 'high' or 'low' risk)
                    def prediction = readJSON text: response.content
                    echo "Predicted error risk: ${prediction.error}"

                    if (prediction.error == 'high') {
                        currentBuild.result = 'FAILURE'
                        echo "High risk of failure, aborting pipeline."
                    } else {
                        echo "Low risk, proceeding with deployment."
                    }
                }
            }
        }

        stage('Increment Version') {
            steps {
                script {
                    // Version increment logic (as per your original script)
                }
            }
        }

        stage('Create .zip Archive') {
            steps {
                script {
                    bat "powershell Compress-Archive -Path dist\\* -DestinationPath \"${ZIP_FILE}\""
                    echo "Created ${ZIP_FILE}"
                }
            }
        }

        stage('Upload to Nexus') {
            steps {
                script {
                    def artifactFile = "${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip"
                    def nexusRepositoryUrl = "${NEXUS_URL}${artifactFile}"
                    bat """
                        curl -u ${NEXUS_USER}:${NEXUS_PASSWORD} -X PUT -F "file=@${artifactFile}" ${nexusRepositoryUrl}
                    """
                }
            }
        }

        stage('Deploy to Nginx') {
            steps {
                script {
                    bat "xcopy /E /I /H /Y dist \"${NGINX_PATH}\""
                    echo "Moved dist folder to Nginx directory"
                }
            }
        }
    }

    post {
        always {
            bat 'del /F /Q *.zip || true'
        }
        failure {
            script {
                echo "Pipeline failed, deploying the latest LTS version..."
                // Fallback logic for deploying the LTS version
            }
        }
    }
}





// pipeline {
//     agent any
 
//     triggers {
//         githubPush() // Trigger the pipeline on GitHub push events
//     }
 
//     environment {
//         NODE_HOME = tool 'NODE_HOME'  // Use the NodeJS configured in Jenkins
//         PATH = "${NODE_HOME}/bin:${env.PATH}"
//         NEXUS_URL = 'http://localhost:8081/repository/dist/'  // Nexus Repository URL
//         NEXUS_USER = 'admin'  // Nexus Username
//         NEXUS_PASSWORD = 'vamsi@123'  // Nexus Password
//         ARTIFACT_NAME = 'middlewaretalents'  // Artifact Name
//         ARTIFACT_VERSION = '1.0.1'  // Artifact Version (modify this dynamically)
//         GROUP_ID = 'com.middlewaretalents'  // Artifact Group ID
//         NGINX_PATH = 'C:\\Users\\MTL1020\\Downloads\\nginx-1.26.2\\nginx-1.26.2\\html'  // Nginx Path
//         AZURE_RESOURCE_GROUP = 'vamsi'  // Azure Resource Group
//         AZURE_APP_NAME = 'vamsiweb'  // Azure Web App Name
//         ZIP_FILE = "${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip"  // Zip file for Azure Web App deployment
//         IS_LTS = 'false'  // Flag to determine if this version is LTS
//     }
 
//     stages {
//         stage('Checkout Code') {
//             steps {
//                 git branch: 'main', url: 'https://github.com/vamsimohanyacham/test.git', credentialsId: '2f167f4e-84fd-4929-8d9a-ba8f849897bd'
//             }
//         }
 
//         stage('Install Dependencies') {
//             steps {
//                 bat 'npm install'
//             }
//         }
 
//         stage('Build Vite App') {
//             steps {
//                 bat 'npm run build'
//             }
//         }
 
//         stage('Increment Version') {
//             steps {
//                 script {
//                     // Fetch the list of artifacts from Nexus repository
//                     def artifactUrl = "http://localhost:8081/#browse/browse:dist"
//                     echo "Fetching versions from Nexus repository: ${artifactUrl}"
 
//                     // Get all available versions from Nexus
//                     def response = bat(script: "curl -u admin:vamsi@123 -s \"http://localhost:8081/service/rest/v1/search?repository=dist\"", returnStdout: true).trim()            
//                     echo "Nexus Response: ${response}"
 
//                     // Extract version numbers from the response
//                     def versionList = []
//                     response.split('\n').each { line ->
//                         if (line.contains("${ARTIFACT_NAME}-")) {
//                             def versionMatch = (line =~ /${ARTIFACT_NAME}-(\d+\.\d+\.\d+)/)
//                             if (versionMatch) {
//                                 versionList.add(versionMatch[0][1])
//                             }
//                         }
//                     }
 
//                     // Sort and find the latest version (highest patch version)
//                     def latestVersion = '1.0.0'  // Default if no versions are found
//                     if (versionList.size() > 0) {
//                         latestVersion = versionList.sort().last()
//                     }
//                     echo "Latest version found in Nexus: ${latestVersion}"
 
//                     // Split version into major, minor, patch
//                     def versionParts = latestVersion.tokenize('.')
//                     def major = versionParts[0].toInteger()
//                     def minor = versionParts[1].toInteger()
//                     def patch = versionParts[2].toInteger()
 
//                     // Check if the minor version should be incremented
//                     if (minor == 0) {
//                         // If the minor version is 0 (e.g., 1.0.x), increment to 1.1.0
//                         minor = 1
//                         patch = 0
//                     } else {
//                         // Otherwise, increment the patch version
//                         patch += 1
//                     }
 
//                     // Construct the new version
//                     ARTIFACT_VERSION = "${major}.${minor}.${patch}"
 
//                     echo "New incremented version: ${ARTIFACT_VERSION}"
 
//                     // Now check for LTS flag after incrementing version
//                     if (IS_LTS == 'true') {
//                         ARTIFACT_VERSION = "${ARTIFACT_VERSION}-LTS"  // Appending -LTS if flag is true
//                         echo "Marking this version as LTS: ${ARTIFACT_VERSION}"
//                     } else {
//                         echo "Version is a normal artifact: ${ARTIFACT_VERSION}"
//                     }
//                 }
//             }
//         }
 
//         stage('Create .zip Archive') {
//             steps {
//                 script {
//                     def zipFileName = "${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip"
//                     // Use double quotes to handle special characters correctly
//                     bat "powershell Compress-Archive -Path dist\\* -DestinationPath \"${zipFileName}\""
//                     echo "Created ${zipFileName}"
//                 }
//             }
//         }
// stage('Upload to Nexus') {
//             steps {
//                 script {
//                     def artifactFile = "${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip"
//                     def nexusRepositoryUrl = "${NEXUS_URL}${artifactFile}"
//                     bat """
//                         echo Uploading ${artifactFile} to Nexus...
//                         curl -u ${NEXUS_USER}:${NEXUS_PASSWORD} -X PUT -F "file=@${artifactFile}" ${nexusRepositoryUrl}
//                     """
//                 }
//             }
//         }
 
//         stage('Download Artifact from Nexus') {
//             steps {
//                 script {
//                     def artifactFile = "${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip"
//                     echo "Downloading ${artifactFile} from Nexus..."
//                     bat """
//                         curl -u ${NEXUS_USER}:${NEXUS_PASSWORD} -O ${NEXUS_URL}${artifactFile}
//                     """
//                 }
//             }
//         }
 
//         stage('Extract Artifact from Nexus') {
//             steps {
//                 script {
//                     echo "Extracting ${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip..."
//                     bat "powershell Expand-Archive -Path ${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip -DestinationPath ."
//                     echo "Artifact extracted"
//                 }
//             }
//         }
 
//         stage('Move dist to Nginx Directory') {
//             steps {
//                 script {
//                     bat "xcopy /E /I /H /Y dist \"${NGINX_PATH}\""
//                     echo "Moved dist folder to Nginx directory"
//                 }
//             }
//         }
//     }
 
//     post {
//         always {
//             bat 'del /F /Q *.zip || true'
//         }
//         failure {
//             script {
//                 echo "Pipeline failed, deploying the latest LTS version..."
 
//                 // Fetch the list of artifacts from Nexus repository
//                 def artifactUrl = "http://localhost:8081/#browse/browse:dist"
//                 echo "Fetching versions from Nexus repository: ${artifactUrl}"
 
//                 // Get all available versions from Nexus
//                 def response = bat(script: "curl -u ${NEXUS_USER}:${NEXUS_PASSWORD} -s \"http://localhost:8081/service/rest/v1/search?repository=dist\"", returnStdout: true).trim()
//                 echo "Nexus Response: ${response}"
 
//                 // Extract LTS version numbers from the response
//                 def ltsVersionList = []
//                 response.split('\n').each { line ->
//                     if (line.contains("${ARTIFACT_NAME}-") && line.contains("-LTS")) {
//                         def versionMatch = (line =~ /${ARTIFACT_NAME}-(\d+\.\d+\.\d+)-LTS/)
//                         if (versionMatch) {
//                             ltsVersionList.add(versionMatch[0][1])
//                         }
//                     }
//                 }
 
//                 // If LTS versions are found, get the latest one
//                 if (ltsVersionList.size() > 0) {
//                     def latestLTSVersion = ltsVersionList.sort().last()
//                     echo "Latest LTS version found: ${latestLTSVersion}"
 
//                     // Set the artifact version to the latest LTS version
//                     ARTIFACT_VERSION = "${latestLTSVersion}-LTS"
//                     echo "Deploying latest LTS version: ${ARTIFACT_VERSION}"
 
//                     // Download the LTS artifact from Nexus
//                     def artifactFile = "${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip"
//                     echo "Downloading ${artifactFile} from Nexus..."
//                     bat """
//                         curl -u ${NEXUS_USER}:${NEXUS_PASSWORD} -O ${NEXUS_URL}${artifactFile}
//                     """
 
//                     // Extract the artifact
//                     echo "Extracting ${artifactFile}..."
//                     bat "powershell Expand-Archive -Path ${artifactFile} -DestinationPath ."
//                     echo "Artifact extracted"
 
//                     // Move the dist folder to Nginx directory
//                     echo "Moving dist folder to Nginx directory..."
//                     bat "xcopy /E /I /H /Y dist \"${NGINX_PATH}\""
//                     echo "Deployed ${artifactFile} to Nginx"
//                 } else {
//                     echo "No LTS version found in Nexus, deploying the first version (1.0.1)..."
 
//                     // Fallback to the first version if no LTS version found
//                     def firstVersion = '1.0.1'
//                     def artifactFile = "${ARTIFACT_NAME}-${firstVersion}.zip"
//                     echo "Downloading ${artifactFile} from Nexus..."
//                     bat """
//                         curl -u ${NEXUS_USER}:${NEXUS_PASSWORD} -O ${NEXUS_URL}${artifactFile}
//                     """
 
//                     // Extract the artifact
//                     echo "Extracting ${ARTIFACT_NAME}-${firstVersion}.zip..."
//                     bat "powershell Expand-Archive -Path ${ARTIFACT_NAME}-${firstVersion}.zip -DestinationPath ."
//                     echo "Artifact extracted"
 
//                     // Move the dist folder to Nginx directory
//                     echo "Moving dist folder for version 1.0.1 to Nginx directory..."
//                     bat "xcopy /E /I /H /Y dist \"${NGINX_PATH}\""
//                     echo "Deployed version 1.0.1 to Nginx"
//                 }
//             }
//         }
//     }
// }



// pipeline {
//     agent any

//     environment {
//         ARTIFACT_VERSION = '1.0.0'  // Default version (will be overridden by verion.txt)
//     }

//     stages {
//         stage('Checkout SCM') {
//             steps {
//                 checkout scm  // Use this single step to checkout the repository from GitHub
//             }
//         }

//         stage('Retrieve Version') {
//             steps {
//                 echo 'Retrieving version from version.txt'
//                 script {
//                     def VERSION_FILE = 'version.txt'  // Path to version.txt

//                     // Check if version.txt exists
//                     if (fileExists(VERSION_FILE)) {
//                         // Read the version from version.txt
//                         def currentVersion = readFile(VERSION_FILE).trim()

//                         // Check if version is empty or malformed, set default version if so
//                         if (!currentVersion || !currentVersion.matches("\\d+\\.\\d+\\.\\d+")) {
//                             currentVersion = '1.0.0'
//                         }

//                         // Increment the patch version
//                         def versionParts = currentVersion.tokenize('.')
//                         versionParts[2] = (versionParts[2].toInteger() + 1).toString()  // Increment patch version
//                         ARTIFACT_VERSION = versionParts.join('.')

//                     } else {
//                         // If version.txt doesn't exist, initialize the version to 1.0.0
//                         echo 'version.txt not found. Initializing to version 1.0.0'
//                         ARTIFACT_VERSION = '1.0.0'

//                         // Create version.txt with the initial version if it doesn't exist
//                         writeFile(file: VERSION_FILE, text: ARTIFACT_VERSION)
//                     }

//                     // Write the new version back to version.txt
//                     writeFile(file: VERSION_FILE, text: ARTIFACT_VERSION)

//                     echo "New version: ${ARTIFACT_VERSION}"
//                 }
//             }
//         }

//         stage('Install Dependencies') {
//             steps {
//                 echo 'Installing dependencies using npm...'
//                 script {
//                     // Ensure npm install works without skipping
//                     bat 'npm install'
//                 }
//             }
//         }

//         stage('Ensure Vite is Executable') {
//             steps {
//                 echo 'Ensure Vite is executable'
//                 script {
//                     // Skip chmod for Windows-based systems
//                     if (isUnix()) {
//                         sh 'chmod +x node_modules/.bin/vite'  // Ensure vite is executable for Unix
//                     } else {
//                         echo 'Skipping chmod on Windows, as it is not necessary'
//                     }
//                 }
//             }
//         }

//         stage('Build Vite App') {
//             steps {
//                 echo 'Building the Vite app'
//                 script {
//                     // Run the Vite build process
//                     bat 'npm run build'
//                 }
//             }
//         }

//         stage('Create .zip Archive') {
//             steps {
//                 echo 'Creating .zip archive for build'
//                 script {
//                     // Create zip file based on OS
//                     if (isUnix()) {
//                         sh 'zip -r build.zip dist/*'  // Create zip file for Unix-based systems
//                     } else {
//                         bat 'powershell -Command "Compress-Archive -Path dist/* -DestinationPath build.zip"'  // Windowcommand
//                     }
//                 }
//             }
//         }

//         stage('Deploy to Nginx') {
//             steps {
//                 echo 'Deploying to Nginx'
//                 script {
//                     // Add your deployment command here
//                     echo 'Deploying the built app to Nginx or another web server'
//                 }
//             }
//         }

//         stage('Push Version to GitHub') {
//             steps {
//                 echo 'Pushing version.txt changes to GitHub'
//                 script {
//                     // Add and commit version.txt changes
//                     bat 'git add version.txt'
//                     bat "git commit -m \"Update version to ${ARTIFACT_VERSION}\""
                    
//                     // Ensure the repository is clean before pushing
//                     bat 'git pull origin main'  // Pull latest changes from main branch

//                     // Push the updated version.txt to the repository
//                     bat 'git push origin main'  // Push changes to main branch
//                 }
//             }
//         }
//     }

//     post {
//         success {
//             echo 'Pipeline completed successfully!'
//         }

//         failure {
//             echo 'Pipeline failed!'
//         }

//         always {
//             echo 'Cleaning up resources if needed'
//         }
//     }
// }
