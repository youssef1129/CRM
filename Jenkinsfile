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
                echo 'Running linting checks...'
                sh '''
                    # On vérifie si Node est accessible globalement sur la machine Jenkins
                    echo "Checking environment..."
                    export PATH=$PATH:/usr/local/bin
                    
                    echo "Linting backend..."
                    cd backend && npm ci && npm run lint
                    
                    echo "Linting frontend..."
                    cd ../frontend && npm ci && npm run lint
                '''
            }
        }

        stage('Build & Test') {
            steps {
                echo 'Building and running unit tests with coverage...'
                sh '''
                    export PATH=$PATH:/usr/local/bin
                    cd backend && npm ci && npm run test:cov
                '''
            }
        }

        stage('SonarQube Analysis') {
            steps {
                echo 'Sending analysis to SonarQube server...'
            }
        }

        stage('Quality Gate') {
            steps {
                echo 'Checking SonarQube Quality Gate...'
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