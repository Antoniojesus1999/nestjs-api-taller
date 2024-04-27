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

         stage('Down nestjs-api-taller') {
              steps {
                  sh 'docker-compose -f /var/lib/jenkins/workspace/api-taller-multibranch_develop/docker-compose.yml down'
                  sh 'docker-compose -f /var/lib/jenkins/workspace/api-taller-multibranch_main/docker-compose.yml down'
                    }
                }

         stage('delete node_modules') {
             steps {
                  script {
                        sh 'rm -rf node_modules'
                      }
                  }
          }
         stage('npm install') {
            steps {
                  sh 'npm install'
            }
         }

         stage('npm run build') {
            steps {

                sh 'npm run build'
                }
         }

        stage('Up nestjs-api-taller') {
            steps {
                sh 'docker-compose up -d --force-recreate'
            }
        }

    }
}
