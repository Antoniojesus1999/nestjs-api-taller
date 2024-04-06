pipeline {
    agent any
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
                //sh 'npm run build:clean && nest build --path tsconfig.prod.json'
                sh 'rimraf dist; exit 0 nest build --path tsconfig.prod.json'
                }
        }

        stage('Build Docker') {
            steps {
                sh 'docker build -t api-taller-dev .'
            }
        }
        stage('Up nestjs-api-taller') {
            steps {
                sh 'docker-compose up'
            }
        }

    }
}
