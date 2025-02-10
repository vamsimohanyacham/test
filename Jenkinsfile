
pipeline {
    agent any

    triggers {
        githubPush() // Trigger the pipeline on GitHub push events
    }
    
    environment {
        NODE_HOME = tool 'nodejs'  // Use the NodeJS configured in Jenkins
        PATH = "${NODE_HOME}/bin:${env.PATH}"
        NEXUS_URL = 'http://localhost:8081/service/rest/v1/search/assets'  // Nexus REST API URL for assets search
        NEXUS_USER = 'admin'  // Nexus Username
        NEXUS_PASSWORD = 'vamsi@123'  // Nexus Password
        ARTIFACT_NAME = 'middlewaretalents'  // Artifact Name
        GROUP_ID = 'com.middlewaretalents'  // Artifact Group ID
        NGINX_PATH = 'C:\\Users\\MTL1020\\Downloads\\nginx-1.26.2\\nginx-1.26.2\\html'  // Nginx Path
        AZURE_RESOURCE_GROUP = 'vamsi'  // Azure Resource Group
        AZURE_APP_NAME = 'vamsiweb'  // Azure Web App Name
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
                    // Fetch the list of versions of the artifact from Nexus using the REST API
                    def response = bat(script: """
                        curl -u ${NEXUS_USER}:${NEXUS_PASSWORD} -s "${NEXUS_URL}?repository=dist&group=${GROUP_ID}&name=${ARTIFACT_NAME}"
                    """, returnStdout: true).trim()

                    echo "Nexus Response: ${response}"

                    // Parse the response to find the latest version
                    def versions = []
                    def jsonResponse = readJSON text: response

                    jsonResponse.items.each { item ->
                        def version = item.version
                        versions.add(version)
                    }

                    // Sort the versions in descending order
                    versions = versions.sort { a, b -> b <=> a }
                    def latestVersion = versions[0] // Latest version from the list

                    echo "Latest version in Nexus: ${latestVersion}"

                    // Increment the patch version
                    def versionParts = latestVersion.tokenize('.')
                    def patchVersion = versionParts[-1].toInteger() + 1
                    ARTIFACT_VERSION = "${versionParts[0]}.${versionParts[1]}.${patchVersion}"

                    echo "New version: ${ARTIFACT_VERSION}"
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
                    def nexusRepositoryUrl = "${NEXUS_URL}/${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip"
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
//             def currentVersion = '1.0.1' // You can replace this with logic to extract version from Nexus
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

//       triggers {
//         githubPush() // Trigger the pipeline on GitHub push events
//     }
    
//     environment {
//         NODE_HOME = tool 'nodejs'  // Use the NodeJS configured in Jenkins
//         PATH = "${NODE_HOME}/bin:${env.PATH}"
//         NEXUS_URL = 'http://localhost:8081/repository/test/'  // Nexus Repository URL
//         NEXUS_USER = 'admin'  // Nexus Username (Replace with your username)
//         NEXUS_PASSWORD = 'vamsi@123'  // Nexus Password (Replace with your password)
//         ARTIFACT_NAME = 'middlewaretalents'  // Artifact Name (Replace with your artifact name)
//         ARTIFACT_VERSION = '1.0.1'  // Artifact Version (Modify if needed)
//         GROUP_ID = 'com.middlewaretalents'  // Artifact Group ID (Modify if needed)
//         NGINX_PATH = 'C:\\Users\\MTL1020\\Downloads\\nginx-1.26.2\\nginx-1.26.2\\html'  // Path to Nginx HTML directory (Modify if needed)
//         AZURE_RESOURCE_GROUP = 'vamsi'  // Azure Resource Group (Change this)
//         AZURE_APP_NAME = 'vamsiweb'  // Azure Web App Name (Change this)
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

//         stage('Check Build Directory') {
//             steps {
//                 bat 'dir dist'
//             }
//         }

//         stage('Lint Code') {
//             steps {
//                 bat 'npm run lint'
//             }
//         }

//         stage('Check Code Formatting') {
//             steps {
//                 bat 'npm run format'
//             }
//         }

//         stage('Run Tests') {
//             steps {
//                 bat 'npm run test'
//             }
//         }

//         stage('Check and Delete Old ZIP') {
//             steps {
//                 script {
//                     // Check if the dist.zip file exists and delete it if present
//                     bat '''
//                     IF EXIST dist.zip (
//                         DEL /F /Q dist.zip
//                         echo "Old dist.zip file deleted."
//                     ) ELSE (
//                         echo "No old dist.zip file found."
//                     )
//                     '''
//                 }
//             }
//         }
//         stage('Create ZIP File') {
//             steps {
//                 script {
//                     // Create a zip file of the build output (assuming build output is in "dist" folder)
//                     bat 'powershell -Command "Compress-Archive -Path dist\\* -DestinationPath dist.zip"'
//                     // Alternatively, if the output directory is "build", use: 
//                     // bat 'powershell -Command "Compress-Archive -Path build\\* -DestinationPath build.zip"'
//                 }
//             }
//         }        


//         stage('Create .zip Archive') {
//             steps {
//                 script {
//                     bat 'dir dist'
//                     bat "powershell Compress-Archive -Path dist\\* -DestinationPath ${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip"
//                     echo "Created ${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip from dist folder"
//                     bat 'dir'
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

//       stage('Move dist to Nginx Directory') {
//     steps {
//         script {
//             // Fix path by adding double quotes for spaces in path
//             bat "xcopy /E /I /H /Y dist \"${NGINX_PATH}\""
//             echo "Moved dist folder to Nginx directory"
//         }
//     }
// }


//         stage('Login to Azure') {
//             steps {
//                 script {
//                     withCredentials([  // Access Azure secrets from GitHub's secret manager (Jenkins Credentials)
//                         string(credentialsId: 'AZURE_CLIENT_ID', variable: 'AZURE_CLIENT_ID'), 
//                         string(credentialsId: 'AZURE_CLIENT_SECRET', variable: 'AZURE_CLIENT_SECRET'), 
//                         string(credentialsId: 'AZURE_TENANT_ID', variable: 'AZURE_TENANT_ID') 
//                     ]) {
//                         // Azure login using service principal
//                         bat """
//                             az login --service-principal -u ${AZURE_CLIENT_ID} -p ${AZURE_CLIENT_SECRET} --tenant ${AZURE_TENANT_ID}
//                         """
//                     }
//                 }
//             }
//         }

//         stage('Deploy to Azure') {
//             steps {
//                 script {
//                     // Use Azure CLI to deploy to Azure Web App
//                     bat """
//                     az webapp deploy --resource-group vamsi --name vamsiweb --src-path dist.zip
 
//                     """
//                 }
//             }
//         }


//     }

//     post {
//         always {
//             bat 'del /F /Q *.zip || true'
//         }
        
//        success {
//             // Ensure recipient emails are set properly
//             emailext (
//                 subject: "Deployment Successful: ${ARTIFACT_NAME}-${ARTIFACT_VERSION}",
//                 body: "The deployment of the artifact ${ARTIFACT_NAME}-${ARTIFACT_VERSION} was successful! You can now check the Nginx server to verify the update.",
//                 to: 'vamsi@middlewaretalents.com',  // Ensure email is not empty
//                 from: 'yaswanthkumarch2001@gmail.com'
//             )
//         }
 
//         failure {
//             emailext (
//                 subject: "Deployment Failed: ${ARTIFACT_NAME}-${ARTIFACT_VERSION}",
//                 body: "The deployment of the artifact ${ARTIFACT_NAME}-${ARTIFACT_VERSION} has failed. Please check the Jenkins logs for details.",
//                 to: 'vamsimohanyacham@gmail.com',
//                 from: 'yaswanthkumarch2001@gmail.com'
//             )
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
//         NEXUS_URL = 'http://localhost:8081/repository/test/'  // Nexus Repository URL
//         NEXUS_USER = 'admin'  // Nexus Username (Replace with your username)
//         NEXUS_PASSWORD = 'vamsi@123'  // Nexus Password (Replace with your password)
//         ARTIFACT_NAME = 'middlewaretalents'  // Artifact Name (Replace with your artifact name)
//         ARTIFACT_VERSION = '1.0.1'  // Artifact Version (Modify if needed)
//         GROUP_ID = 'com.middlewaretalents'  // Artifact Group ID (Modify if needed)
//         NGINX_PATH = 'C:\\Users\\MTL1020\\Downloads\\nginx-1.26.2\\nginx-1.26.2\\html'  // Path to Nginx HTML directory (Modify if needed)
//         AZURE_RESOURCE_GROUP = 'vamsi'  // Azure Resource Group (Change this)
//         AZURE_APP_NAME = 'vamsiweb'  // Azure Web App Name (Change this)
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

//         stage('Check Build Directory') {
//             steps {
//                 bat 'dir dist'
//             }
//         }

//         stage('Lint Code') {
//             steps {
//                 bat 'npm run lint'
//             }
//         }

//         stage('Check Code Formatting') {
//             steps {
//                 bat 'npm run format'
//             }
//         }

//         stage('Run Tests') {
//             steps {
//                 bat 'npm run test'
//             }
//         }

//         stage('Check and Delete Old ZIP') {
//             steps {
//                 script {
//                     // Check if the dist.zip file exists and delete it if present
//                     bat '''
//                     IF EXIST dist.zip (
//                         DEL /F /Q dist.zip
//                         echo "Old dist.zip file deleted."
//                     ) ELSE (
//                         echo "No old dist.zip file found."
//                     )
//                     '''
//                 }
//             }
//         }

//         stage('Create ZIP File') {
//             steps {
//                 script {
//                     // Create a zip file of the build output (assuming build output is in "dist" folder)
//                     bat 'powershell -Command "Compress-Archive -Path dist\\* -DestinationPath dist.zip"'
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
//                     // Fix path by adding double quotes for spaces in path
//                     bat "xcopy /E /I /H /Y dist \"${NGINX_PATH}\""
//                     echo "Moved dist folder to Nginx directory"
//                 }
//             }
//         }

//         stage('Login to Azure') {
//             steps {
//                 script {
//                     withCredentials([  
//                         string(credentialsId: 'AZURE_CLIENT_ID', variable: 'AZURE_CLIENT_ID'), 
//                         string(credentialsId: 'AZURE_CLIENT_SECRET', variable: 'AZURE_CLIENT_SECRET'), 
//                         string(credentialsId: 'AZURE_TENANT_ID', variable: 'AZURE_TENANT_ID') 
//                     ]) {
//                         // Azure login using service principal
//                         bat """
//                             az login --service-principal -u ${AZURE_CLIENT_ID} -p ${AZURE_CLIENT_SECRET} --tenant ${AZURE_TENANT_ID}
//                         """
//                     }
//                 }
//             }
//         }

//         stage('Deploy to Azure') {
//             steps {
//                 script {
//                     // Use Azure CLI to deploy to Azure Web App
//                     bat """
//                     az webapp deploy --resource-group ${AZURE_RESOURCE_GROUP} --name ${AZURE_APP_NAME} --src-path dist.zip
//                     """
//                 }
//             }
//         }

//     }

//     post {
//         always {
//             node {
//                 // Clean up ZIP files after the pipeline runs
//                 script {
//                     bat 'del /F /Q *.zip || true'
//                 }
//             }
//         }

//         success {
//             emailext (
//                 subject: "Deployment Successful: ${ARTIFACT_NAME}-${ARTIFACT_VERSION}",
//                 body: "The deployment of the artifact ${ARTIFACT_NAME}-${ARTIFACT_VERSION} was successful! You can now check the Nginx server to verify the update.",
//                 to: 'vamsi@middlewaretalents.com',  
//                 from: 'yaswanthkumarch2001@gmail.com'
//             )
//         }

//         failure {
//             emailext (
//                 subject: "Deployment Failed: ${ARTIFACT_NAME}-${ARTIFACT_VERSION}",
//                 body: "The deployment of the artifact ${ARTIFACT_NAME}-${ARTIFACT_VERSION} has failed. Please check the Jenkins logs for details.",
//                 to: 'vamsimohanyacham@gmail.com',
//                 from: 'yaswanthkumarch2001@gmail.com'
//             )
//         }
//     }
// }

