pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        SSH_KEY = credentials('ssh-key-credentials')
        DOCKER_IMAGE = "farisgebril/todo-app-backend"
        DEPLOY_HOST = "44.212.9.210"
        DEPLOY_PORT = "8081"
        CONTAINER_NAME = "todo-backend"
    }

    stages {
        stage('Confirm Jenkinsfile Execution') {
            steps {
                echo '✅ Jenkinsfile is being read and pipeline is executing.'
            }
        }

        stage('Clone Repo') {
            steps {
                echo '✅ Cloning repository (already handled via Pipeline script from SCM)'
            }
        }

        stage('Docker Login') {
            steps {
                echo '🔐 Logging in to DockerHub...'
                sh "echo \$DOCKERHUB_CREDENTIALS_PSW | docker login -u \$DOCKERHUB_CREDENTIALS_USR --password-stdin"
            }
        }

        stage('Build & Push Image') {
            steps {
                echo '🔨 Building and pushing Docker image...'
                sh "docker build -t ${DOCKER_IMAGE}:latest ."
                sh "docker push ${DOCKER_IMAGE}:latest"
            }
        }

        stage('Deploy on Remote EC2') {
            steps {
                echo '🚀 Deploying on EC2...'
                sshagent(['ssh-key-credentials']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ubuntu@${DEPLOY_HOST} << 'ENDSSH'
                        docker pull ${DOCKER_IMAGE}:latest || true
                        docker stop ${CONTAINER_NAME} || true
                        docker rm ${CONTAINER_NAME} || true
                        docker run -d --restart unless-stopped --name ${CONTAINER_NAME} -p ${DEPLOY_PORT}:8081 ${DOCKER_IMAGE}:latest
                    ENDSSH
                    """
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                echo '🔍 Verifying deployment...'
                sleep(time: 5, unit: 'SECONDS')
                sh "curl -sSf http://${DEPLOY_HOST}:${DEPLOY_PORT} || exit 1"
            }
        }
    }

    post {
        success {
            echo '✅ Deployment succeeded!'
        }
        failure {
            echo '❌ Deployment failed.'
        }
    }
}
