pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        SSH_KEY = credentials('ssh-key-credentials')
        DOCKER_IMAGE = "farisgebril/todo-app-backend"
        DEPLOY_HOST = "44.212.9.210"
        DEPLOY_PORT = "8081"
    }

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main', 
                url: 'git@github.com:farisgebril/todo-app.git', 
                credentialsId: 'ssh-key-credentials'
            }
        }

        stage('Build & Push') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:latest -f Dockerfile ."
                sh "echo \$DOCKERHUB_CREDENTIALS_PSW | docker login -u \$DOCKERHUB_CREDENTIALS_USR --password-stdin"
                sh "docker push ${DOCKER_IMAGE}:latest"
            }
        }

        stage('Deploy to Production') {
            steps {
                sshagent(['ssh-key-credentials']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ubuntu@${DEPLOY_HOST} \"
                    docker pull ${DOCKER_IMAGE}:latest || true
                    docker stop \$(docker ps -q --filter publish=${DEPLOY_PORT}) || true
                    docker rm \$(docker ps -aq --filter publish=${DEPLOY_PORT}) || true
                    docker run -d --restart unless-stopped -p ${DEPLOY_PORT}:8081 ${DOCKER_IMAGE}:latest
                    \"
                    """
                }
            }
        }

        stage('Verify') {
            steps {
                sleep(time: 5, unit: 'SECONDS')
                sh "curl -sSf http://${DEPLOY_HOST}:${DEPLOY_PORT} > /dev/null"
                slackSend channel: '#deployments', message: "SUCCESS: Deployed to ${DEPLOY_HOST}:${DEPLOY_PORT}"
            }
        }
    }

    post {
        failure {
            slackSend channel: '#alerts', message: "FAILED: Deployment ${env.BUILD_URL}"
        }
    }
}