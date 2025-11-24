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
  - Bootstrap

- Backend
  - Express

## Estructura del estado global (librería usada y stores).

Para manejar el estado global se utilizó Zustand. La aplicación cuenta con dos stores principales: uno para la sesión del usuario y otro para las disciplinas.

El store de autenticación mantiene los datos del usuario, el token y un indicador de carga. Además, guarda esta información en localStorage para que la sesión no se pierda al recargar la página. Cuando la aplicación inicia, useAuth() revisa si existía información previa y consulta al backend para verificar si el token sigue siendo válido. Si todo está correcto, mantiene la sesión; si no, ejecuta un logout.
El segundo store corresponde a las disciplinas. Este store almacena la lista completa de disciplinas que la aplicación utiliza en distintas vistas como Calendario, Disciplinas y Puntajes. Gracias a esto, se evita repetir peticiones al servidor y se mantiene la información centralizada y accesible desde cualquier parte de la app.


## Mapa de rutas y flujo de autenticación.

Para las rutas se usó React Router v6. Se separaron rutas públicas y rutas privadas.
Las rutas públicas son el login, el registro y la raíz (/). Si el usuario ya está logueado y trata de ir al login o al register, la app lo manda directo al calendario para que no vuelva a la pantalla de inicio.
Todas las páginas “importantes” están protegidas con PrivateRoute, que revisa si hay usuario en el store. Si no lo hay, te tira al login. Además, se usó replace: true en las redirecciones clave para evitar que el usuario pueda hacer “volver” en el navegador y entrar a una vista protegida después de cerrar sesión.
También funciona bien cuando recargas la página (F5), porque la sesión persiste en localStorage y luego se valida con el backend usando /auth/me.

## Descripción de los tests E2E (herramienta usada, flujos cubiertos).

## Librería de estilos utilizada y decisiones de diseño.

Se usó React-Bootstrap junto al CSS oficial de Bootstrap para construir layouts responsivos rápidamente y mantener una apariencia consistente. Como alternativa, se usaron CSS Modules para aplicar estilos locales sin depender de librerías externas.

Se mantuvo una jerarquía visual clara: encabezados visibles, un color de acento para acciones importantes y tarjetas con sombra y bordes redondeados. Se intentó utilizar los colores representativos del CDI para tener una coherencia visual.

En los formularios se usaron labels visibles, placeholders solo como apoyo y validaciones básicas (required, number, min=0). Para los mensajes de éxito y error se evitó utilizar alerts para no depender del navegador del usuario.


## Estructura del Repositorio

- /frontend → Aplicación SPA desarrollada con React
- /backend → Servidor Express que entrega datos estáticos en formato JSON
- /e2e -> Pruebas End to End
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

