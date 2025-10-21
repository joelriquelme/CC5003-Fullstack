# CC5003-Fullstack

# La Mona – Plataforma del Torneo Interdepartamental

Una **aplicación fullstack** (React + json-server) para centralizar la información del Torneo Interdepartamental de la Facultad **"La Mona"**.

El objetivo de este proyecto es entregar claridad y transparencia publicando estadísticas, calendarios de partidos, resultados, tabla de medallas y ranking general en una sola plataforma.

---

## Stack Tecnológico

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
- /backend → Servidor Express que entrega datos estáticos en formato JSON
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

1. Navega a la carpeta backend:

cd backend

2. Compila el proyecto

npm run build

3. Ejecuta el servidor

npm run dev

4. Endpoints disponibles:

http://localhost:3001/medallero

http://localhost:3001/puntajes

http://localhost:3001/disciplinas

http://localhost:3001/calendario

http://localhost:3001/auth/me

http://localhost:3001/users

http://localhost:3001/login

http://localhost:3001/register

### Población de la Base de Datos

La base de datos no está poblada por defecto. Puedes agregar algunos datos de ejemplo utilizando Postman:

endpoint:
```
http://127.0.0.1:3001/api/medalTable
```

body:

```json
{
  "code": "ING",
  "name": "Ingeniería Civil",
  "gold": 7,
  "silver": 3,
  "bronze": 2,
  "points": 140
}
```

### Frontend

1. Navega al directorio del frontend:

   cd frontend/MonaProject

2. Instala las dependencias:

npm install

3. Compila el proyecto

npm run build

4. Ejecuta el servidor de desarrollo:

npm run dev

5. Abre la URL que aparece en la terminal (por defecto: http://localhost:5173).

