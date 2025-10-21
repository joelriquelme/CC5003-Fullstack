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

- Backend
  - Express

---

## Estructura del Repositorio

- /frontend → Aplicación SPA desarrollada con React
- /backend → Servidor Express que sirve datos estáticos en formato JSON
- README.md → Este archivo

---

## Instalación y Ejecución

### Backend 

Crear un archivo .env en la carpeta backend con el siguiente contenido:

```
MONGODB_URI=mongodb://127.0.0.1:27017/app
TEST_MONGODB_URI=mongodb://127.0.0.1:27017/app_test
PORT=3001
MONGODB_DBNAME=app
```

1. Navigate to the backend folder:

cd backend

2. Compile

npm run build

3. Run the server

npm run dev

4. Endpoints available:

http://localhost:3001/medallero

http://localhost:3001/puntajes

http://localhost:3001/disciplinas

http://localhost:3001/calendario

### Frontend

1. Navega al directorio del frontend:

   cd frontend/MonaProject

2. Install dependencies:

npm install

3. Compile

npm run build

4. Run development server:

npm run dev

5. Open the URL shown in the terminal (default: http://localhost:5173).