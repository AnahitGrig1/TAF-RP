pipeline {
    agent any
     tools {
            nodejs 'NodeJS'
        }

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
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
                 sh 'npm run test'
            }
        }
    }
}
