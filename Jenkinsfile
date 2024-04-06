pipeline {
    agent any
    stages {

        stage('Down Mongo db') {
            steps {
               sh 'docker-compose /home/antonio/Escritorio/docker/docker-compose.yml down -d'
            }
        }

        stage('Up mongo db') {
           steps {
             sh 'docker-compose /home/antonio/Escritorio/docker/docker-compose.yml up -d'
            }
        }

        stage('Clean and build api-taller') {
            steps {
                sh 'npm run build'
                }
        }

        stage('Build Docker') {
            steps {
                sh 'docker build -t api-taller-dev .'
        }
        stage('Up nestjs-api-taller') {
            steps {
                sh 'docker-compose up'
            }
        }

    }
}
