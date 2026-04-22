# CRM Vétérinaire - Backend (NestJS)

Ce projet est la partie Backend d'un outil de gestion de clientèle (CRM) pour un cabinet vétérinaire.

## 🛠️ Architecture Technique

J'ai mis en place une structure robuste et modulaire en utilisant **NestJS** et **PostgreSQL**. Voici les choix techniques majeurs :

### 1. Modèle de Données & Relations
*   **Relation 1:N** : J'ai structuré la base pour qu'un client (maître) puisse posséder plusieurs animaux, tandis qu'un animal est rattaché à un seul client.
*   **Types Précis** : Le poids et la taille des animaux utilisent le type `decimal(5,2)` pour garantir une précision médicale.
*   **Suppression en cascade** : La suppression d'un client entraîne automatiquement celle de ses animaux pour maintenir l'intégrité des données.

### 2. Fonctionnalités Avancées
*   **Filtrage & Pagination** : J'ai implémenté un système de pagination (Limit/Offset) et de recherche par mot-clé sur tous les endpoints de listes.
*   **Validation & Sécurité** : Utilisation de `class-validator` pour les DTOs et d'un **Filtre d'Exception Global** pour uniformiser les messages d'erreurs et logguer les incidents.
*   **Standardisation** : Un **Interceptor Global** enveloppe toutes les réponses réussies dans un format standardisé `{ data: ..., meta: ... }`.

### 3. Documentation & Docker
*   **Swagger** : Disponible sur `/api`. J'ai configuré les listes déroulantes pour les Enums (Espèces, Civilités) afin de faciliter les tests.
*   **Docker & Seeding** : Le backend attend que la base de données soit prête (Healthcheck) avant de lancer automatiquement un script de **Seeding** (Faker) qui génère 15 clients et ~30 animaux réalistes.

---

## 📡 Liste des Endpoints (API v1)

### 👥 Clients
*   `GET /api/v1/clients` : Liste paginée avec recherche par nom, prénom ou email.
*   `GET /api/v1/clients/:id` : Détails d'un client avec la liste complète de ses animaux.
*   `POST /api/v1/clients` : Création d'un nouveau client.
*   `PATCH /api/v1/clients/:id` : Modification d'un client.
*   `DELETE /api/v1/clients/:id` : Suppression d'un client (et de ses animaux).

### 🐾 Animaux
*   `GET /api/v1/animals` : Liste paginée avec recherche par nom et **filtrage par espèce** (via enum).
*   `GET /api/v1/animals/:id` : Détails d'un animal avec les informations de son maître.
*   `POST /api/v1/animals` : Enregistrement d'un nouvel animal.
*   `PATCH /api/v1/animals/:id` : Mise à jour des données d'un animal.
*   `DELETE /api/v1/animals/:id` : Suppression d'un animal.

### ⚙️ Utilitaires (Common)
*   `GET /api/v1/common/civilities` : Liste des civilités autorisées (M., Mme, Mlle).
*   `GET /api/v1/common/species` : Liste des espèces gérées (chien, chat, hamster, tortue).

---

## 🚀 Installation rapide

```bash
# Lancer l'infrastructure complète (DB + Backend + Seed)
docker compose up --build

# Documentation interactive
# http://localhost:8098/api
```
