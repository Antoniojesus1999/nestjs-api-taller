pipeline {
    agent any
    tools {nodejs 'node'}
  }
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

         stage('Down nestjs-api-taller') {
              steps {
                  sh 'docker compose down'
                    }
                }
         stage('npm install') {
            steps {
            script {
                sh 'npm install --prefix /workspace'
                }
            }
         }

         stage('npm run build') {
            steps {
                sh 'npm run build'
                }
         }

        stage('Up nestjs-api-taller') {
            steps {
                sh 'docker compose up'
            }
        }

    }
}



