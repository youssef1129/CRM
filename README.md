# 🐾 VetCRM

VetCRM est une application de gestion pour cliniques vétérinaires permettant de suivre les clients et leurs animaux.

## 🚀 Lancement Rapide (Docker)

Le moyen le plus simple de démarrer :

1. **Préparation :**
   ```bash
   cp .env.example .env
   ```
2. **Démarrage :**
   ```bash
   docker-compose up --build
   ```

### 🔗 Liens Utiles
- **Application (Frontend) :** [http://localhost:3000](http://localhost:3000)
- **API (Backend) :** [http://localhost:8098](http://localhost:8098)
- **Documentation API (Swagger) :** [http://localhost:8098/api](http://localhost:8098/api)

---

## 🛠️ Développement Local

Si vous ne souhaitez pas utiliser Docker :

### Backend (NestJS)
```bash
cd backend
npm install
npm run start:dev
```

### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```

---

## 📂 Structure du Projet
- `/backend` : API NestJS + PostgreSQL.
- `/frontend` : Interface Next.js + Tailwind CSS.
- `docker-compose.yaml` : Orchestration de la stack complète.

---

## 📜 Documentations détaillées
- [Fiche Technique Frontend](./frontend/README.md)
- [Fiche Technique Backend](./backend/README.md)
