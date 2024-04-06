pipeline {
    agent any
    stages {
        stage('Up Mongo db') {
            steps {
              step{
               sh 'docker-compose /home/antonio/Escritorio/docker/docker-compose.yml down -d'
              }
              step{
               sh 'docker-compose /home/antonio/Escritorio/docker/docker-compose.yml up -d'
              }

              step {
               sh 'echo prueba de otro step'
              }
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
