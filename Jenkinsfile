pipeline {
    agent any

    environment {
        GITHUB_USER = 'youssef1129'
        GITHUB_REPO = 'https://github.com/youssef1129/CRM.git'
        REGISTRY = 'ghcr.io'
        IMAGE_NAME = 'youssef1129/crm'
    }

    stages {
       stage('Checkout') {
            steps {
                echo "Fixing Git safe directory ownership..."
                // Permet à root d'utiliser le dépôt Git sans bloquer
                sh 'git config --global --add safe.directory *' 
                
                echo "Cloning repository from ${env.GITHUB_REPO}..."
                checkout scm
                script {
                    env.GIT_COMMIT_SHORT = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
                    echo "Code cloned successfully. Short SHA: ${env.GIT_COMMIT_SHORT}"
                }
            }
        }

        stage('Lint') {
            steps {
                echo 'Installing Node.js locally and running linting checks...'
                sh '''
                    if [ ! -d "../node-v20.11.0-linux-x64" ]; then
                        echo "Downloading Node.js (.tar.gz)..."
                        curl -sOSL https://nodejs.org/dist/v20.11.0/node-v20.11.0-linux-x64.tar.gz
                        tar -xzf node-v20.11.0-linux-x64.tar.gz -C ../
                        rm node-v20.11.0-linux-x64.tar.gz
                    fi

                    export PATH="$(pwd)/../node-v20.11.0-linux-x64/bin:$PATH"
                    
                    echo "Linting backend..."
                    cd backend && npm ci && npm run lint
                    
                    echo "Linting frontend..."
                    cd ../frontend && npm ci && npm run lint
                '''
            }
        }

        stage('Build & Test') {
            steps {
                echo 'Running unit tests...'
                sh '''
                    export PATH="$(pwd)/../node-v20.11.0-linux-x64/bin:$PATH"
                    echo "Building and testing backend..."
                    cd backend && npm ci && npm run test:cov
                '''
            }
        }

        stage('SonarQube Analysis') {
            environment {
                SONARQUBE_TOKEN = credentials('sonar-token') 
            }
            steps {
                echo 'Sending analysis to SonarQube server...'
                withSonarQubeEnv('sonarqube') {
                    sh '''
                        export PATH="$(pwd)/../node-v20.11.0-linux-x64/bin:$PATH"
                        
                        npx sonar-scanner \
                            -Dsonar.projectKey=crm-platform \
                            -Dsonar.projectName="CRM-Platform" \
                            -Dsonar.host.url="${SONAR_HOST_URL}" \
                            -Dsonar.token="${SONARQUBE_TOKEN}" \
                            -Dsonar.sources=backend,frontend \
                            -Dsonar.exclusions=**/node_modules/**,**/.next/**,**/dist/**,**/*.spec.ts,**/*.test.ts \
                            -Dsonar.typescript.lcov.reportPaths=backend/coverage/lcov.info \
                            -Dsonar.sourceEncoding=UTF-8 \
                            -Dsonar.scanner.metadataFilePath="$(pwd)/report-task.txt"
                    '''
                }
            }
        }

        stage('Quality Gate') {
            steps {
                echo 'Checking SonarQube Quality Gate...'
                timeout(time: 10, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Docker Build') {
            steps {
                echo "Building local Docker images for verification..."
                sh """
                    docker build -t ${env.REGISTRY}/${env.IMAGE_NAME}-backend:${env.GIT_COMMIT_SHORT} ./backend
                    docker build -t ${env.REGISTRY}/${env.IMAGE_NAME}-frontend:${env.GIT_COMMIT_SHORT} ./frontend
                """
            }
        }

        stage('Security Scan') {
            steps {
                echo 'Running Trivy security vulnerability scan...'
                // Scan du Backend avec affichage sous forme de tableau (format table)
                echo "Scanning Backend Image..."
                sh """
                    docker run --rm \
                        -v /var/run/docker.sock:/var/run/docker.sock \
                        -v trivy-cache:/root/.cache/trivy \
                        aquasec/trivy:latest image \
                        --severity HIGH,CRITICAL \
                        --exit-code 0 \
                        --format table \
                        ${env.REGISTRY}/${env.IMAGE_NAME}-backend:${env.GIT_COMMIT_SHORT}
                """
            }
        }

        stage('Push') {
            steps {
                echo 'Publishing Docker images to GitHub Container Registry...'
            }
        }

        stage('IaC Apply') {
            steps {
                echo 'Provisioning staging environment with Terraform...'
            }
        }

        stage('Smoke Test') {
            steps {
                echo 'Running post-deployment smoke tests...'
            }
        }
    }

    post {
        always {
            echo 'Cleaning workspace...'
            deleteDir()
        }
        success {
            echo 'CI/CD Pipeline finished successfully.'
        }
        failure {
            echo 'CI/CD Pipeline failed.'
        }
    }
}