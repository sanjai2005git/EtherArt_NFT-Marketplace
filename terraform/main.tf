terraform {
  required_version = ">= 1.0.0"
}
provider "aws" {
  region = "us-east-1"
}
resource "aws_ecs_cluster" "main" {
  name = "etherart-cluster"
}
