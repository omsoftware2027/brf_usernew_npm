pipeline {
    agent any

    environment {
        NODE_OPTIONS = '--max_old_space_size=4096'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Node Version') {
            steps {
                sh 'node -v'
                sh 'npm -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Angular') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Verify Build') {
            steps {
                sh 'ls -lah dist'
                sh 'ls -lah dist/brfoodmain'
            }
        }
    }

    post {
        success {
            echo 'Angular Build Successful'
        }

        failure {
            echo 'Angular Build Failed'
        }
    }
}
