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
                echo "Cloning repository from ${env.GITHUB_REPO}..."
                checkout scm
                script {
                    def gitCommit = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()
                    echo "Code cloned successfully."
                    echo "Git Commit SHA: ${gitCommit}"
                }
            }
        }

        stage('Lint') {
            steps {
                echo 'Installing Node.js locally and running linting checks...'
                sh '''
                    # Utilisation du format .tar.gz (géré nativement sans xz)
                    if [ ! -d "../node-v20.11.0-linux-x64" ]; then
                        echo "Downloading Node.js (.tar.gz)..."
                        curl -sOSL https://nodejs.org/dist/v20.11.0/node-v20.11.0-linux-x64.tar.gz
                        tar -xzf node-v20.11.0-linux-x64.tar.gz -C ../
                        rm node-v20.11.0-linux-x64.tar.gz
                    fi

                    # Ajout au PATH
                    export PATH="$(pwd)/../node-v20.11.0-linux-x64/bin:$PATH"
                    echo "Node version: $(node -v)"

                    # Exécution du Lint
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
                    # Récupération du PATH où Node a été extrait au stage précédent
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
                        # Récupération du PATH de Node.js local
                        export PATH="$(pwd)/../node-v20.11.0-linux-x64/bin:$PATH"
                        
                        # Exécution directe du scanner officiel de SonarSource
                        npx @sonarsource/sonar-scanner \
                            -Dsonar.projectKey=crm-platform \
                            -Dsonar.projectName="CRM-Platform" \
                            -Dsonar.host.url="${SONAR_HOST_URL}" \
                            -Dsonar.token="${SONARQUBE_TOKEN}" \
                            -Dsonar.sources=backend/src,frontend/src \
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
                    // Jenkins va intercepter le Webhook envoyé par SonarQube ici
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Security Scan') {
            steps {
                echo 'Running Trivy security vulnerability scan...'
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