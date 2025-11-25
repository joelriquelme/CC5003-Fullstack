## Tema general del proyecto

Aplicación que simula la centralización de la información del Torneo de la U "La Mona" a través de un formato de medallero, similar a los Juegos Panamericanos del 2023: https://results-santiago2023.org/

El Backend tiene endpoints para disciplinas, tabla de medallas, puntajes por disciplina, usuarios y autenticación, mientras que el Frontend es una SPA que consume estos datos y permite la interacción del usuario, usa React Router para la navegación.

La aplicación tiene registro e inicio de sesión de usuarios, visualización de medallero, puntajes por disciplina, calendario y listados de disciplinas.

## Estructura del estado global (librería usada y stores)

Para el frontend usamos Zustand de librería de estado global. Hay un store dedicado a la autenticación `authStore`:

- El hook `useAuth` wrappea la lógica de sesión y utiliza el store de Zustand.

Arquitectura de datos y compartición de estado:

- Los datos se obtienen a través del `httpService`. Cada página mantiene su propio estado local (useState/useEffect) y usa el `httpService` para poblar las vistas con la data.

- Para la sesión y el token usamos el store de Zustand, que nos permite acceder rápido a `user` y `token` desde cualquier componente sin hacer prop-drilling.

## Mapa de rutas y flujo de autenticación

Rutas principales:

- GET / -> mensaje de saludo (health check)
- /disciplinas -> rutas de disciplinas
- /medalTable -> rutas de departamentos / tabla de medallas
- /puntajesPorDisciplina -> rutas de matches/puntajes por disciplina
- /users -> rutas de usuarios (registro, listado, etc.)
- /login -> autenticación (login)
- /auth -> endpoints protegidos relacionados con la sesión (ej. `/me`)
- /api/testing -> endpoints de test (registrados sólo en NODE_ENV=test)

Flujo de autenticación:

- El usuario manda el username y su password.
- El backend valida las credenciales en `users` de mongoose y, si son válidas:
- Genera un JWT que incluye { username, id, csrf } y lo firma con `JWT_SECRET`.
- Envía la cookie `token` (httpOnly) y devuelve la cabecera `X-CSRF-Token` con el valor `csrf` para que el usuario la use en sus siguientes peticiones.

Está el middleware `withUser` en `auth.ts` que:

- Lee la cookie `token`, verifica el JWT y compara el `csrf` del token con el header `x-csrf-token` de la petición.
- Si coinciden, inyecta `userId` en `req` y permite el acceso; si no, manda un 401.

## Descripción de los tests E2E (herramienta usada, flujos cubiertos)

Usamos playwright para los tests E2E.

Flujos y comportamiento de los tests:

1. Antes de cada test se resetea la base de datos de prueba haciendo un POST a `http://localhost:3001/api/testing/reset`.
2. Creamos un usuario de prueba con un POST a `http://localhost:3001/api/users`.

Se cubrieron los siguientes casos para el login:

- Registro exitoso de usuario (navegar a `/register`, completar formulario, verificar mensaje "Usuario creado exitosamente" y retorno al login).
- Login fallido con un usuario inexistente (debe mostrar el texto "Credenciales inválidas").
- Login exitoso con un usuario válido (rellena y envía el formulario, luego vuelve a la página principal).

Se cubrieron los siguientes casos para el medallero:

- Visualización del medallero (verifica que la tabla aparece y contiene datos).

## Librería de estilos utilizada y decisiones de diseño

Utilizamos principalmente CSS para los estilos, sin depender de frameworks CSS como MUI, Mantine o Tailwind, para mantener un formato más simple.
