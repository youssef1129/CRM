# 💻 VetCRM - Frontend

Interface utilisateur construite avec **Next.js 15**.

## 🚀 Installation
```bash
cd frontend
npm install
npm run dev
```

## ⚙️ Configuration (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8098
```

## 🛠 Stack Technique
- **Framework :** Next.js 15 (App Router)
- **UI :** Ant Design & Tailwind CSS 4
- **API :** Client auto-généré via Swagger

## 🐳 Docker
L'image est optimisée en mode **standalone**. En cas de problème de connexion à l'API dans Docker, vérifiez `INTERNAL_API_URL` dans le `docker-compose.yaml`.

## 📖 Pages Principales
- `/` : Tableau de bord & Liste des clients.
- `/animals` : Liste des animaux.
- `/[id]` : Détails d'un client.
- `/animals/[id]` : Détails d'un animal.
