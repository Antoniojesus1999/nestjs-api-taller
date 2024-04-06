pipeline {
    agent any
    tools {nodejs 'node'}

    stages {

        stage('Down Mongo db') {
            steps {
               sh 'docker-compose -f /home/antonio/Escritorio/docker/docker-compose.yml down'

            }
        }

        stage('Up mongo db') {
           steps {
             sh 'docker-compose -f /home/antonio/Escritorio/docker/docker-compose.yml up -d'
            }
        }

        stage('Clean and build api-taller') {
            steps {
                sh 'npm run build'
                }
        }

        stage('Build Docker') {
            steps {
                sh 'docker build -t api-taller-pro .'
            }
        }

        stage('Up nestjs-api-taller') {
            steps {
                sh 'docker-compose up'
            }
        }

    }
}
