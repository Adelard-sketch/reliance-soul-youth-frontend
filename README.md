# Reliance Soul Youth — Frontend

React + Vite single-page application for the Reliance Soul Youth Foundation website. This project provides the public UI: galleries, stories, donation and booking flows, and communicates with the backend API.

Tech stack
- React, Vite, TypeScript
- Tailwind CSS (where used)
- React Router

Quick start

Prerequisites: Node.js 20+, npm, a running backend API and a configured `.env` (see below).

Install and run in development:

```bash
cd frontend
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Environment
- Copy `FRONTEND_ENV_TEMPLATE.env` (if present) to `frontend/.env` and set any required `VITE_` variables or `FRONTEND_URL`.

Notes
- The frontend calls the backend API (expected at `http://localhost:5000` in local development). Configure `FRONTEND_URL` and backend `CORS` accordingly.
- For full project setup and backend environment variables, see the main project README at the repository root.

Contributing
- Open issues for bugs or feature requests.
- Send PRs that build cleanly and include brief testing notes.

Repository
- Backend API: https://github.com/Adelard-sketch/reliance-soul-youth-backend.git
