pipeline {
    agent any

    environment {
        IMAGE_NAME = "brfood_user_live:latest"
        CONTAINER_NAME = "brfood_user_live"
        HOST_PORT = "8083"
        CONTAINER_PORT = "80"
    }

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    echo "Building Docker Image..."
                    docker build -t ${IMAGE_NAME} .
                '''
            }
        }

        stage('Stop Existing Container') {
            steps {
                sh '''
                    echo "Stopping Existing Container..."
                    docker rm -f ${CONTAINER_NAME} || true
                '''
            }
        }

        stage('Run Docker Container') {
            steps {
                sh '''
                    echo "Starting New Container..."
                    docker run -d \
                        --restart unless-stopped \
                        --name ${CONTAINER_NAME} \
                        -p ${HOST_PORT}:${CONTAINER_PORT} \
                        ${IMAGE_NAME}
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                    sleep 10
                    docker ps | grep ${CONTAINER_NAME}
                    curl -I http://localhost:${HOST_PORT}
                '''
            }
        }

        stage('Cleanup') {
            steps {
                sh '''
                    docker image prune -f
                '''
            }
        }
    }

    post {
        success {
            echo '======================================'
            echo 'BR Food User Frontend Deployed Successfully'
            echo '======================================'
        }

        failure {
            echo '======================================'
            echo 'Deployment Failed'
            echo '======================================'
        }
    }
}
