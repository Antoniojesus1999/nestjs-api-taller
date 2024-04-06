pipeline {
    agent any
    stages {
        stage('Up Mongo db') {
            steps {
              sh 'pwd'
              sh 'who'
              sh 'id'
              sh 'groups'
              sh '/home/antonio/Escritorio/docker docker-compose up -d'
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
