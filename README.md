# 🐾 VetCRM

VetCRM est une application de gestion pour cliniques vétérinaires permettant de suivre les clients, les animaux et les informations associées à l’activité d’une clinique.

Le projet est composé d’un backend NestJS, d’un frontend Next.js et d’une base de données PostgreSQL. Il intègre également une chaîne DevOps complète avec Docker, Jenkins, SonarQube, Trivy, GitHub Container Registry, Terraform, Prometheus et Grafana.

---

## 👥 Équipe

- Youssef MAAZOUZ
- Mohamad Assaf
- Ayoub Chetouni

---

## 🚀 Lancement rapide avec Docker

Le moyen le plus simple de démarrer l’application est d’utiliser Docker Compose.

### 1. Préparer l’environnement

```bash
cp .env.example .env
```

### 2. Démarrer la stack complète

```bash
docker compose up -d --build
```

### 3. Vérifier les services

```bash
docker compose ps
```

### 🔗 Liens utiles

| Service | URL |
| --- | --- |
| Frontend | <http://localhost:3000> |
| Backend API | <http://localhost:8098> |
| Health Check | <http://localhost:8098/health> |
| Swagger API Docs | <http://localhost:8098/api> |
| Jenkins | <http://localhost:8088> |
| SonarQube | <http://localhost:9000> |
| Prometheus | <http://localhost:9090> |
| Grafana | <http://localhost:3001> |

## 🛠️ Développement local

Si vous ne souhaitez pas utiliser Docker, vous pouvez lancer le backend et le frontend séparément.

### Backend — NestJS

```bash
cd backend
npm install
npm run start:dev
```

Backend disponible sur <http://localhost:8098>.

### Frontend — Next.js

```bash
cd frontend
npm install
npm run dev
```

Frontend disponible sur <http://localhost:3000>.

## ✅ Tests

Les tests unitaires du backend peuvent être exécutés avec :

```bash
cd backend
npm run test
```

Pour lancer les tests avec couverture :

```bash
npm run test:cov
```

Le pipeline Jenkins exécute automatiquement les tests et génère une couverture mesurable.

## 🐳 Docker

Le projet contient deux Dockerfiles principaux :

- `backend/Dockerfile`
- `frontend/Dockerfile`

Les images Docker sont construites automatiquement par Jenkins puis publiées dans GitHub Container Registry sur la branche `main`.

Images publiées :

- `ghcr.io/youssef1129/crm-backend`
- `ghcr.io/youssef1129/crm-frontend`

## 🔁 Pipeline CI/CD Jenkins

Le pipeline Jenkins est défini dans le fichier `Jenkinsfile`.

Il automatise les étapes suivantes :

1. Checkout du code source
2. Lint backend et frontend
3. Validation Terraform
4. Build et tests unitaires
5. Analyse SonarQube
6. Quality Gate
7. Build des images Docker
8. Scan de sécurité Trivy
9. Push des images vers GHCR
10. Déploiement Terraform
11. Smoke test sur `/health`

Les étapes de publication et de déploiement sont exécutées uniquement sur la branche `main`.

## 🔍 Qualité du code avec SonarQube

SonarQube est utilisé pour analyser :

- la qualité du code ;
- la maintenabilité ;
- les bugs potentiels ;
- les vulnérabilités ;
- la couverture de tests.

Le pipeline attend le résultat du Quality Gate avant de continuer.

## 🔐 Sécurité avec Trivy

Trivy est utilisé dans Jenkins pour scanner les images Docker backend et frontend.

Le scan vérifie les vulnérabilités de niveau `HIGH` et `CRITICAL`.

Le rapport Trivy est affiché directement dans les logs Jenkins.

## 🌍 Déploiement avec Terraform

L’infrastructure de staging est définie dans le dossier `infra/`.

Fichiers principaux :

- `infra/main.tf`
- `infra/variables.tf`
- `infra/outputs.tf`

Terraform déploie les conteneurs de staging :

- `crm-staging-db`
- `crm-staging-backend`
- `crm-staging-frontend`

Outputs principaux :

```text
staging_backend_url  = http://localhost:8097
staging_frontend_url = http://localhost:3001
```

## 📊 Monitoring avec Prometheus et Grafana

Le monitoring est configuré dans le dossier `monitoring/`.

Fichiers principaux :

- `monitoring/prometheus.yml`
- `monitoring/docker-compose.yml`

### Démarrer le monitoring

```bash
cd monitoring
docker compose up -d
```

### Prometheus

Prometheus collecte les métriques exposées par le backend sur `/metrics`.

Interface Prometheus : <http://localhost:9090>

### Grafana

Grafana permet de visualiser les métriques collectées par Prometheus.

Interface Grafana : <http://localhost:3001>

Identifiants par défaut :

- **Username :** `admin`
- **Password :** `admin`

Le dashboard contient notamment :

- Backend CPU Usage
- Backend Memory Usage
- API Requests / second
- API Latency p99

## 📂 Structure du projet

```text
.
├── backend/              # API NestJS
├── frontend/             # Interface Next.js
├── infra/                # Fichiers Terraform
├── monitoring/           # Prometheus et Grafana
├── jenkins/              # Configuration Jenkins custom
├── docker-compose.yaml   # Orchestration locale
├── Jenkinsfile           # Pipeline CI/CD
└── README.md
```

## 🧪 Endpoints importants

| Endpoint | Description |
| --- | --- |
| `/health` | Vérifie que le backend est disponible |
| `/metrics` | Expose les métriques Prometheus |
| `/api` | Documentation Swagger |

## 🧯 Commandes utiles

### Arrêter les services

```bash
docker compose stop
```

### Redémarrer les services

```bash
docker compose up -d
```

### Voir les logs backend

```bash
docker compose logs -f backend
```

### Nettoyer les conteneurs de staging

```bash
docker rm -f crm-staging-backend crm-staging-frontend crm-staging-db
```

## 📜 Documentations détaillées

- [Fiche Technique Frontend](./frontend/README.md)
- [Fiche Technique Backend](./backend/README.md)
- Rapport final DevOps
