pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                       sh '''
                              npm i -D @playwright/test
                              npx playwright install
                            '''

            }
        }
        stage('Lint') {
            steps {
                echo 'Lint..'
                 sh 'npm run lint'

            }
        }
        stage('Auto Test') {
            steps {
                echo 'Auto tests....'
                 sh 'npm run test'
            }
        }
    }
}
