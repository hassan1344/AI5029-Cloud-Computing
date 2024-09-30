variable "aws_region" {
  default = "us-east-1"
}

variable "instance_type" {
  default = "t2.micro"
}

variable "ami_id" {
  description = "AMI ID for EC2 instances"
  default     = "ami-0ebfd941bbafe70c6"
}

variable "dockerhub_username" {
  description = "Docker Hub username"
  default     = "" //Write your docker hub username here
}

variable "dockerhub_password" {
  description = "Docker Hub password"  //generate a PAT token from docker hub and store it in terraform.tfvars or set it in stdin
  type        = string
  sensitive   = true
}
