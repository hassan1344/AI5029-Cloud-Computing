# AI5029-Cloud-Computing


The purpose of this project is to deploy the infrastruture on AWS using Infrastructure as Code (IaC) and fulfill the NIST requirements.

Technologies used : 

- Terraform
- Docker
- React.js (For frontend)
- Node.js (For backend)
- AWS DynamoDB Database

Pre-requisites: 

- You must have docker on your system
- Make a .env file by studying the .env.example file and replace all the variables with actual values from your AWS account
- After that,  build the docker image of both backend and frontend directories.
- After the images have been built, you need to push them to a Docker registry, I have used DockerHub here.
- Assign tags to your images in the format : `dockerhubusername/<image-name>`
- then push them to docker hub.

- similarly u need to change these names in the user_data in main.tf file so that terraform can pull those images directly from DockerHub.


To run the project : 

- Clone the repository
- run the 'terraform init' command to setup and install all the required dependencies
- run the 'terraform apply' command to provision your infrastructure.
- Autoscaling is based on CPU utilization on a 75% threshold (scale-out) and 25% (scale-in).
- Frontend will be running on port 3000 and backend on 8000 (by default - These can be changed)
- Autoscaling can be triggered by making multiple API requests which can increase the CPU utilization to trigger the scale-out metric. Similarly, if the server is idle, the utilization drops and if upto 25%, the scale-in metric is triggered and extra machines are terminated.
