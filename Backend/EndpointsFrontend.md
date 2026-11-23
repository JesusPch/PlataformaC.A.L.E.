# Endpoints del frontend

Inventario único de rutas del backend relacionadas con las pantallas del frontend. Cada ruta aparece una sola vez; la columna **Funciones** reúne todas las acciones de interfaz que usan esa ruta. Las rutas marcadas como pendientes aún no están implementadas.

## Convenciones de MinIO

- El frontend carga y recupera archivos directamente de MinIO; el API solo guarda referencias de objeto.
- `pdf_registro_key` identifica el recibo de inscripción; `pdf_actividad_key`, el PDF del catálogo; `object_key`, la evidencia entregada por el alumno.
- Las referencias no necesariamente son URL públicas. No guardar credenciales permanentes de MinIO en el frontend; definir carga/acceso con permisos limitados o URLs firmadas.
- Se asume que el recibo y las evidencias de alumnos usan el bucket de evidencias, y los recursos de actividad el bucket de actividades admin. El campo `pdf_registro_key` no almacena el nombre del bucket. Además, el modelo de evidencia usa actualmente `entregas-alumnos` como nombre predeterminado; debe coincidir con el bucket real.

## Inventario único de rutas

| ID | Método y ruta | Estado | Funciones y comportamiento |
| --- | --- | --- | --- |
| H1 | `GET /` | Implementado | Comprobar que Express está funcionando. |
| A1 | `POST /api/auth/login` | Pendiente | Validar inicio de sesión de alumno o administrador y crear una sesión. El backend aún no tiene autenticación. |
| S1 | `POST /api/alumnos` | Implementado | Registrar un alumno con datos personales, `contraseña` y referencia `pdf_registro_key`; por defecto queda `no autorizado`. Ahora, en la misma transacción, crea una fila en `actividad_alumnos` por cada actividad que exista en el catálogo en ese momento. Devuelve el alumno sin la contraseña. |
| S2 | `GET /api/alumnos` | Implementado | Obtener el listado sin contraseñas. Lo usan las listas administrativas, la búsqueda local del frontend, las peticiones (`estado === "no autorizado"`) y los liberados (`estado === "liberado"`). La API no filtra por estado, busca ni pagina. |
| S3 | `GET /api/alumnos/:id` | Implementado con limitación | Obtener información del alumno y su `pdf_registro_key`. Incluye entregas únicamente cuando está `autorizado`; en otro estado responde `entregas: []`. No sirve para revisar evidencias de solicitudes aún no autorizadas. |
| S5 | `GET /api/alumnos/:id/recibo` | Solo pruebas locales | Devuelve el PDF de inscripción desde MinIO. Requiere `ENABLE_LOCAL_RECEIPT_PREVIEW=true`, bloquea el entorno `production` y solo admite conexiones loopback. No usar como acceso de producción sin autenticación y autorización. |
| S4 | `PATCH /api/alumnos/:id/estado` | Implementado con limitaciones | Cambiar estado después de revisar la inscripción (`autorizado` o `no autorizado`) y liberar al alumno (`liberado`). Al liberar, registra `fecha_liberacion`. No valida valores ni comprueba progreso/horas, y no verifica que quien llama sea administrador. |
| D1 | `POST /api/admins` | Implementado | Crear administrador. La respuesta actual incluye la contraseña; corregir antes de usar con credenciales reales. |
| D2 | `GET /api/admins` | Implementado | Listar administradores sin incluir sus contraseñas. |
| C1 | `POST /api/actividades-admin` | Implementado | Crear una actividad del catálogo en `actividad_admin` con `titulo_actividad`, `id_usuario`, `descripcion` y referencia MinIO `pdf_actividad_key`. No recibe el PDF ni asigna la actividad a alumnos que ya existían. |
| C2 | `GET /api/actividades-admin` | Implementado | Mostrar el catálogo de actividades y los datos básicos del administrador que las creó. El frontend usa `pdf_actividad_key` para abrir el recurso desde MinIO. |
| C3 | `PUT` o `PATCH /api/actividades-admin/:id_actividad` | Pendiente | Modificar título, descripción o referencia del PDF desde el botón “Modificar”. |
| C4 | `DELETE /api/actividades-admin/:id_actividad` | Pendiente | Eliminar o desactivar una actividad desde el botón de cruz. Falta definir qué ocurre con asignaciones y evidencias existentes. |
| E1 | `GET /api/actividades-alumno/alumno/:id_alumno` | Implementado con limitación | Listar las asignaciones/entregas de un alumno con información de la actividad. Solo responde si el alumno está `autorizado`; de lo contrario, `403`. El personal administrativo necesita otra consulta protegida para revisar alumnos en otros estados. |
| E2 | `PUT /api/actividades-alumno/entregar/:id_evidencia` | Implementado | Guardar o reemplazar `object_key` y metadatos de una evidencia en una asignación existente. Solo permite la acción si el alumno está `autorizado`; si no, `403`. |
| E3 | `PATCH /api/actividades-alumno/evaluar/:id_evidencia` | Implementado con limitaciones | Guardar el resultado y comentario de revisión y registrar la fecha. El controlador no valida estados ni comprueba que quien revisa sea administrador. |
| X1 | `GET /api/admin/alumnos/:id` | Pendiente | Ruta administrativa protegida propuesta para obtener la ficha y las asignaciones/evidencias de un alumno incluso antes de autorizarlo. |
| X2 | `GET /api/admin/peticiones` | Pendiente | Ruta administrativa protegida propuesta para listar solicitudes pendientes en el servidor, en lugar de descargar todos los alumnos. |
| X3 | `GET /api/admin/alumnos/liberados` | Pendiente opcional | Ruta para filtrar liberados en el servidor. Por ahora la lista se obtiene con S2 y se filtra en el frontend. |
| X4 | `DELETE /api/alumnos/:id` | Pendiente | Eliminar un alumno desde la cruz en la lista de registrados. Confirmar si la cruz debe borrar el registro o representar otra acción. |

## Flujos de las pantallas

### Inicio de sesión

Usar A1 enviando el tipo de cuenta (`alumno` o `administrador`), el identificador (`numero_cuenta` o `no_empleado`) y la contraseña. La solicitud/ respuesta y el formato de sesión deben definirse al implementar autenticación. Actualmente las contraseñas se guardan en texto directo y no hay token ni sesión; no usar cuentas reales hasta protegerlas.

### Inscripción y revisión de peticiones

1. El frontend sube el recibo PDF directamente a MinIO y obtiene la clave única.
2. Envía los datos del alumno y la clave en `pdf_registro_key` usando S1. La inscripción queda `no autorizado` y se generan las asignaciones iniciales de actividades del catálogo.
3. La pestaña “Peticiones” usa S2 y filtra `no autorizado`. Los datos y la referencia del recibo provienen de S3; el PDF se abre directamente desde MinIO mediante el acceso autorizado.
4. La palomita usa S4 con `{ "estado": "autorizado" }`. La cruz usa S4 con `{ "estado": "no autorizado" }`.

**Limitación:** no hay un estado distinto para solicitud pendiente y rechazada. Por tanto, al usar la cruz con `no autorizado`, seguirá apareciendo en el filtro de peticiones. Hace falta definir/agregar el estado de rechazo para separarlas.

### Alumnos, actividades y evidencias

- La lista de alumnos y búsqueda local usan S2. La ficha usa S3. Las columnas de progreso y horas no están calculadas por la API.
- La lista de asignaciones usa E1 para alumnos autorizados. Para una vista administrativa sin restricción de estado debe implementarse X1 con autenticación/autorización.
- El alumno sube su evidencia directamente a MinIO y envía la referencia a E2. El personal revisa el resultado con E3.
- Una actividad del catálogo se crea con C1 después de cargar su PDF a MinIO; se lista con C2. C3 y C4 están pendientes.
- S4 con `{ "estado": "liberado" }` cambia el estado y establece la fecha. Las rutas E1 y E2 requieren estado exactamente `autorizado`, así que un alumno liberado ya no puede consultar ni entregar actividades.
- El botón dorado “Liberación” obtiene alumnos con S2 y filtra `estado === "liberado"`. Mostrar nombre, apellido, número de cuenta y `fecha_liberacion`; la búsqueda también puede hacerse localmente. X3 sería opcional si se requiere filtro del lado del servidor.

## Asignación automática del catálogo

Al registrar un alumno, S1 busca las actividades existentes en `actividad_admin` y crea una asignación por actividad en `actividad_alumnos`, con estado inicial `Pendiente`. La creación del alumno y sus asignaciones ocurre en una transacción: si falla alguna inserción, no queda un registro parcial.

Las actividades creadas después con C1 **no se asignan automáticamente a alumnos ya registrados**. Falta decidir e implementar si se agregan también a todos los alumnos existentes. El endpoint E2 registra evidencia, no crea asignaciones; esas asignaciones iniciales ahora las genera S1.

## Resumen de implementación pendiente

### Prioridad de seguridad

1. Implementar A1 y decidir el mecanismo de sesión (por ejemplo, JWT o cookie segura).
2. Guardar contraseñas con hash, dejar de devolverlas al crear administradores y planear la migración de las contraseñas existentes en texto directo. La creación de alumnos ya excluye la contraseña de su respuesta, pero todavía no la cifra/hash.
3. Proteger las rutas administrativas de cambio de estado, revisión, catálogo y consultas con autenticación y autorización por rol.
4. Definir el acceso del frontend a MinIO sin credenciales permanentes.

### Funcionalidad y datos

5. Implementar X1 y X2 para consulta de administrador y peticiones pendientes, incluyendo evidencias de alumnos no autorizados.
6. Definir un estado de rechazo distinto de `no autorizado` y actualizar el filtro de peticiones.
7. Decidir qué pasa al crear una actividad nueva: asignarla también a alumnos existentes o solo a futuros alumnos.
8. Agregar horas requeridas al modelo/persistencia de actividades y acordar cómo calcular progreso de actividades/horas y cuándo permitir liberar.
9. Implementar C3 y C4 definiendo qué pasa con las asignaciones y evidencias al modificar/eliminar una actividad.
10. Definir qué acción representa la cruz en la lista de alumnos registrados; implementar X4 solo si significa eliminar.
11. Agregar X3 si la lista grande de liberados requiere filtro/paginación en el servidor.

## Contratos de solicitud existentes

Crear alumno con una referencia MinIO (la contraseña de ejemplo es solo para pruebas):

```json
{
  "numero_cuenta": "12345678",
  "nombre": "Ana",
  "apellido": "López",
  "correo": "ana@example.com",
  "contraseña": "contraseña-de-prueba",
  "edad": 20,
  "telefono": "5551234567",
  "nivel": "Básico",
  "modalidad": "Presencial",
  "pdf_registro_key": "alumnos/12345678/inscripcion/recibo-uuid.pdf"
}
```

Crear una actividad con la clave del PDF ya cargado en MinIO:

```json
{
  "titulo_actividad": "LISTENING | Everyday related topics B2",
  "id_usuario": 1,
  "descripcion": "Recurso de listening para nivel B2",
  "pdf_actividad_key": "actividades/actividad-uuid.pdf"
}
```

Guardar evidencia (el registro de asignación debe existir):

```json
{
  "object_key": "alumnos/4/evidencias/evidencia-uuid.pdf",
  "bucket_name": "entregas-alumnos",
  "mime_type": "application/pdf",
  "file_size_bytes": 204800
}
```

Evaluar evidencia:

```json
{
  "estado": "aprobado",
  "comentario": "Evidencia revisada"
}
```
