pipeline {
    agent any
    stages {
        stage('Clone the repo') {
            steps {
                sh 'echo clone the repo'
                sh 'ls /var/lib/jenkins/workspace'
            }
        }
        stage('push repo to remote host') {
            steps {
                sh 'echo connect to remote host and pull down the latest version'
                sh 'docker ps'
                sh 'ls /var/lib/jenkins/workspace/nestjs-api-taller'
            }
        }
        stage('Check website is up') {
            steps {
                sh 'echo Check website is up'
            }
        }

    }
}
