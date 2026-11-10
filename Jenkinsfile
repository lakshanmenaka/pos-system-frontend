
pipeline {
    agent any

    stages {

        stage('Checkout Source Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/lakshanmenaka/pos-system-frontend.git'
            }
        }

        stage('SSH Login Test') {
            steps {
                sshagent(credentials: ['frontend-ssh-key']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=accept-new \
                            -o ConnectTimeout=10 \
                            ubuntu@172.31.36.57 \
                            "hostname && docker --version"
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build \
                        -t pos-system-frontend:${BUILD_NUMBER} .
                '''
            }
        }

        stage('Push Docker Image') {
    steps {
        withCredentials([
            usernamePassword(
                credentialsId: 'dockerhub-credentials',
                usernameVariable: 'DOCKERHUB_USER',
                passwordVariable: 'DOCKERHUB_PASS'
            )
        ]) {
            sh '''
                echo "$DOCKERHUB_PASS" | docker login \
                    -u "$DOCKERHUB_USER" \
                    --password-stdin

                docker tag \
                    pos-system-frontend:${BUILD_NUMBER} \
                    "$DOCKERHUB_USER/pos-system-frontend:${BUILD_NUMBER}"

                docker push \
                    "$DOCKERHUB_USER/pos-system-frontend:${BUILD_NUMBER}"

                docker logout
            '''
        }
    }
}


        stage('Deploy to Frontend EC2') {
    steps {
        sshagent(credentials: ['frontend-ssh-key']) {
            sh '''
                IMAGE="menakalakshan23/pos-system-frontend:${BUILD_NUMBER}"

                ssh -o StrictHostKeyChecking=accept-new \
                    -o ConnectTimeout=10 \
                    ubuntu@172.31.36.57 \
                    "docker pull ${IMAGE} &&
                     (docker rm -f pos-system-frontend-container || true) &&
                     docker run -d \
                        --name pos-system-frontend-container \
                        --restart unless-stopped \
                        -p 80:80 \
                        ${IMAGE}"
            '''
        }
    }
}

    }
}
