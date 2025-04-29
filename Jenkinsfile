pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        SSH_KEY = credentials('ssh-key-credentials')
        DOCKER_IMAGE = "farisgebril/todo-app-backend"
        PORT = "8081"
    }

    stages {
        stage('Clone GitHub Repo') {
            steps {
                git branch: 'main', url: 'git@github.com:farisgebril/todo-app.git', credentialsId: 'ssh-key-credentials'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_IMAGE}:latest ."
                }
            }
        }

        stage('Push Docker Image to DockerHub') {
            steps {
                script {
                    sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
                    sh "docker push ${DOCKER_IMAGE}:latest"
                }
            }
        }

        stage('Stop old container') {
            steps {
                script {
                    sh """
                    docker ps -q --filter "publish=${PORT}" | xargs -r docker stop
                    docker ps -a -q --filter "publish=${PORT}" | xargs -r docker rm
                    """
                }
            }
        }

        stage('Run new container') {
            steps {
                script {
                    sh "docker run -d -p ${PORT}:3000 ${DOCKER_IMAGE}:latest"
                }
            }
        }

        stage('Rollback if needed') {
            steps {
                input message: 'Deploy looks good? Click YES to continue, or ABORT to rollback.', ok: 'YES, continue'
            }
        }
    }

    post {
        aborted {
            echo "Deployment aborted. Rolling back!"
            // Here you can add more rollback logic, like redeploy previous version
        }
    }
}
