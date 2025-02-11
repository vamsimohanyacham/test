pipeline {
    agent any

    triggers {
        githubPush() // Trigger the pipeline on GitHub push events
    }

    parameters {
        booleanParam(name: 'IS_LTS', defaultValue: true, description: 'Mark this version as LTS')
    }

    environment {
        NODE_HOME = tool 'nodejs'  // Use the NodeJS configured in Jenkins
        PATH = "${NODE_HOME}/bin:${env.PATH}"
        NEXUS_URL = 'http://localhost:8081/repository/dist/'  // Nexus Repository URL
        NEXUS_USER = 'admin'  // Nexus Username
        NEXUS_PASSWORD = 'vamsi@123'  // Nexus Password
        ARTIFACT_NAME = 'middlewaretalents'  // Artifact Name
        ARTIFACT_VERSION = '1.0.1'  // Artifact Version (modify this dynamically)
        GROUP_ID = 'com.middlewaretalents'  // Artifact Group ID
        NGINX_PATH = 'C:\\Users\\MTL1020\\Downloads\\nginx-1.26.2\\nginx-1.26.2\\html'  // Nginx Path
        AZURE_RESOURCE_GROUP = 'vamsi'  // Azure Resource Group
        AZURE_APP_NAME = 'vamsiweb'  // Azure Web App Name
        ZIP_FILE = "${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip"  // Zip file for Azure Web App deployment
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

        stage('Increment Version') {
            steps {
                script {
                    // Fetch the list of artifacts from Nexus repository
                    def artifactUrl = "http://localhost:8081/#browse/browse:dist"
                    echo "Fetching versions from Nexus repository: ${artifactUrl}"

                    // Get all available versions from Nexus
                    def response = bat(script: "curl -u admin:vamsi@123 -s \"http://localhost:8081/service/rest/v1/search?repository=dist\"", returnStdout: true).trim()            
                    echo "Nexus Response: ${response}"

                    // Extract version numbers from the response
                    def versionList = []
                    response.split('\n').each { line ->
                        if (line.contains("${ARTIFACT_NAME}-")) {
                            def versionMatch = (line =~ /${ARTIFACT_NAME}-(\d+\.\d+\.\d+)/)
                            if (versionMatch) {
                                versionList.add(versionMatch[0][1])
                            }
                        }
                    }

                    // Sort and find the latest version (highest patch version)
                    if (versionList.size() > 0) {
                        def latestVersion = versionList.sort().last()
                        echo "Latest version found in Nexus: ${latestVersion}"

                        // Increment the patch version
                        def versionParts = latestVersion.tokenize('.')
                        def patchVersion = versionParts[-1].toInteger() + 1
                        ARTIFACT_VERSION = "${versionParts[0]}.${versionParts[1]}.${patchVersion}"

                        echo "New incremented version: ${ARTIFACT_VERSION}"
                    } else {
                        // If no versions are found, start from 1.0.0
                        ARTIFACT_VERSION = '1.0.0'
                        echo "No versions found, starting with version: ${ARTIFACT_VERSION}"
                    }

                    // If the build is supposed to be an LTS version, mark it
                    if (params.IS_LTS) {
                        ARTIFACT_VERSION += "-LTS"
                        echo "Marking version as LTS: ${ARTIFACT_VERSION}"
                    }
                }
            }
        }

        stage('Create .zip Archive') {
            steps {
                script {
                    bat "powershell Compress-Archive -Path dist\\* -DestinationPath ${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip"
                    echo "Created ${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip"
                }
            }
        }

        stage('Upload to Nexus') {
            steps {
                script {
                    def artifactFile = "${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip"
                    def nexusRepositoryUrl = "${NEXUS_URL}${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip"
                    bat """
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
                    bat """
                        curl -u ${NEXUS_USER}:${NEXUS_PASSWORD} -O ${NEXUS_URL}${artifactFile}
                    """
                }
            }
        }

        stage('Extract Artifact from Nexus') {
            steps {
                script {
                    echo "Extracting ${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip..."
                    bat "powershell Expand-Archive -Path ${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip -DestinationPath ."
                    echo "Artifact extracted"
                }
            }
        }

        stage('Move dist to Nginx Directory') {
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
                echo "Pipeline failed, deploying the last LTS version..."

                // Fetch the last LTS version from Nexus
                def ltsVersion = getLastLTSVersion()
                echo "Last LTS Version: ${ltsVersion}"

                if (!ltsVersion) {
                    echo "No LTS version found, creating a new LTS version..."
                    // Mark the current version as LTS if no LTS exists
                    ARTIFACT_VERSION += "-LTS"
                    echo "New LTS version created: ${ARTIFACT_VERSION}"
                    // Upload the new LTS version to Nexus
                    def artifactFile = "${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip"
                    bat """
                        curl -u ${NEXUS_USER}:${NEXUS_PASSWORD} -X PUT -F "file=@${artifactFile}" ${NEXUS_URL}${artifactFile}
                    """
                    ltsVersion = ARTIFACT_VERSION // Use the newly created LTS version
                }

                // Download the LTS version
                def artifactFile = "${ARTIFACT_NAME}-${ltsVersion}.zip"
                echo "Downloading ${artifactFile} from Nexus..."
                bat """
                    curl -u ${NEXUS_USER}:${NEXUS_PASSWORD} -O ${NEXUS_URL}${artifactFile}
                """

                echo "Extracting ${ARTIFACT_NAME}-${ltsVersion}.zip..."
                bat "powershell Expand-Archive -Path ${ARTIFACT_NAME}-${ltsVersion}.zip -DestinationPath ."
                echo "Artifact extracted"

                echo "Moving dist folder for LTS version ${ltsVersion} to Nginx directory..."
                bat "xcopy /E /I /H /Y dist \"${NGINX_PATH}\""
                echo "Deployed LTS version ${ltsVersion} to Nginx"
            }
        }
    }

    // Function to get the last LTS version
    def getLastLTSVersion() {
        // Fetch versions from Nexus and filter out the LTS versions
        def response = bat(script: "curl -u admin:vamsi@123 -s \"http://localhost:8081/service/rest/v1/search?repository=dist\"", returnStdout: true).trim()
        def ltsVersionList = []

        response.split('\n').each { line ->
            if (line.contains("${ARTIFACT_NAME}-") && line.contains("-LTS")) {
                def versionMatch = (line =~ /${ARTIFACT_NAME}-(\d+\.\d+\.\d+-LTS)/)
                if (versionMatch) {
                    ltsVersionList.add(versionMatch[0][1])
                }
            }
        }

        // If no LTS versions found, return null
        return ltsVersionList.size() > 0 ? ltsVersionList.sort().last() : null
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
//                 bat 'npm instll'
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
//                     if (versionList.size() > 0) {
//                         def latestVersion = versionList.sort().last()
//                         echo "Latest version found in Nexus: ${latestVersion}"

//                         // Increment the patch version
//                         def versionParts = latestVersion.tokenize('.')
//                         def patchVersion = versionParts[-1].toInteger() + 1
//                         ARTIFACT_VERSION = "${versionParts[0]}.${versionParts[1]}.${patchVersion}"

//                         echo "New incremented version: ${ARTIFACT_VERSION}"
//                     } else {
//                         // If no versions are found, start from 1.0.0
//                         ARTIFACT_VERSION = '1.0.0'
//                         echo "No versions found, starting with version: ${ARTIFACT_VERSION}"
//                     }
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
 
// stage('Increment Version') {
//     steps {
//         script {
//             // Fetch the list of artifacts from Nexus repository
//             // def artifactUrl = "${NEXUS_URL}${GROUP_ID.replace('.', '/')}/${ARTIFACT_NAME}/"
//             def artifactUrl = "http://localhost:8081/#browse/browse:dist"
//             echo "Fetching versions from Nexus repository: ${artifactUrl}"

//             // Get all available versions from Nexus
//                     def response = bat(script: "curl -u admin:vamsi@123 -s \"http://localhost:8081/service/rest/v1/search?repository=dist\"", returnStdout: true).trim()            
//             echo "Nexus Response: ${response}"

//             // Extract version numbers from the response
//             def versionList = []
//             response.split('\n').each { line ->
//                 if (line.contains("${ARTIFACT_NAME}-")) {
//                     def versionMatch = (line =~ /${ARTIFACT_NAME}-(\d+\.\d+\.\d+)/)
//                     if (versionMatch) {
//                         versionList.add(versionMatch[0][1])
//                     }
//                 }
//             }

//             // Sort and find the latest version (highest patch version)
//             if (versionList.size() > 0) {
//                 def latestVersion = versionList.sort().last()
//                 echo "Latest version found in Nexus: ${latestVersion}"

//                 // Increment the patch version
//                 def versionParts = latestVersion.tokenize('.')
//                 def patchVersion = versionParts[-1].toInteger() + 1
//                 ARTIFACT_VERSION = "${versionParts[0]}.${versionParts[1]}.${patchVersion}"

//                 echo "New incremented version: ${ARTIFACT_VERSION}"
//             } else {
//                 // If no versions are found, start from 1.0.0
//                 ARTIFACT_VERSION = '1.0.0'
//                 echo "No versions found, starting with version: ${ARTIFACT_VERSION}"
//             }
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


