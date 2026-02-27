# Portfolio Frontend

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?logo=framer&logoColor=white)

React SPA for a developer portfolio. Displays projects, skills and contact form on the public side, and provides a full admin dashboard for content management.

**Backend:** [portfolio-backend](https://github.com/MPeypouxDev/portfolio-backend)

## Tech stack

| Category | Technology |
|----------|-----------|
| Framework | React 19.2 |
| Routing | React Router 7 |
| Styling | TailwindCSS 3.4 |
| Animations | Framer Motion 12 |
| HTTP client | Axios 1.13 |
| Bundler | Vite 7.2 |
| Linting | ESLint 9 |

## Prerequisites

- Node.js 18+
- npm 9+

## Installation

```bash
npm install
cp .env.example .env
npm run dev
```

The app will be available at `http://localhost:5173`.

## Environment variables

```env
VITE_API_URL=http://localhost:8000
```

All Vite environment variables must be prefixed with `VITE_`.

## Architecture

```
src/
├── components/         # Reusable UI components
│   └── admin/          # Admin-specific layout
├── pages/              # Route-level components
│   └── admin/          # Admin pages (projects, technologies, contacts)
├── hooks/              # Custom React hooks
├── services/           # API layer (Axios abstraction)
├── router/             # React Router configuration
├── config.js           # Global config (API base URL)
└── styles/             # Global and print CSS
```

Data flow:
```
User interaction → Component → Custom Hook → Service → Backend API
```

## Public pages

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Home` | Hero section, animated counters, technology showcase |
| `/projects` | `Projects` | Project grid with category and technology filters |
| `/projects/:id` | `ProjectDetail` | Full project detail with image gallery and links |
| `/contact` | `Contact` | Contact form with validation |
| `/about` | `About` | About section with skills and background |
| `*` | `NotFound` | 404 page |

## Admin interface

Access via `/admin/login` with JWT credentials.

| Route | Component | Description |
|-------|-----------|-------------|
| `/admin/login` | `Login` | JWT authentication form |
| `/admin/dashboard` | `Dashboard` | Overview |
| `/admin/projects` | `ProjectList` | Projects table with actions |
| `/admin/projects/create` | `ProjectCreate` | Create project with image upload |
| `/admin/projects/:id/edit` | `ProjectEdit` | Edit project |
| `/admin/technologies` | `TechnologyList` | Technologies table |
| `/admin/technologies/create` | `TechnologyForm` | Add technology |
| `/admin/technologies/:id/edit` | `TechnologyForm` | Edit technology |
| `/admin/contacts` | `ContactList` | Incoming messages with read status |
| `/admin/contacts/:id` | `ContactDetail` | Full message view |

Admin routes are protected by `ProtectedRoute`, which redirects unauthenticated users to `/admin/login`.

## Custom hooks

| Hook | Description |
|------|-------------|
| `useAuth` | JWT auth state — login, logout, token persistence |
| `useInView` | Intersection Observer for scroll-triggered animations |
| `useCounter` | Animated number counter for homepage stats |
| `useCardTilt` | Mouse-tracking 3D tilt effect on project cards |
| `useDocumentTitle` | Dynamic `<title>` tag for SEO |

## Service layer

All API calls go through `services/apiClient.js`, an Axios instance with:
- Base URL from `VITE_API_URL`
- Automatic `Authorization: Bearer <token>` header injection
- Automatic token refresh on 401 responses
- Redirect to login on expired session

| Service | Responsibility |
|---------|---------------|
| `authService` | Login, logout, token refresh, current user |
| `projectService` | Fetch, create, update, delete projects |
| `technologyService` | Fetch, create, update, delete technologies |
| `imageService` | Create, update, delete image records |
| `contactService` | Submit contact form, fetch and manage messages |

## Key components

| Component | Description |
|-----------|-------------|
| `Layout` | Main layout — Navbar + Footer + Outlet |
| `AdminLayout` | Admin layout — sidebar navigation + Outlet |
| `Navbar` | Fixed header with mobile hamburger menu |
| `ProjectCard` | Project preview card with tilt effect |
| `ProjectCardSkeleton` | Animated placeholder during loading |
| `ProjectFilters` | Category and technology filter controls |
| `ProtectedRoute` | Auth guard — redirects if no valid token |
| `SEO` | Injects dynamic meta tags (title, description, og:*) |
| `ErrorMessage` | Error display with optional retry button |
| `ScrollToTop` | Auto-scrolls to top on route change |

## Available scripts

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

## Deployment

The project includes a `vercel.json` configured for SPA routing (all paths redirect to `index.html`).

**Vercel (recommended):**
1. Connect the GitHub repository to Vercel
2. Set environment variable: `VITE_API_URL` = production backend URL
3. Deploy — build command `npm run build`, output directory `dist`

**Other platforms (Netlify, etc.):**
- Build command: `npm run build`
- Publish directory: `dist`
- Add a redirect rule: `/* → /index.html` (required for SPA routing)

## Troubleshooting

**CORS error** — `Access to fetch at '...' has been blocked by CORS policy`
Check that `FRONTEND_URL` is set correctly in the backend `.env`.

**Images returning 404**
Ensure `php artisan storage:link` has been run on the backend and that `VITE_API_URL` points to the correct URL.

**Blank page after build**
Check that `VITE_API_URL` is defined in the production environment variables.
