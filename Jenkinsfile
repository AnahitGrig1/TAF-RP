pipeline {
    agent any


    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh 'npm install -g node@18.0.0'
               sh 'npm install dotenv'
                sh 'npm install eslint --save-dev'
                       sh 'npm install @playwright/test'
                       sh 'npx playwright install --with-deps'


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
                 withCredentials([usernamePassword(credentialsId: 'rpCreds', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                 sh 'npm run test:generateReport'
                 }
            }
        }
             stage('Allure Report') {
                    steps {
                        script {
                            allure([
                                includeProperties: false,
                                jdk: '',
                                properties: [],
                                reportBuildPolicy: 'ALWAYS',
                                results: [[path: 'allure-report']]
                            ])
                        }
                    }
                }
    }
}
