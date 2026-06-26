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
            agent {
                docker {
                    image 'node:20-alpine'
                    reuseNode true
                }
            }
            steps {
                echo 'Running linting checks...'
                sh '''
                    echo "Linting backend..."
                    cd backend && npm ci && npm run lint
                    echo "Linting frontend..."
                    cd ../frontend && npm ci && npm run lint
                '''
            }
        }

        stage('Build & Test') {
            agent {
                docker {
                    image 'node:20-alpine'
                    reuseNode true
                }
            }
            steps {
                echo 'Building and running unit tests with coverage...'
                sh '''
                    cd backend && npm ci && npm run test:cov
                '''
            }
        }

        stage('SonarQube Analysis') {
            steps {
                echo 'Sending analysis to SonarQube server...'
                // Placeholder for sonar-scanner
                // withSonarQubeEnv('SonarQube-Server') {
                //     sh 'sonar-scanner -Dsonar.projectKey=CRM -Dsonar.sources=.'
                // }
            }
        }

        stage('Quality Gate') {
            steps {
                echo 'Checking SonarQube Quality Gate...'
                // Placeholder for waiting for quality gate
                // timeout(time: 10, unit: 'MINUTES') {
                //     waitForQualityGate abortPipeline: true
                // }
            }
        }

        stage('Security Scan') {
            steps {
                echo 'Running Trivy security vulnerability scan...'
                // Placeholder for Trivy scanner
                // sh 'trivy image --severity HIGH,CRITICAL ${env.REGISTRY}/${env.IMAGE_NAME}-backend:latest'
            }
        }

        stage('Push') {
            steps {
                echo 'Publishing Docker images to GitHub Container Registry...'
                // Placeholder for docker push
                // sh 'docker build -t ${env.REGISTRY}/${env.IMAGE_NAME}-backend:latest ./backend'
                // sh 'docker push ${env.REGISTRY}/${env.IMAGE_NAME}-backend:latest'
            }
        }

        stage('IaC Apply') {
            steps {
                echo 'Provisioning staging environment with Terraform...'
                // Placeholder for Terraform
                // sh 'cd terraform && terraform init && terraform apply -auto-approve'
            }
        }

        stage('Smoke Test') {
            steps {
                echo 'Running post-deployment smoke tests...'
                // Perform curl health check on deployed staging environment
                // sh 'curl -f http://localhost:8098/health'
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
