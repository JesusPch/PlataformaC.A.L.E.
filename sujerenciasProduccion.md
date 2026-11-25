# Sugerencias para producción: vista de comprobantes

## Flujo implementado para desarrollo

1. La lista de alumnos indica si cada solicitud tiene un comprobante asociado.
2. Al abrirlo, el frontend envía `GET /api/alumnos/:id/recibo` usando el ID del alumno, no la clave del objeto de MinIO.
3. El backend obtiene `pdf_registro_key` de la base de datos, recupera el objeto privado de MinIO y transmite el PDF.
4. El modal muestra el PDF y presenta estados de carga y error.

El frontend no necesita las credenciales de MinIO ni construir una URL a partir de `pdf_registro_key`. El endpoint existente tiene una restricción de vista local que bloquea producción; no se debe quitar sin añadir autenticación y autorización.

## Pendientes antes de producción

- **Autenticar y autorizar la ruta:** permitir la consulta solo a usuarios autenticados con rol de administrador autorizado. No confiar solo en que el ID del alumno venga de la interfaz; validar el permiso en cada petición.
- **Reemplazar la restricción local de recibos:** `soloVistaLocalDeRecibos` deniega las solicitudes con `NODE_ENV=production`. Cambiarla por el middleware de autorización de administrador existente (o implementarlo) antes de habilitar la función en producción; no eliminar la protección sin reemplazo.
- **Dejar privado MinIO:** el navegador debe seguir hablando con el backend. No publicar el bucket ni incluir `MINIO_ACCESS_KEY` o `MINIO_SECRET_KEY` en variables del frontend.
- **Minimizar la información expuesta:** `GET /api/alumnos` actualmente incluye `pdf_registro_key` en sus objetos. Excluir esa columna de las respuestas de listado; el backend ya puede resolverla desde la ruta de recibo usando el ID.
- **Mantener la respuesta segura:** conservar `Content-Type: application/pdf`, `Content-Disposition: inline`, `Cache-Control: private, no-store` y `X-Content-Type-Options: nosniff`. Revisar que los errores no filtren configuración, credenciales ni detalles internos de MinIO.
- **Configurar el proxy de producción:** publicar `/api` a través del mismo origen HTTPS del frontend o configurar CORS de forma explícita si se usan orígenes diferentes. No usar la configuración de proxy de desarrollo de Vite en producción.
- **Añadir pruebas de acceso y fallos:** comprobar que un administrador autorizado puede ver el PDF; un usuario anónimo/no autorizado recibe `401` o `403`; un ID o comprobante inexistente recibe `404`; y una caída de MinIO se informa sin exponer detalles internos.
- **Operación:** usar TLS, credenciales MinIO de servicio con permisos mínimos, rotación de credenciales, límites de solicitudes y registros de auditoría que no incluyan claves ni contenido del PDF.

## Prueba local

La ruta de lectura está habilitada únicamente para pruebas locales: requiere `ENABLE_LOCAL_RECEIPT_PREVIEW=true`, que `NODE_ENV` no sea `production` y una solicitud desde loopback. Reiniciar el backend después de cambiar su configuración. La petición del modal utiliza el proxy `/api` de Vite configurado para desarrollo.
