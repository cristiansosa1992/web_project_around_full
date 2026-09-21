# Around The U.S. Full Stack

Proyecto full stack de TripleTen con una aplicacion React en `client/` y una API
Express en `server/`. La aplicacion permite registrarse, iniciar sesion,
mantener la sesion con un token JWT, editar el perfil, cambiar el avatar,
publicar tarjetas, dar y quitar me gusta, y eliminar tarjetas propias.

## Funcionalidad

- Registro e inicio de sesion con la API de autenticacion de TripleTen.
- Restauracion de sesion desde `localStorage`.
- Cierre de sesion con eliminacion del token guardado.
- Rutas publicas para `/signup` y `/signin`.
- Ruta principal `/` protegida para usuarios autenticados.
- Carga de perfil y tarjetas desde la API propia en `http://localhost:3001`.
- Edicion de perfil y avatar.
- Creacion, eliminacion y actualizacion local de tarjetas.

## Tecnologias

- React, TypeScript y React Router.
- Vite para desarrollo y compilacion del cliente.
- Express, TypeScript y MongoDB/Mongoose para la API.
- CSS modular con metodologia BEM.
- `localStorage` para persistir el JWT del usuario.
- CORS configurado para conectar el cliente con el servidor local.

## Comandos

Instalar dependencias de cliente y servidor:

```bash
npm run install:all
```

Iniciar la API en `http://localhost:3001`:

```bash
npm run dev:server
```

Iniciar el cliente en `http://localhost:3000`:

```bash
npm run dev:client
```

Compilar cada mitad del proyecto:

```bash
npm run build --prefix client
npm run build --prefix server
```
