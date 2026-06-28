output "staging_backend_url" {
  description = "URL du backend staging"
  value       = "http://localhost:8097"
}

output "staging_frontend_url" {
  description = "URL du frontend staging"
  value       = "http://localhost:3001"
}

output "network_name" {
  description = "Nom du reseau Docker"
  value       = data.docker_network.cicd.name
}

output "backend_container_name" {
  description = "Nom du conteneur backend staging"
  value       = docker_container.staging_backend.name
}

output "frontend_container_name" {
  description = "Nom du conteneur frontend staging"
  value       = docker_container.staging_frontend.name
}