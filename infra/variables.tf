variable "docker_host" {
  description = "Docker daemon socket"
  type        = string
  default     = "unix:///var/run/docker.sock"
}

variable "image_tag" {
  type    = string
  default = "latest"
}

variable "registry" {
  type    = string
  default = "ghcr.io/youssef1129"
}

variable "db_user" {
  type    = string
  default = "postgres"
}

variable "db_password" {
  type      = string
  sensitive = true
  # No default — must be passed via -var or TF_VAR_db_password
}

variable "db_name" {
  type    = string
  default = "vetcrm_staging"
}

variable "env" {
  description = "Environment label applied to container names"
  type        = string
  default     = "staging"
}