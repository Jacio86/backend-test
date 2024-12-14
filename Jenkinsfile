jenkinfile.
pipeline {
    agent any
    stages {
        stage("build") {
            agent {
                docker {
                    label 'contenedores'
                    image 'node:22-alpine'
                    reuseNode true
                }
            }
            stages {
                stage("build - Instala Dependencias") {
                    steps {
                        sh 'npm install'
                    }
                }
                stage("build - Ejecuta Test") {
                    steps {
                        sh 'npm run test'
                    }
                }
                stage("build - build del Proyecto") {
                    steps {
                        sh 'npm run build'
                    }
                }
            }
        }
        stage("Quality assurance") {
            agent {
                docker {
                    label 'contenedores'
                    image 'sonarsource/sonar-scanner-cli'
                    args '--network=devops-infra_default'
                    reuseNode true
                }
            }
            stages {
                stage("Quality assurance - sonarqube") {
                    steps {
                        withSonarQubeEnv('sonarqube') {
                            sh 'sonar-scanner'
                        }
                    }
                }
                stage("Quality assurance - quality gate") {
                    steps {
                        script {
                            timeout(time: 1, unit: 'MINUTES') {
                                def qg = waitForQualityGate()
                                if (qg.status != 'OK') {
                                    error "Pipeline aborted due to quality gate failure: ${qg.status}"
                                }
                            }
                        }
                    }
                }
            }
        }
        stage("delivery - subida a nexus") {
            steps {
                script {
                    docker.withRegistry("http://localhost:8082", "registry") {
                        sh 'docker build -t backend-test .'
                        sh 'docker tag backend-test:latest localhost:8082/backend-test:latest'
                        sh 'docker push localhost:8082/backend-test:latest'
                    }
                }
            }
 }
}
}