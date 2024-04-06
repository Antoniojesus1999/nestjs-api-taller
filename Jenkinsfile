pipeline {
    agent any
    stages {
        stage('Up Mongo db') {
            steps {
              sh 'pwd'
              sh 'who'
              sh 'id'
              sh 'groups'

              sh 'docker-compose  /home/antonio/Escritorio/docker/docker-compose.yml up -d'

              sh 'pwd'
              sh 'docker-compose up'
              sh 'cd /var/lib/jenkins/workspace/nestjs-api-taller'
              sh 'pwd'

            }
        }

        stage('Up nestjs-api-taller') {
            steps {
                sh 'docker-compose up'
            }
        }

    }
}
