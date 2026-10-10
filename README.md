## Sprint 16: Autenticación segura, autorización y despliegue full stack

En este sprint se implementa la autenticación propia del proyecto, se refuerzan las reglas de autorización y se prepara la aplicación para su despliegue.

### Lo que ya se implementó

- Se agregaron los campos `email` y `password` al modelo de usuario.
- El registro de usuarios ahora guarda la contraseña de forma segura usando `bcrypt`.
- El inicio de sesión valida las credenciales y genera un token JWT.
- Las rutas `/signup` y `/signin` quedaron públicas.
- Las rutas protegidas ahora usan un middleware de autenticación que valida el token.
- El frontend se conecta con la autenticación del backend propio.
- Las tarjetas ahora pertenecen a un usuario mediante el campo `owner`.
- `GET /cards` devuelve solo las tarjetas del usuario autenticado, ordenadas de la más reciente a la más antigua.
- El servidor impide borrar tarjetas de otros usuarios.
- El servidor impide modificar los likes de tarjetas de otros usuarios.
- Los controladores de usuarios ya no devuelven documentos completos de MongoDB.
- El correo electrónico solo se devuelve al dueño de la cuenta.
- Las rutas `/signup` y `/signin` tienen limitadores de peticiones independientes para reducir abuso.

### Lo que falta por hacer

- Mover a variables de entorno la conexión a MongoDB, el puerto del servidor y el origen permitido del frontend.
- Agregar `maxPoolSize` a la conexión de Mongoose.
- Configurar `app.set("trust proxy", 1)` para el despliegue.
- Crear una ruta `/health` para comprobar el estado del servidor.
- Crear `client/vercel.json` para soportar recarga de rutas en el frontend.
- Mover la URL de la API del frontend a una variable `VITE_API_URL`.
- Crear la base de datos en MongoDB Atlas.
- Desplegar el backend en Vercel.
- Desplegar el frontend en Vercel.
- Probar registro, inicio de sesión, edición de perfil, creación de tarjetas, eliminación de tarjetas y likes.
- Crear una segunda cuenta para comprobar que no puede ver ni modificar tarjetas de otro usuario.
- Agregar al README las URLs finales del frontend y backend desplegados.

### URLs de despliegue

Backend:

```txt
Pendiente