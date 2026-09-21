# Alrededor de los EE.UU. - React

Proyecto del sprint 12 de TripleTen. Es una aplicacion desarrollada con React y TypeScript que consume una API real para mostrar y actualizar el perfil de usuario, el avatar y la galeria de tarjetas.

## Descripcion

La pagina muestra un perfil de usuario y una galeria de tarjetas con imagenes de lugares. El proyecto permite abrir ventanas emergentes para editar el perfil, cambiar el avatar, agregar una nueva tarjeta y ver una imagen ampliada.

## Tecnologias utilizadas

- React
- TypeScript
- Vite
- CSS
- Metodologia BEM
- API REST

## Funcionalidad

- Carga del perfil de usuario desde la API.
- Carga inicial de tarjetas desde la API.
- Edicion de perfil y avatar.
- Creacion y eliminacion de tarjetas.
- Boton de eliminar visible solo para las tarjetas creadas por el usuario actual.
- Likes y dislikes sincronizados con la API.
- Ventana emergente para ampliar imagenes.
- Cierre de ventanas emergentes con el boton de cerrar.

## Como ejecutar el proyecto

```bash
npm install
npm run dev
```

## Implementado en esta etapa

- Conexion de la aplicacion con la API real de Around.
- Tipado de usuarios, tarjetas, formularios y respuestas principales.
- Carga inicial de usuario y tarjetas con `Promise.all`.
- Actualizacion inmutable del estado al crear, eliminar o dar like a tarjetas.
- Uso de `CurrentUserContext` para compartir el usuario actual entre componentes.
