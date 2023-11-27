# Notas de voz
Este proyecto es una práctica para el curso 2023/24 de la asignatura Sistemas Web de la UPV/EHU de Donostia-San Sebastián. El equipo de desarrollo del proyecto es el *grupo1*, cuyos integrantes son:
- Jon Ander Alonso Ortiz de Elguea.
- Carlos Ayuso Iglesias.
- Imanol Natenzon Saez de Jauregui.
- Leire Sesma Ruiz de Gaona.

El proyecto consiste en el desarrollo de una aplicación web para grabar notas de audio. La aplicación se desarrolla usando HTML, CSS y JavaScript con Node.js y Express.js. Para ejecutar la aplicación, una vez descomprimida, desde una terminal debe lanzarse el comando `npm start`. La aplicación estará disponible en `localhost:3000`.

Este primer entregable implementa el Front-End. La funcionalidad con la que cuenta en esta primera etapa es:
- [ ] Autenticación.
- [x] Escuchar audio.
- [x] Grabar audio.
- [ ] Guardar audio.
- [x] Compartir enlace del audio.
- [ ] Borrar audio.
- [ ] Escuchar audio compartido.

En la carpeta `bin` está el archivo `index.ejs` que se carga al abrir la página.
En la carpeta `public/css` están las hojas de estilo que se usan.
En la carpeta `public/img` están los iconos que se usan.
En la capreta `public/utils` hay módulos de JavaScript en los que se apoya el proyecto, concretamente `moment.js`, `snackbar.js` y `uuid.js`.
En la carpeta `public/js` están los archivos JavaScript que añaden funcionalidad a la página:
- `main.js` es el archivo principal, donde se implementa la clase `App`.
- `playButton.js` se encarga de generar el botón de reproducción.
- `recordButton.js` se encarga de generar el botón de grabación.
- `uploadButton.js` se encarga de generar el botón para subir archivos.
- `audioHandler.js` implementa la clase `AudioHandler` que se encarga de manejar la lista de audios.

En el segundo y último entregable se implementará el Back-End y la funcionalidad quedará completada.
