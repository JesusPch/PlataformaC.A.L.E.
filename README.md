# plataforma-cale

Sistema de control de horas del CALE (UAS Culiacán). Aquí va todo el proyecto: `Backend`,
`Frontend` y `Android`. Cada carpeta tiene su documentación.

## Cómo trabajamos

Usamos GitFlow. Después de clonar:

    git branch main origin/main
    git flow init -d

Cada cambio va en su propia feature desde develop:

    git flow feature start nombre-del-cambio

Nada se sube directo a main.

## Entorno local con PostgreSQL y MinIO

Se requiere Docker Engine y Docker Compose. Este entorno ejecuta PostgreSQL y MinIO en contenedores con volúmenes persistentes locales; no modifica ni utiliza el servicio PostgreSQL instalado en el host. PostgreSQL se publica en el puerto `5433` para evitar conflictos con una instalación local que normalmente usa `5432`.

1. Si aún no existen los archivos locales de entorno, copiar los ejemplos:

       cp .env.example .env
       cp Backend/.env.example Backend/.env

   Si ya existe alguno de esos archivos, no lo sobrescribas: conserva tus valores y ajusta solo las variables necesarias. Las credenciales incluidas son únicamente para desarrollo local; no usar fuera de una máquina de desarrollo.

2. Desde la raíz del proyecto, iniciar los servicios:

       docker compose up -d

   Compose inicia PostgreSQL y MinIO, conserva sus datos en volúmenes Docker e inicializa el bucket `pdf-registro`.
   Si ya tienes un MinIO iniciado por separado en los puertos `9000` o `9004`, detén ese contenedor antes de iniciar Compose o cambia `MINIO_API_PORT`/`MINIO_CONSOLE_PORT` en el `.env` de la raíz y `MINIO_PORT` en `Backend/.env`. Compose crea su propio volumen `minio_data`; no importa automáticamente los archivos del contenedor anterior.

3. Esperar a que PostgreSQL indique `healthy` y después iniciar el backend:

       cd Backend
       npm install
       npm start

   `DB_SYNC=true` hace que Sequelize cree las tablas modeladas que falten en la base `servicio`. Esto no carga datos de prueba ni crea funciones o triggers no definidos en los modelos.

4. En otra terminal, iniciar el frontend:

       cd Frontend/frontend-cale
       npm install
       npm run dev

   MinIO queda disponible en `http://localhost:9000` y su consola en `http://localhost:9004`. El backend, ejecutado desde el host, se conecta a PostgreSQL por `127.0.0.1:5433` y a MinIO por `127.0.0.1:9000`.

Cada integrante tendrá sus propios datos persistidos en sus volúmenes locales; Compose no comparte automáticamente la base de datos ni los archivos entre computadoras. `docker compose down` detiene los servicios sin borrar sus datos. No usar `docker compose down -v` salvo que se quiera borrar intencionalmente toda la información local.
