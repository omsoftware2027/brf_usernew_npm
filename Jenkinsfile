pipeline {

    agent any

    environment {
        IMAGE_NAME = 'brfood_user_live'
        CONTAINER_NAME = 'brfood_user_live'
        HOST_PORT = '8083'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ${IMAGE_NAME}:latest .'
            }
        }

        stage('Stop Existing Container') {
            steps {
                sh '''
                docker rm -f ${CONTAINER_NAME} || true
                '''
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                docker run -d \
                  --restart unless-stopped \
                  --name ${CONTAINER_NAME} \
                  -p ${HOST_PORT}:80 \
                  ${IMAGE_NAME}:latest
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                sleep 10
                curl -I http://localhost:${HOST_PORT}
                '''
            }
        }

        stage('Cleanup') {
            steps {
                sh 'docker image prune -f'
            }
        }
    }

    post {

        success {
            echo '=========================================='
            echo 'BR Food User deployed successfully!'
            echo '=========================================='
        }

        failure {
            echo '=========================================='
            echo 'Deployment Failed!'
            echo '=========================================='
        }
    }
}
