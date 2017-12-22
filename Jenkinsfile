pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building project.....'
                sh 'npm install'
                sh 'ng build --prod'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying....'
                echo 'Copy zip package to test server....'
                sh 'scp -r dist docker@192.168.1.7:~/be_webshop'
            }
        }
    }
}
