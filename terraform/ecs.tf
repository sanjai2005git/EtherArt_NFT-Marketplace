resource "aws_ecs_cluster" "main" {
  name = "etherart-cluster"
}

resource "aws_ecs_service" "frontend" {
  name            = "etherart-frontend"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.frontend.arn
  desired_count   = 2
  launch_type     = "FARGATE"
}

resource "aws_ecs_task_definition" "frontend" {
  family                   = "etherart-frontend"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 256
  memory                   = 512
  container_definitions    = jsonencode([{
    name      = "frontend"
    image     = "etherart-frontend:latest"
    essential = true
    portMappings = [{ containerPort = 80 }]
  }])
}
