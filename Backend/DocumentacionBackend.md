
# Documentación del backend

API del sistema de control de horas del CALE. Está construida con Node.js, Express, Sequelize y PostgreSQL.

## Preparar y ejecutar localmente

1. Asegúrate de que PostgreSQL esté instalado y ejecutándose, y crea la base de datos indicada por `DB_NAME` si aún no existe. Sequelize no crea la base de datos; solo las tablas dentro de ella.
2. Crea `Backend/.env` con la configuración de tu entorno:

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=servicio
   DB_USER=postgres
   DB_PASSWORD=tu_contraseña_local
   PORT=3001
   DB_SYNC=true
   ```

3. Desde la carpeta `Backend`, instala las dependencias y arranca el servidor:

   ```bash
   npm install
   npm start
   ```

Con `DB_SYNC=true`, al iniciar el backend Sequelize crea las tablas que falten según los modelos. No modifica ni elimina tablas existentes; tampoco reemplaza un sistema de migraciones ni crea triggers SQL personalizados. Usa esta opción únicamente para bases locales de desarrollo y configura `DB_SYNC=false` en producción. El servidor verifica la conexión y completa la sincronización antes de escuchar solicitudes. La URL base local es `http://localhost:3001`. El archivo `.env` contiene configuración local y no se debe compartir ni subir al repositorio.

## Consumir la API

Las rutas que reciben datos esperan JSON. En Postman o Thunder Client selecciona **Body → raw → JSON**; con `curl`, envía `Content-Type: application/json`.

La respuesta normalmente tiene la forma `{ "ok": true, "data": ... }`. Si ocurre un error, los controladores responden con `{ "ok": false, ... }`.

### Comprobación

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/` | Comprueba que Express está funcionando. No consulta la base de datos. |

Ejemplo:

```bash
curl http://localhost:3000/
```

### Alumnos

Prefijo: `/api/alumnos`

| Método | Ruta | Descripción |
| --- | --- | --- |
| `POST` | `/api/alumnos` | Registra un alumno. El cuerpo puede incluir `numero_cuenta`, `nombre`, `apellido`, `contraseña`, `correo` y, opcionalmente, `edad`, `telefono`, `nivel`, `modalidad`, `estado`, `fecha_liberacion` y `pdf_registro_key`. En una misma transacción, crea una asignación inicial en `actividad_alumnos` por cada actividad existente en `actividad_admin`. La respuesta excluye `contraseña`. |
| `POST` | `/api/alumnos/recibo` | Recibe `multipart/form-data` con el campo `file`, valida un PDF de hasta 5 MB, lo almacena en MinIO y devuelve su clave en `data.pdf_registro_key`. |
| `GET` | `/api/alumnos` | Lista los alumnos; excluye `contraseña` de la respuesta. |
| `GET` | `/api/alumnos/:id` | Obtiene un alumno por su ID y excluye la contraseña. Incluye sus entregas solo si su estado es `autorizado`; en otro estado devuelve `entregas: []`. |
| `GET` | `/api/alumnos/:id/recibo` | Devuelve el PDF de inscripción asociado al alumno con `Content-Type: application/pdf`. Solo funciona en desarrollo si `ENABLE_LOCAL_RECEIPT_PREVIEW=true` y la solicitud proviene de loopback. |
| `PATCH` | `/api/alumnos/:id/estado` | Cambia el estado del alumno. Recibe `{ "estado": "autorizado" }`. Si se cambia a `liberado`, también establece `fecha_liberacion`. Al pasar a `autorizado` puede ejecutarse el trigger de PostgreSQL configurado para el proyecto. |

Ejemplo de registro:

```bash
curl -X POST http://localhost:3000/api/alumnos \
  -H "Content-Type: application/json" \
  -d '{
    "numero_cuenta": "12345678",
    "nombre": "Ana",
    "apellido": "López",
    "contraseña": "cambiar-por-una-credencial-de-prueba",
    "correo": "ana@example.com"
  }'
```

El recibo se sube primero a `/api/alumnos/recibo`. Al recibir `data.pdf_registro_key`, envíala en el JSON de `POST /api/alumnos`; el navegador no debe recibir las credenciales de MinIO.

Para consultar un recibo en pruebas locales, agrega `ENABLE_LOCAL_RECEIPT_PREVIEW=true` a `Backend/.env` y reinicia el backend. En Thunder Client usa `GET http://localhost:3001/api/alumnos/4/recibo` (reemplaza `4` por el ID real). No envíes body ni credenciales de MinIO. La respuesta es el PDF, no JSON. Esta ruta está deshabilitada en producción y rechaza solicitudes que no sean locales; no la expongas mediante un proxy ni la habilites para uso público antes de implementar autenticación y autorización.

Los valores de estado usados por el código son `no autorizado`, `autorizado` y `liberado`. **Solo un alumno con estado `autorizado` puede acceder a sus actividades y entregas**; con los estados `no autorizado` o `liberado`, las rutas de actividades deniegan el acceso.

Para autorizar al alumno con ID `4` y habilitar su acceso:

```bash
curl -X PATCH http://localhost:3000/api/alumnos/4/estado \
  -H "Content-Type: application/json" \
  -d '{ "estado": "autorizado" }'
```

### Administradores

Prefijo: `/api/admins`

| Método | Ruta | Descripción |
| --- | --- | --- |
| `POST` | `/api/admins` | Registra un administrador. Requiere `no_empleado`, `nombre`, `apellido`, `contraseña` y `rol`. |
| `GET` | `/api/admins` | Lista los administradores; excluye `contraseña` de la respuesta. |

Ejemplo:

```bash
curl -X POST http://localhost:3000/api/admins \
  -H "Content-Type: application/json" \
  -d '{
    "no_empleado": "ADM001",
    "nombre": "Alex",
    "apellido": "García",
    "contraseña": "credencial-solo-para-pruebas",
    "rol": "admin"
  }'
```

### Actividades del catálogo

Prefijo: `/api/actividades-admin`

| Método | Ruta | Descripción |
| --- | --- | --- |
| `POST` | `/api/actividades-admin` | Crea una actividad. Requiere `titulo_actividad` e `id_usuario`; también acepta `pdf_actividad_key` y `descripcion`. `id_usuario` identifica al administrador creador. |
| `GET` | `/api/actividades-admin` | Lista las actividades e incluye los campos `id_usuario`, `nombre` y `apellido` del administrador creador. |

Ejemplo:

```bash
curl -X POST http://localhost:3000/api/actividades-admin \
  -H "Content-Type: application/json" \
  -d '{
    "titulo_actividad": "Apoyo en biblioteca",
    "id_usuario": 1,
    "descripcion": "Apoyo en actividades de biblioteca",
    "pdf_actividad_key": "actividades/apoyo-biblioteca.pdf"
  }'
```

### Actividades y evidencias de alumnos

Prefijo: `/api/actividades-alumno`

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/api/actividades-alumno/alumno/:id_alumno` | Lista las entregas asociadas al alumno e incluye la información de la actividad. Solo está disponible si el estado del alumno es `autorizado`; si no, responde `403`. |
| `PUT` | `/api/actividades-alumno/entregar/:id_evidencia` | Registra o reemplaza los metadatos de una evidencia en un registro de entrega existente. Acepta `object_key`, `bucket_name`, `mime_type` y `file_size_bytes`. Restablece el estado a `Pendiente` y actualiza la fecha. Solo permite entregar evidencia si el alumno propietario está `autorizado`; si no, responde `403`. |
| `PATCH` | `/api/actividades-alumno/evaluar/:id_evidencia` | Evalúa una entrega existente. Acepta `estado` y opcionalmente `comentario`; registra `fecha_evaluacion`. |

Ejemplo para registrar metadatos de una evidencia:

```bash
curl -X PUT http://localhost:3000/api/actividades-alumno/entregar/1 \
  -H "Content-Type: application/json" \
  -d '{
    "object_key": "alumnos/1/evidencias/archivo.pdf",
    "bucket_name": "entregas-alumnos",
    "mime_type": "application/pdf",
    "file_size_bytes": 204800
  }'
```

Este endpoint no carga el archivo: el cliente o el proceso de almacenamiento debe subirlo a MinIO por separado y enviar aquí su `object_key` y metadatos. También es necesario que ya exista el registro de entrega identificado por `id_evidencia`; esta API no expone actualmente una ruta para crear ese registro.

Ejemplo para evaluar:

```bash
curl -X PATCH http://localhost:3000/api/actividades-alumno/evaluar/1 \
  -H "Content-Type: application/json" \
  -d '{
    "estado": "aprobado",
    "comentario": "Evidencia revisada"
  }'
```

El controlador guarda el texto de `estado` tal como se recibe; no valida una lista fija de estados.

## Respuestas de error y notas para pruebas

- Las rutas de actividades responden `403` cuando el estado del alumno no es exactamente `autorizado`; cambialo con `PATCH /api/alumnos/:id/estado`.
- Los endpoints de búsqueda por ID responden `404` cuando no encuentran al alumno o la entrega.
- Los errores capturados por los controladores responden `500` con un mensaje de error.
- La comprobación de estado limita el acceso a las actividades, pero las rutas no autentican la identidad de quien llama ni verifican roles. No deben exponerse como API pública sin implementar autenticación y autorización por usuario.
- El endpoint de creación de administrador devuelve actualmente la propiedad `contraseña`; no uses contraseñas reales al probarlo. Las contraseñas aún se almacenan en texto directo y deben protegerse antes de usar cuentas reales.
- Prueba primero los `GET`. Para probar `PUT` y `PATCH` de entregas necesitas un `id_evidencia` existente en la base de datos.
