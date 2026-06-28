terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

provider "docker" {
  # Inside the Jenkins container, Docker is reached via the mounted socket
  host = var.docker_host
}

# Reference the existing shared network created by docker-compose
data "docker_network" "cicd" {
  name = "cicd-network"
}

# ─────────────────────────────────────────────
# Staging DB
# ─────────────────────────────────────────────
resource "docker_container" "staging_db" {
  name    = "crm-${var.env}-db"
  image   = "postgres:16-alpine"
  restart = "unless-stopped"

  networks_advanced {
    name = data.docker_network.cicd.name
  }

  env = [
    "POSTGRES_USER=${var.db_user}",
    "POSTGRES_PASSWORD=${var.db_password}",
    "POSTGRES_DB=${var.db_name}",
  ]

  healthcheck {
    test     = ["CMD-SHELL", "pg_isready -U ${var.db_user} -d ${var.db_name}"]
    interval = "10s"
    timeout  = "5s"
    retries  = 5
  }
}

# ─────────────────────────────────────────────
# Staging Backend
# ─────────────────────────────────────────────
resource "docker_image" "backend" {
  name         = "${var.registry}/crm-backend:${var.image_tag}"
  keep_locally = true

  triggers = {
    image_tag = var.image_tag
  }
}

resource "docker_container" "staging_backend" {
  name     = "crm-${var.env}-backend"
  image    = docker_image.backend.image_id
  restart  = "unless-stopped"
  wait     = false
  must_run = false

  networks_advanced {
    name = data.docker_network.cicd.name
  }

  ports {
    internal = 8098
    external = 8097
  }

  env = [
    "ENV=${var.env}",
    "DB_HOST=crm-${var.env}-db",
    "DB_PORT=5432",
    "DB_USER=${var.db_user}",
    "DB_PASS=${var.db_password}",
    "DB_NAME=${var.db_name}",
    "PORT=8098",
  ]

  depends_on = [docker_container.staging_db]

  healthcheck {
    test     = ["CMD-SHELL", "wget --no-verbose --tries=1 --spider http://localhost:8098/health || exit 1"]
    interval = "10s"
    timeout  = "5s"
    retries  = 5
  }
}

# ─────────────────────────────────────────────
# Staging Frontend
# ─────────────────────────────────────────────
resource "docker_image" "frontend" {
  name         = "${var.registry}/crm-frontend:${var.image_tag}"
  keep_locally = true

  triggers = {
    image_tag = var.image_tag
  }
}

resource "docker_container" "staging_frontend" {
  name     = "crm-${var.env}-frontend"
  image    = docker_image.frontend.image_id
  restart  = "unless-stopped"
  wait     = false
  must_run = false

  networks_advanced {
    name = data.docker_network.cicd.name
  }

  ports {
    internal = 3000
    external = 3001
  }

  env = [
    "NEXT_PUBLIC_API_URL=http://localhost:8097",
    "INTERNAL_API_URL=http://crm-${var.env}-backend:8098",
  ]

  depends_on = [docker_container.staging_backend]
}