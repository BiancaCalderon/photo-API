# API para Blog de Fotografías

Este módulo consiste en crear un API para un blog de fotografías. 

## Antes de comenzar
Para comenzar, asegúrate de tener instalado y configurado Node.js en tu computadora. Asegúrate de utilizar la versión 21, que puedes descargar desde [este enlace](https://nodejs.org/en/).

Adicionalmente, necesitarás una base de datos para desarrollo. Normalmente, tendrías que instalar un servidor MySQL en tu máquina, pero para esta actividad utilizaremos Docker para configurar un servidor virtual con nuestra base de datos. Asegúrate de tener Docker funcionando en tu computadora.

## Estructura de Carpetas

El proyecto tiene la siguiente estructura de carpetas:

- **node_modules**: Contiene las dependencias de Node.js instaladas para el proyecto.
- **src**: Contiene el código fuente del proyecto, incluyendo los archivos de configuración y los controladores de los endpoints.
- **Dockerfile**: Archivo de configuración para crear la imagen de Docker para el servidor virtual de MySQL.
- **id_github.pub**: Archivo público de tu identificación de GitHub para la configuración de claves SSH.
- **log.txt**: Archivo de registro para el proyecto.
- **package-lock.json**: Archivo de bloqueo de versiones de las dependencias npm.
- **package.json**: Archivo de configuración de npm con las dependencias del proyecto.
- **schema.sql**: Script SQL para la creación de la base de datos MySQL.
## Instalación
Para instalar y configurar el proyecto, sigue estos pasos:

1. Clona este repositorio en tu máquina local:
   ```bash
   git clone git@github.com:BiancaCalderon/photo-API.git

   - Navega hasta el directorio del proyecto: cd photo-API

-**Instala las dependencias del proyecto utilizando npm:**
npm install

## Uso
Una vez instalado y configurado el proyecto, puedes iniciar el servidor API utilizando el siguiente comando:
npm start

## Licencia
Este proyecto está bajo la licencia MIT, lo que significa que puedes utilizar, modificar y distribuir este software libremente con ciertas restricciones. Consulta el archivo LICENSE para más detalles.




