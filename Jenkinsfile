pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                    sh 'node --version'
                                                sh 'npm --version'
                                                sh 'npm --globalconfig=.npmrc-ci ci'
                                                sh 'npx playwright --version'
                                                sh 'npx playwright install-deps chromium 1>&2'
                                                sh 'npx playwright install'
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
