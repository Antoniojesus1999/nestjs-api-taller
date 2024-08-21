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
                 try {
                    def stopResult = sh(script: 'docker stop api-taller-pro', returnStatus: true)
                    if (stopResult != 0) {
                        echo "Error al detener el contenedor: ${stopResult}"
                    }
                    def rmResult = sh(script: 'docker rm api-taller-pro', returnStatus: true)
                    if (rmResult != 0) {
                        echo "Error al eliminar el contenedor: ${rmResult}"
                    }
                } catch (Exception e) {
                    echo "Error general al detener y eliminar el contenedor: ${e.message}"
                }
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



