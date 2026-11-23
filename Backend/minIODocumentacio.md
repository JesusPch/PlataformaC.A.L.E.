# Integración de MinIO para recibos de inscripción

## Objetivo

El formulario de inscripción permite subir un recibo PDF. El backend guarda el archivo en MinIO y devuelve una clave de objeto que se guarda en `alumnos.pdf_registro_key`. El navegador no se conecta directamente a MinIO ni recibe sus credenciales.

## Estado de la configuración local

- Contenedor de uso actual: `minio-registro`.
- API S3: `http://localhost:9010` (mapeada al puerto `9000` del contenedor).
- Consola web: `http://localhost:9011` (mapeada al puerto `9001` del contenedor).
- Los puertos están publicados solo en `127.0.0.1`.
- Volumen persistente: `cale_minio_registro_data`, montado en `/data`.
- Bucket configurado para recibos: `pdf-registro` (singular).
- El contenedor anterior `minio-cale` existe, pero actualmente está detenido; conserva el volumen `cale_minio_data`.

El bucket configurado es `pdf-registro`, no `pdf-registros`. El backend utiliza ese bucket para todos los recibos de inscripción. Los otros buckets no se usan en este flujo.

## Variables de entorno del backend

La configuración local se guarda en `Backend/.env`, que no debe agregarse al control de versiones ni compartirse. El archivo `Backend/.env.example` sirve como plantilla.

| Variable | Propósito | Valor local no secreto |
| --- | --- | --- |
| `MINIO_ENDPOINT` | Host accesible desde el backend | `localhost` |
| `MINIO_PORT` | Puerto de la API S3 | `9010` |
| `MINIO_USE_SSL` | Usa HTTPS si es `true` | `false` |
| `MINIO_REGION` | Región requerida por el cliente S3 | `us-east-1` |
| `MINIO_BUCKET` | Bucket destino de recibos | `pdf-registro` |
| `MINIO_ACCESS_KEY` | Identificador de acceso | Se configura localmente; no documentar su valor |
| `MINIO_SECRET_KEY` | Secreto de acceso | Se configura localmente; no documentar su valor |

El cliente (`src/Services/minio.js`) usa `@aws-sdk/client-s3`, credenciales de estas variables, direccionamiento compatible con MinIO y `forcePathStyle`. Antes de subir cada archivo comprueba que el bucket sea accesible y luego ejecuta `PutObject` con `ContentType: application/pdf`.

Si se modifica `.env`, hay que reiniciar el backend para que lea la nueva configuración. Si MinIO y el backend se ejecutan en contenedores distintos, `localhost` no apuntará al contenedor MinIO; en ese caso se debe usar el hostname de red del servicio y verificar que ambos contenedores compartan una red.

## Flujo de inscripción

1. El usuario elige un PDF en el formulario de `Frontend/frontend-cale/src/pages/RegisterCALEScreen.jsx`.
2. `useRegisterValidation.js` valida que exista el archivo, que su tipo sea PDF y que no supere 5 MB.
3. Al enviar el formulario, el frontend manda el archivo como `multipart/form-data`, en el campo `file`, a `POST /api/alumnos/recibo`.
4. El backend valida el archivo, genera una clave no predecible y sube el contenido al bucket `pdf-registro`.
5. La API responde `201` con `data.pdf_registro_key`, por ejemplo `alumnos/inscripciones/<uuid>.pdf`.
6. El frontend manda los campos del alumno y esa clave a `POST /api/alumnos`.
7. El controlador registra el alumno y sus actividades en una transacción de base de datos. El valor de `pdf_registro_key` es la clave del objeto, no una URL ni el nombre del bucket.

El formulario no fija manualmente el encabezado `Content-Type` para la carga: el navegador lo establece junto con el límite multipart. Para el registro del alumno sí se envía JSON.

Para pruebas locales, `GET /api/alumnos/:id/recibo` consulta la clave guardada en PostgreSQL y transmite el PDF desde MinIO. Requiere `ENABLE_LOCAL_RECEIPT_PREVIEW=true` en `Backend/.env`, el backend reiniciado y una solicitud desde loopback; está deshabilitado en producción. En Thunder Client se puede llamar, por ejemplo, con `GET http://localhost:3001/api/alumnos/4/recibo` (usa el ID real). No se envía body. La respuesta es PDF (`application/pdf`), no JSON; si Thunder Client no lo previsualiza, guarda la respuesta como `.pdf` y ábrela con un visor.

### Endpoints y respuestas

`POST /api/alumnos/recibo`

- Entrada: multipart con un único archivo en `file`.
- Éxito (`201`):

```json
{
  "ok": true,
  "data": {
    "pdf_registro_key": "alumnos/inscripciones/<uuid>.pdf"
  }
}
```

- Sin archivo o PDF inválido: `400`.
- Archivo mayor a 5 MB: `413`.
- Error al comunicarse con MinIO: `502`.

`POST /api/alumnos`

- Entrada: JSON con los campos del alumno y `pdf_registro_key`.
- Éxito: `201` con el alumno creado.

El código relevante está en `src/Routes/alumno.routes.js`, `src/Controllers/alumno.controller.js` y `src/Services/minio.js`.

## Proxy y CORS

En desarrollo, `Frontend/frontend-cale/vite.config.js` reenvía las solicitudes `/api` a `http://localhost:3001`. El navegador llama rutas del mismo origen del frontend y el backend es quien se comunica con MinIO. No se configuró CORS en el backend ni se necesita CORS en MinIO para esta carga mediada.

En producción, el servidor debe servir o reenviar `/api` al backend bajo el origen del frontend, o configurar la política CORS del backend si se decide usar orígenes diferentes. No se deben poner credenciales de MinIO en el frontend.

## Seguridad y acceso al recibo

- Las credenciales están solo en la configuración local del backend. No deben escribirse en documentación, código fuente o mensajes ni enviarse al navegador.
- Las credenciales de desarrollo son débiles y se compartieron durante la configuración. Deben rotarse antes de cualquier exposición fuera del entorno local. En producción, usar credenciales de servicio con permisos mínimos, no credenciales root.
- Los puertos del contenedor `minio-registro` están ligados a localhost; no se debe cambiar ese alcance sin revisar autenticación, TLS y reglas de red.
- La base de datos guarda solo la clave del objeto. La ruta de vista del recibo es únicamente para pruebas locales; para uso real se debe agregar autenticación y autorización antes de permitir que usuarios consulten recibos.

## Limitaciones conocidas

- La carga y el registro son dos solicitudes separadas. Si MinIO acepta el PDF pero falla el registro (por ejemplo, por una cuenta ya existente), el objeto queda sin referencia en la base de datos. Aún no hay limpieza automática de esos objetos.
- El endpoint de registro recibe `pdf_registro_key` en el cuerpo de la solicitud; todavía no valida que la clave tenga el prefijo esperado ni confirma que el objeto exista antes de insertar al alumno.
- La ruta local de consulta de recibos está deshabilitada en producción y no sustituye la autenticación.

## Verificación realizada

- Se confirmó que `minio-registro` responde por la API local y que el bucket `pdf-registro` es accesible.
- Se realizó una carga de prueba al bucket y se recibió una clave con el prefijo `alumnos/inscripciones/`; después se eliminó el objeto de prueba.
- Pasaron el build del frontend y las comprobaciones de sintaxis del backend tras la integración.
- No se ha verificado el flujo completo de inscripción con una cuenta nueva hasta confirmar en PostgreSQL el valor persistido de `pdf_registro_key`.

Para comprobarlo end-to-end, reiniciar el backend si se cambió `.env`, enviar el formulario con una cuenta y correo únicos y verificar que el alumno creado tenga en `pdf_registro_key` la clave devuelta por `POST /api/alumnos/recibo`.
