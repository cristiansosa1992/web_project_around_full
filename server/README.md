# web_project_around_express

Proyecto del Sprint 13 de TripleTen: Alrededor de los EE.UU., parte 7. El objetivo es crear una API inicial con Node.js, Express y TypeScript.

## Descripcion

Este proyecto implementa un servidor Express que devuelve informacion en formato JSON para usuarios y tarjetas del proyecto "Alrededor de los EE.UU.".

La API lee los datos desde archivos JSON locales en la carpeta `data` usando metodos asincronos de `node:fs/promises`. Las rutas de los archivos se construyen con `node:path` e `import.meta.dirname`.

## Funcionalidad

- Obtener la lista completa de usuarios.
- Obtener la lista completa de tarjetas.
- Obtener un usuario especifico por su `_id`.
- Responder con error 404 cuando el usuario no existe.
- Responder con error 404 cuando la ruta solicitada no existe.
- Responder con error 500 si ocurre un problema interno del servidor.

## Tecnologias y tecnicas utilizadas

- Node.js
- Express
- TypeScript
- ES Modules
- ESLint
- Prettier
- EditorConfig
- tsx para hot reload
- Lectura asincrona de archivos JSON
- Separacion de responsabilidades en rutas y controladores

## Rutas disponibles

```txt
GET /users
```

Devuelve todos los usuarios desde `data/users.json`.

```txt
GET /cards
```

Devuelve todas las tarjetas desde `data/cards.json`.

```txt
GET /users/:userId
```

Devuelve el usuario cuyo `_id` coincide con el parametro `userId`.

Si el usuario no existe, devuelve:

```json
{
  "message": "ID de usuario no encontrado"
}
```

Si la ruta no existe, devuelve:

```json
{
  "message": "Recurso solicitado no encontrado"
}
```

Si ocurre un error interno, devuelve:

```json
{
  "message": "Ha ocurrido un error en el servidor"
}
```

## Ejecucion del proyecto

Instalar dependencias:

```bash
npm install
```

Iniciar el servidor con hot reload:

```bash
npm run dev
```

Compilar TypeScript:

```bash
npm run build
```

Iniciar la version compilada:

```bash
npm run start
```

Ejecutar ESLint:

```bash
npm run lint
```

El servidor se ejecuta en:

```txt
http://localhost:3000
```

## Estructura del proyecto

```txt
web_project_around_express/
├── data/
│   ├── cards.json
│   └── users.json
├── src/
│   ├── controllers/
│   │   ├── cards.ts
│   │   └── users.ts
│   ├── routes/
│   │   ├── cards.ts
│   │   └── users.ts
│   └── app.ts
├── .editorconfig
├── .gitignore
├── eslint.config.js
├── package.json
└── tsconfig.json
```
