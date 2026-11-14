
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
                withCredentials([
                    file(
                        credentialsId: 'front-end-env',
                        variable: 'ENV_FILE'
                    )
                ]) {
                    sh '''
                        set -eu

                        cp "$ENV_FILE" .env.production

                        trap 'rm -f .env.production' EXIT

                        docker build \
                            -t pos-system-frontend:${BUILD_NUMBER} .
                    '''
                }
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
                        set -e

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
                        ssh -o StrictHostKeyChecking=accept-new \
                            ubuntu@172.31.36.57 "
                                set -e

                                echo 'Pulling latest frontend image...'

                                sudo docker pull \
                                    menakalakshan23/pos-system-frontend:${BUILD_NUMBER}

                                echo 'Removing old frontend containers...'

                                sudo docker rm -f \
                                    pos-system-frontend \
                                    pos-system-frontend-container \
                                    2>/dev/null || true

                                echo 'Starting new frontend container...'

                                sudo docker run -d \
                                    --name pos-system-frontend \
                                    --restart unless-stopped \
                                    -p 80:80 \
                                    menakalakshan23/pos-system-frontend:${BUILD_NUMBER}

                                echo 'Frontend deployment completed'
                            "
                    '''
                }
            }
        }
    }
}
