# Portfolio - Mathys Peypoux (Frontend)

Interface React moderne pour mon portfolio personnel de développeur Full Stack.

![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)

## Objectif du projet

Application React moderne servant de vitrine pour présenter mes compétences en développement web Full Stack.

**Fonctionnalités clés :**
- Découvrir mes projets avec filtrage intelligent
- Consulter les détails techniques de chaque réalisation
- Me contacter via un formulaire sécurisé
- Découvrir mon parcours et mes compétences

**Architecture :** SPA (Single Page Application) communiquant avec une API REST Laravel.

## Aperçu

![Screenshot](./public/assets/screenshotHome.png)

**Démo en ligne :** https://mon-url-deployee.netlify.app

## Fonctionnalités

- Liste des projets avec filtrage par type et technologie
- Page détail projet avec galerie d'images
- Formulaire de contact fonctionnel
- Page À propos avec parcours et formations
- Design responsive (mobile-first)
- Animations au scroll
- SEO optimisé avec meta tags dynamiques
- Gestion d'erreurs avec retry
- Skeleton loaders pendant le chargement

## Technologies

### Frontend
- React 18
- React Router 6
- TailwindCSS 3
- Axios

### Outils
- Vite 5
- ESLint

### Autres
- Custom hooks (useInView, useDocumentTitle)
- API Resources intégration

## Architecture applicative

Cette application suit une architecture moderne basée sur les **React Hooks** et une séparation claire des responsabilités.

### Flux de données
```
User Interaction
    ↓
Components (UI)
    ↓
Custom Hooks (Logic)
    ↓
Services (API)
    ↓
Backend API
```

### Responsabilités

**Components :**
- Gestion de l'affichage et des interactions utilisateur
- Logique UI (states, refs)
- Composition de l'interface

**Custom Hooks :**
- `useInView` : Détection de visibilité pour animations au scroll
- `useDocumentTitle` : Gestion dynamique du titre de page (SEO)

**Services :**
- Abstraction des appels API
- Gestion centralisée des requêtes HTTP
- Intercepteurs Axios pour authentification et erreurs

**Router :**
- Navigation SPA avec React Router
- Routes protégées (si authentification)
- Gestion du scroll automatique

### Gestion d'état

Pas de Redux/Context API pour garder la simplicité :
- **useState** pour les états locaux
- **Props drilling** minimal grâce à une architecture plate
- **Services** pour état partagé (cache API)

## Installation

### Prérequis

- Node.js >= 18.0.0
- npm >= 9.0.0

### Etapes

1. Cloner le repository
```bash
git clone url https://github.com/MPeypouxDev/portfolio-frontend.git
```

2. Installer les dépendances
```bash
npm install
```

3. Configurer les variables d'environnement
```bash
cp .env.example .env
```

Editer `.env` et renseigner les valeurs.

4. Lancer le serveur
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## Variables d'environnement

Créer un fichier `.env` à la racine : 
```env
VITE_API_URL=http://localhost:8000
```

| Variable | Description | Exemple |
|----------|-------------|---------|
| VITE_API_URL | URL de l'API backend | http://localhost:8000 |

**Note :** Les variables Vite doivent commencer par `VITE_`

## Scripts disponibles
```bash
npm run dev # Lancer en dev
npm run build # Build en prod
npm run preview # Prévisualiser prod
npm run lint # Linter le code
```

## Déploiement

### Vercel (recommandé)

1. Connecter le repo GitHub à Vercel
2. Configurer les variables d'environnement :
    - `VITE_API_URL` = URL de l'API en production
3. Déployer

### Netlify

1. Build command : `npm run build`
2. Publish directory : `dist`
3. Variables d'environnement : `VITE_API_URL`

## Structure du projet
```
src/
|-- components/
|    |-- Background.jsx
|    |-- EmptyLayout.jsx
|    |-- ErrorMessage.jsx
|   |-- Footer.jsx
|    |-- Layout.jsx
|    |-- Navbar.jsx
|    |-- ProjectCardSkeleton.jsx
|    |-- ProjectFilters.jsx
|    |-- ScrollToTop.jsx
|    |-- SEO.jsx
|    |-- TechIcon.jsx
|    |-- TechnologiesSection.jsx
|-- hooks/
|   |-- useInView.js
|   |-- useDocumentTitle.js
|-- pages/
|   |-- About.jsx
|   |-- Contact.jsx
|   |-- Home.jsx
|   |-- NotFound.jsx
|   |-- ProjectDetail.jsx
|   |-- Projects.jsx
|-- router/
|   |-- router.jsx
|-- services/
|   |-- apiClient.js
|   |-- authService.js
|   |-- contactService.js
|   |-- projectService.js
|   |-- technologyService.js
|-- config.js
```

## Gestion des erreurs

L'application implémente une gestion d'erreurs robuste à plusieurs niveaux :

### Composant ErrorMessage

Composant réutilisable affichant les erreurs de façon cohérente :
- Message clair pour l'utilisateur
- Bouton "Réessayer" si l'action est rejouable
- Design intégré au thème

### Intercepteurs Axios
```javascript
// Gestion automatique des erreurs API
axios.interceptors.response.use(
  response => response,
  error => {
    // Erreurs réseau
    if (!error.response) {
      return Promise.reject('Erreur de connexion')
    }
    // Erreurs serveur
    return Promise.reject(error.response.data)
  }
)
```

### Skeleton Loaders

Pendant le chargement, des placeholders animés améliorent l'UX en montrant la structure future du contenu.

## Troubleshooting

### Erreur CORS

**Symptôme :** `Access to fetch at '...' has been blocked by CORS policy`

**Solution :** Vérifier que `FRONTEND_URL` est configuré dans le backend `.env`

### Images ne s'affichent pas

**Symptôme :** Images des projets en 404

**Solutions :**
1. Vérifier que `php artisan storage:link` a été exécuté sur le backend
2. Vérifier que `VITE_API_URL` pointe vers la bonne URL

### Page blanche après build

**Symptôme :** `npm run build` fonctionne mais la page est blanche

**Solution :** Vérifier les variables d'environnement en production

### Filtres ne fonctionnent pas

**Symptôme :** Le filtrage par technologie ne fonctionne pas

**Solution :** Vérifier que le backend retourne bien les relations `technologies`

## Backend

Ce projet nécessite le backend Laravel :
[portfolio-backend](https://github.com/MPeypouxDev/portfolio-backend)

## Choix techniques

### React (sans frameworks)

**Pourquoi React vanilla ?**
- Maîtrise des fondamentaux avant d'utiliser des frameworks
- Contrôle total sur l'architecture
- Légèreté du bundle final
- Apprentissage approfondi des hooks

### TailwindCSS

**Avantages :**
- Développement rapide avec classes utilitaires
- Cohérence du design system
- Purge automatique du CSS inutilisé
- Responsive design facilité

### Vite

**Performances :**
- Hot Module Replacement ultra-rapide
- Build optimisé avec Rollup
- Support natif de TypeScript (si extension)

### Custom Hooks

**Réutilisabilité :**
- `useInView` : Animation au scroll sans librairie externe
- `useDocumentTitle` : SEO dynamique propre
- Code DRY et testable

## Améliorations futures

- [ ] Ajout de tests unitaires (Vitest + React Testing Library)
- [ ] Internationalisation (i18n) français/anglais
- [ ] Mode sombre/clair
- [ ] PWA (Progressive Web App)
- [ ] Lazy loading des pages avec React.lazy()
- [ ] Optimisation images (WebP, responsive images)
- [ ] Analytics (Google Analytics ou Plausible)

## Auteur

Mathys Peypoux

- GitHub: [@MPeypouxDev](https://github.com/MPeypouxDev)
- Portfolio: https://mon-url-deployee.com