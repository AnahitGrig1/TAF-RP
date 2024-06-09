pipeline {
    agent any
 tools {
        allure 'ALLURE_HOME'
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh 'npm install -g node@18.0.0'
               sh 'npm install dotenv'
               sh 'npm install --save-dev allure-commandline'
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
             stage('Allure-Report') {
                    steps {
                        script {
                            allure([
                                includeProperties: false,
                                jdk: '',
                                properties: [],
                                reportBuildPolicy: 'ALWAYS',
                                results: [[path: 'allure-results']]
                            ])
                        }
                    }
                }

                   stage('Code Analysis') {
                            environment {
                                scannerHome = tool 'SonarScanner'
                            }
                            steps {
                                script {
                                    withSonarQubeEnv('SonarScanner') {
                                        sh "${scannerHome}/bin/sonar-scanner \
                                            -Dsonar.projectKey=RP \
                                            -Dsonar.projectName=RP \
                                             -Dsonar.projectVersion=1.0 \
                                             -Dsonar.sources=./src/main"
                                    }
                                }
                            }
                        }
    }
}
