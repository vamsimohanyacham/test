pipeline {
    agent any

    triggers {
        githubPush() // Trigger the pipeline on GitHub push events
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

        // stage('Increment Version') {
        //     steps {
        //         script {
        //             // Using Nexus REST API to fetch metadata for the artifact (for example, using `curl`)
        //             def response = bat(script: """
        //                 curl -u admin:vamsi@123 -s "http://localhost:8081/repository/dist/middlewaretalents/1.0.1/middlewaretalents-1.0.1.zip"
        //             """, returnStdout: true).trim()

        //             echo "Nexus Response: ${response}"

        //             // Example logic to increment the version (assuming version is 1.0.1)
        //             def currentVersion = '1.0.3' // You can replace this with logic to extract version from Nexus
        //             def versionParts = currentVersion.tokenize('.')
        //             def patchVersion = versionParts[-1].toInteger() + 1
        //             ARTIFACT_VERSION = "${versionParts[0]}.${versionParts[1]}.${patchVersion}"

        //             echo "New version: ${ARTIFACT_VERSION}"
        //         }
        //     }
        // }
stage('Increment Version') {
    steps {
        script {
            // Define Nexus API URL (make sure to replace with your repository and group)
            def nexusApiUrl = "http://localhost:8081/service/rest/v1/components?repository=dist&group=com.middlewaretalents"

            // Fetch the JSON response from Nexus (list of components)
            def response = bat(script: """
                curl -u ${NEXUS_USER}:${NEXUS_PASSWORD} -s "${nexusApiUrl}"
            """, returnStdout: true).trim()

            // Parse the JSON response
            def jsonResponse = readJSON text: response

            // Extract artifact paths and versions
            def artifactPaths = []
            jsonResponse.items.each { item ->
                // Check for the artifact's name that matches the pattern
                if (item.name.startsWith("middlewaretalents") && item.name.endsWith(".zip")) {
                    // Extract version from the artifact path (e.g., "middlewaretalents-1.0.1.zip")
                    def version = item.version
                    def artifactPath = "middlewaretalents-${version}.zip"
                    artifactPaths.add(artifactPath)
                }
            }

            // Sort the artifact paths to find the latest version
            def sortedArtifactPaths = artifactPaths.sort { a, b ->
                def aVersion = a.tokenize('-')[1].tokenize('.').collect { it.toInteger() }
                def bVersion = b.tokenize('-')[1].tokenize('.').collect { it.toInteger() }
                return aVersion <=> bVersion
            }

            // Get the latest artifact path from the sorted list
            def latestArtifactPath = sortedArtifactPaths.last()
            
            echo "Latest artifact path found in Nexus: ${latestArtifactPath}"

            // Extract the version from the latest artifact path (e.g., "middlewaretalents-1.0.1.zip")
            def latestVersion = latestArtifactPath.tokenize('-')[1].tokenize('.').join('.')

            // Increment the patch version of the latest version
            def versionParts = latestVersion.tokenize('.')
            def patchVersion = versionParts[-1].toInteger() + 1
            ARTIFACT_VERSION = "${versionParts[0]}.${versionParts[1]}.${patchVersion}"

            echo "New version: ${ARTIFACT_VERSION}"

            // Now, we can construct the new artifact path with the updated version
            def newArtifactPath = "middlewaretalents-${ARTIFACT_VERSION}.zip"
            echo "New artifact path: ${newArtifactPath}"
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
                echo "Pipeline failed, deploying the first version (1.0.1)..."

                // Download the first version (1.0.1)
                def firstVersion = '1.0.1'
                def artifactFile = "${ARTIFACT_NAME}-${firstVersion}.zip"
                echo "Downloading ${artifactFile} from Nexus..."
                bat """
                    curl -u ${NEXUS_USER}:${NEXUS_PASSWORD} -O ${NEXUS_URL}${artifactFile}
                """

                echo "Extracting ${ARTIFACT_NAME}-${firstVersion}.zip..."
                bat "powershell Expand-Archive -Path ${ARTIFACT_NAME}-${firstVersion}.zip -DestinationPath ."
                echo "Artifact extracted"

                echo "Moving dist folder for version 1.0.1 to Nginx directory..."
                bat "xcopy /E /I /H /Y dist \"${NGINX_PATH}\""
                echo "Deployed version 1.0.1 to Nginx"
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
//             def currentVersion = '1.0.3' // You can replace this with logic to extract version from Nexus
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

