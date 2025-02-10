pipeline {
    agent any
    
    environment {
        ARTIFACT_VERSION = '1.0.1' // This will be dynamically updated
    }
    
    stages {
       stage('Checkout Code') {
             steps {
                 git branch: 'main', url: 'https://github.com/vamsimohanyacham/test.git', credentialsId: '2f167f4e-84fd-4929-8d9a-ba8f849897bd'
             }
         }

        // Install dependencies using npm
        stage('Install Dependencies') {
            steps {
                // Ensure that NodeJS is installed via Jenkins Global Tools (NodeJS Plugin must be installed)
                bat 'npm install'
            }
        }

        // Build the app using Vite
        stage('Build Vite App') {
            steps {
                bat 'npm run build'
            }
        }

        // Increment the version dynamically
        stage('Increment Version') {
            steps {
                script {
                    // Get the current git version (ensure the repo is cloned)
                    bat 'git describe --tags --abbrev=0'
                    
                    // Increment version logic (assuming a semantic version format)
                    def currentVersion = '1.0.0'
                    def versionParts = currentVersion.tokenize('.')
                    def patchVersion = versionParts[-1].toInteger() + 1
                    ARTIFACT_VERSION = "${versionParts[0]}.${versionParts[1]}.${patchVersion}"
                    echo "New version: ${ARTIFACT_VERSION}"
                }
            }
        }

        // Stage the changes, commit, and push to Git repository
        stage('Stage and Commit Changes') {
            steps {
                script {
                    // Check git status
                    bat 'git status'

                    // Stage the changes (add all)
                    bat 'git add .'

                    // Commit the changes (make sure the version update is included)
                    bat 'git commit -m "Updated app for new version ${ARTIFACT_VERSION}"'

                    // Push the changes to the repository (ensure you have the proper credentials set up in Jenkins)
                    bat 'git push origin main'
                }
            }
        }

        // Create a .zip archive of the dist folder
        stage('Create .zip Archive') {
            steps {
                script {
                    // Ensure PowerShell is available for creating the zip file (PowerShell Plugin required)
                    bat "powershell Compress-Archive -Path dist\\* -DestinationPath middlewaretalents-${ARTIFACT_VERSION}.zip"
                    echo "Created middlewaretalents-${ARTIFACT_VERSION}.zip"
                }
            }
        }
    }
    
    post {
        always {
            // Clean up: Delete any unnecessary files (e.g., old zip files)
            bat 'del /F /Q *.zip || true'
        }
    }
}





// pipeline {
//     agent any
 
//     triggers {
//         githubPush() // Trigger the pipeline on GitHub push events
//     }
//     environment {
//         NODE_HOME = tool 'nodejs'  // Use the NodeJS configured in Jenkins
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
 
//   stage('Increment Version') {
//     steps {
//         script {
//             // Using Nexus REST API to fetch metadata for the artifact (for example, using `curl`)
//             def response = bat(script: """
//                 curl -u admin:vamsi@123 -s "http://localhost:8081/repository/dist/middlewaretalents/1.0.1/middlewaretalents-1.0.1.zip"
//             """, returnStdout: true).trim()
 
//             echo "Nexus Response: ${response}"
 
//             // Example logic to increment the version (assuming version is 1.0.1)
//             def currentVersion = '1.0.0' // You can replace this with logic to extract version from Nexus
//             def versionParts = currentVersion.tokenize('.')
//             def patchVersion = versionParts[-1].toInteger() + 1
//             ARTIFACT_VERSION = "${versionParts[0]}.${versionParts[1]}.${patchVersion}"
 
//             echo "New version: ${ARTIFACT_VERSION}"
//         }
//     }
// }
 
 
//         stage('Create .zip Archive') {
//             steps {
//                 script {
//                     bat "powershell Compress-Archive -Path dist\\* -DestinationPath ${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip"
//                     echo "Created ${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip"
//                 }
//             }
//         }
 
//         stage('Upload to Nexus') {
//             steps {
//                 script {
//                     def artifactFile = "${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip"
//                     def nexusRepositoryUrl = "${NEXUS_URL}${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip"
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
//     }
// }

// pipeline {
//     agent any

//     triggers {
//         githubPush() // Trigger the pipeline on GitHub push events
//     }
    
//     environment {
//         NODE_HOME = tool 'nodejs'  // Use the NodeJS configured in Jenkins
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
//                     // Using Nexus REST API to fetch metadata for the artifact (for example, using `curl`)
//                     def response = bat(script: """
//                         curl -u admin:vamsi@123 -s "http://localhost:8081/repository/dist/middlewaretalents/1.0.1/middlewaretalents-1.0.1.zip"
//                     """, returnStdout: true).trim()

//                     echo "Nexus Response: ${response}"

//                     // Example logic to increment the version (assuming version is 1.0.1)
//                     def currentVersion = '1.0.3' // You can replace this with logic to extract version from Nexus
//                     def versionParts = currentVersion.tokenize('.')
//                     def patchVersion = versionParts[-1].toInteger() + 1
//                     ARTIFACT_VERSION = "${versionParts[0]}.${versionParts[1]}.${patchVersion}"

//                     echo "New version: ${ARTIFACT_VERSION}"
//                 }
//             }
//         }
//         stage('Create .zip Archive') {
//             steps {
//                 script {
//                     bat "powershell Compress-Archive -Path dist\\* -DestinationPath ${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip"
//                     echo "Created ${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip"
//                 }
//             }
//         }

//         stage('Upload to Nexus') {
//             steps {
//                 script {
//                     def artifactFile = "${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip"
//                     def nexusRepositoryUrl = "${NEXUS_URL}${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip"
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
//                 echo "Pipeline failed, deploying the first version (1.0.1)..."

//                 // Download the first version (1.0.1)
//                 def firstVersion = '1.0.1'
//                 def artifactFile = "${ARTIFACT_NAME}-${firstVersion}.zip"
//                 echo "Downloading ${artifactFile} from Nexus..."
//                 bat """
//                     curl -u ${NEXUS_USER}:${NEXUS_PASSWORD} -O ${NEXUS_URL}${artifactFile}
//                 """

//                 echo "Extracting ${ARTIFACT_NAME}-${firstVersion}.zip..."
//                 bat "powershell Expand-Archive -Path ${ARTIFACT_NAME}-${firstVersion}.zip -DestinationPath ."
//                 echo "Artifact extracted"

//                 echo "Moving dist folder for version 1.0.1 to Nginx directory..."
//                 bat "xcopy /E /I /H /Y dist \"${NGINX_PATH}\""
//                 echo "Deployed version 1.0.1 to Nginx"
//             }
//         }
//     }
// }


