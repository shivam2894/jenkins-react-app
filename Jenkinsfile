pipeline {
     agent any
     stages {
        stage("Build project and save tar file") {
            steps {
				sh "docker build -t frontend1 ."
				sh "docker image save -o react-app.tar frontend1"
            }
        }
        stage("Send tar file to React-frontend server") {
            steps {
				sh "scp -i /key/gulshan.pem react-app.tar ubuntu@3.87.75.52:/home/ubuntu/"
                sh "ssh -i /key/gulshan.pem ubuntu@3.87.75.52 -yes  sudo docker load < react-app.tar"              
            }
        }
		stage("Stop and Remove the current docker image") {
            steps {
                sh "ssh -i /key/gulshan.pem ubuntu@3.87.75.52 -yes  sudo docker stop frontend"
				sh "ssh -i /key/gulshan.pem ubuntu@3.87.75.52 -yes  sudo docker rm frontend"			
            }
        }
		stage("Run the new image") {
            steps {
				sh "ssh -i /key/gulshan.pem ubuntu@3.87.75.52 -yes  sudo docker run --name frontend -p 3000:80 -d frontend1"				
            }
        }
    }
}