# CC5003-Fullstack

# La Mona – Interdepartmental Tournament Platform

A **fullstack application** (React + json-server) to centralize the information of the Faculty’s Interdepartmental Tournament **"La Mona"**.

The goal of this project is to provide clarity and transparency by publishing statistics, match schedules, results, medal standings, and general rankings in a single platform.

---

## Tech Stack

- Frontend

  - React + Vite
  - TypeScript
  - React Router
  - CSS Modules

- Backend (mock)
  - json-server

---

## Estructura del Repositorio

- /frontend → Aplicación SPA desarrollada con React
- /backend → Servidor mock con json-server, incluye db.json y rutas personalizadas
- README.md → Este archivo

---

## Instalación y Ejecución

### Frontend

1. Navega al directorio del frontend:

   cd frontend/MonaProject

2. Install dependencies:

npm install

3. Run development server:

npm run dev

4. Open the URL shown in the terminal (default: http://localhost:5173).

### Backend (mock)

1. Navigate to the backend folder:

cd backend

2. Run the mock server:

npx json-server --watch db.json --port 3001

3. Endpoints available:

http://localhost:3001/medallero

http://localhost:3001/puntajes

http://localhost:3001/disciplinas

http://localhost:3001/calendario
