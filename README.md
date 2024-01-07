# Notas de voz
Este proyecto es una práctica para el curso 2023/24 de la asignatura Sistemas Web de la UPV/EHU de Donostia-San Sebastián. El equipo de desarrollo del proyecto es el *grupo1*, cuyos integrantes son:

- Jon Ander Alonso Ortiz de Elguea.

- Carlos Ayuso Iglesias.

- Imanol Natenzon Saez de Jauregui.

- Leire Sesma Ruiz de Gaona.

El proyecto consiste en el desarrollo de una aplicación web para grabar notas de audio. La aplicación se desarrolla usando HTML, CSS y JavaScript con Node.js y Express.js. Para ejecutar la aplicación, una vez descomprimida, desde una terminal debe lanzarse el comando `nodemon start`. La aplicación estará disponible en `localhost:3000`. [Link a GitHub](https://github.com/joalone/GrabadoraAudioSW)

Este segundo entregable implementa el Back-End. Las funcionalidades con las que cuenta en en esta etapa son:

- [x] Autenticación.

- [x] Escuchar audio.

- [x] Grabar audio.

- [x] Guardar audio.

- [x] Compartir enlace del audio.

- [x] Borrar audio.

- [x] Escuchar audio compartido.


En la carpeta `bin` está el archivo `index.ejs` que se carga al abrir la página.

En la carpeta `public/css` están las hojas de estilo que se usan.

En la carpeta `public/img` están los iconos que se usan.

En la capreta `public/utils` hay módulos de JavaScript en los que se apoya el proyecto, concretamente `moment.js`, `snackbar.js` y `uuid.js`.

En la carpeta `public/js` están los archivos JavaScript que añaden funcionalidad a la página.

En la carpeta `/routes` están las gestiones de las peticiones al servidor.

En la carpeta `/views` están los html de las paginas.

En la carpeta `/recordings` se guardan las grabaciones.

En el fichero `app.js` se inicializa el servidor.

NOTA IMPORTANTE: Es necesario que se tenga instalado mongoDB, y en el tener una BD llamada `grabadoraAudio` con dos colecciones, `recordings` y `users`.