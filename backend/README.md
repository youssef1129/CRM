# ⚙️ VetCRM - Backend

API REST construite avec **NestJS** et **PostgreSQL**.

## 🚀 Installation
```bash
cd backend
npm install
npm run start:dev
```

## ⚙️ Configuration (.env)
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=crm_admin
DB_PASS=crm_secure_password_123
DB_NAME=crm_database
```

## 🛠 Points Clés
- **TypeORM :** Gestion de la base de données.
- **Swagger :** Documentation auto-générée sur `/api`.
- **Validation :** Contrôle strict des données via DTOs.
- **Seeding :** Données de test générées automatiquement au premier lancement via Docker.

## 📡 API v1
- `/api/v1/clients` : Gestion des propriétaires.
- `/api/v1/animals` : Gestion des patients.
- `/api/v1/common` : Données de référence (espèces, civilités).
