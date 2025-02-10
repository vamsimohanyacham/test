pipeline {
    agent any

    triggers {
        githubPush() // Trigger the pipeline on GitHub push events
    }
    
    environment {
        NODE_HOME = tool 'nodejs'  // Use the NodeJS configured in Jenkins
        PATH = "${NODE_HOME}/bin:${env.PATH}"
        NEXUS_URL = 'http://localhost:8081/repository/dist/'  // Nexus Repository URL
        NEXUS_USER = 'admin'  // Nexus Username (Replace with your username)
        NEXUS_PASSWORD = 'vamsi@123'  // Nexus Password (Replace with your password)
        ARTIFACT_NAME = 'middlewaretalents'  // Artifact Name (Replace with your artifact name)
        GROUP_ID = 'com.middlewaretalents'  // Artifact Group ID (Modify if needed)
        NGINX_PATH = 'C:\\Users\\MTL1020\\Downloads\\nginx-1.26.2\\nginx-1.26.2\\html'  // Path to Nginx HTML directory (Modify if needed)
        AZURE_RESOURCE_GROUP = 'vamsi'  // Azure Resource Group (Change this)
        AZURE_APP_NAME = 'vamsiweb'  // Azure Web App Name (Change this)
        ZIP_FILE = "${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip"  // Zip file for Azure Web App deployment
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/vamsimohanyacham/test.git', credentialsId: '2f167f4e-84fd-4929-8d9a-ba8f849897bd'
            }
        }

        stage('Fetch Latest Artifact Version from Nexus') {
            steps {
                script {
                    // Debugging: Print Nexus URL and credentials
                    echo "Fetching versions from Nexus Repository at: ${NEXUS_URL}"
                    
                    // Get the latest version from Nexus by checking the existing artifact versions
                    def latestVersion = sh(script: """
                        echo "Fetching latest artifact version from Nexus..."
                        curl -u ${NEXUS_USER}:${NEXUS_PASSWORD} -X GET "${NEXUS_URL}${ARTIFACT_NAME}/" 2>&1 | tee output.txt
                        cat output.txt | jq -r '.[].version' | sort -V | tail -n 1
                    """, returnStdout: true).trim()

                    // If no version found, set the initial version to 1.0.1
                    if (!latestVersion) {
                        ARTIFACT_VERSION = '1.0.1'
                        echo "No version found. Setting initial version to: ${ARTIFACT_VERSION}"
                    } else {
                        // Increment the version by 0.0.1
                        echo "Latest version found: ${latestVersion}"
                        def versionParts = latestVersion.tokenize('.')
                        versionParts[-1] = (versionParts[-1].toInteger() + 1).toString()  // Increment the patch version
                        ARTIFACT_VERSION = versionParts.join('.')
                        echo "New Artifact Version: ${ARTIFACT_VERSION}"
                    }
                }
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

        stage('Check Build Directory') {
            steps {
                bat 'dir dist'
            }
        }

        stage('Lint Code') {
            steps {
                bat 'npm run lint'
            }
        }

        stage('Check Code Formatting') {
            steps {
                bat 'npm run format'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npm run test'
            }
        }

        stage('Create .zip Archive') {
            steps {
                script {
                    bat 'dir dist'
                    bat "powershell Compress-Archive -Path dist\\* -DestinationPath ${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip"
                    echo "Created ${ARTIFACT_NAME}-${ARTIFACT_VERSION}.zip from dist folder"
                    bat 'dir'
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
                    // Fix path by adding double quotes for spaces in path
                    bat "xcopy /E /I /H /Y dist \"${NGINX_PATH}\""
                    echo "Moved dist folder to Nginx directory"
                }
            }
        }
    }

    post {
        always {
            // Clean up ZIP files after the pipeline runs
            bat 'del /F /Q *.zip || true'
        }
    }
}




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

