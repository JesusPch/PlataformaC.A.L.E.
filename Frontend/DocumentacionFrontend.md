# Frontend

Aplicación web del sistema. El proyecto se crea aquí dentro, en esta misma carpeta
(por ejemplo con Vite), después de clonar el repositorio.

Trabajan en esta carpeta: Elian, Alberto y Nescafé.

## Pendiente de documentar

- Cómo levantar el proyecto en local.
- Dirección del backend a la que se conecta.


---

### Cómo levantar el proyecto.

Para la parte de Frontend estaremos utilizando Vite.js y React.

Escribimos en la terminal

```bash
npm create vite@latest
```

Nos va a pedir:
* Nombre del proyecto: frontend-cale.
* Selección del framework: React.
* Select a Variant: JavaScript + React.
* Oxlint.

Cuando termine de crear el proyecto usamos los siguientes comandos en la terminal:

```bash
cd frontend-cale
npm install
```

Para ejecutar el proyecto.

```bash
npm run dev
```

### Librerias a usar:

#### styled-components:
Vamos a usar la libreria de `styled-components` para crear componentes React con estilos aplicados directamente en el mismo archivo de JavaScript.

Los `styled-components` nos van a permitir cambiar los estilos basados en las props del componente o estado de React, los estilos van a estar ligados directamente al componente, evitan que clases de CSS afecten a otros elementos y sobre todo nos provee de un facil mantenimiento ya que no tendremos que saltar entre archivos `.css` o `.js`, teniendo un flujo mas lineal.

Para instalarlo ejecutamos el comando en la terminal:
```bash
npm install styled-components
``` 

Creamos un directorio llamado `styles` dentro de ese directorio un archivo `styled.js` para ir agregando en ese archivo todos los componentes que vayamos a estar utilizando para poder utilizar `styled-components` es nuestro archivo de JavaScript hacemos su respectiva importacion

```js
import styled from 'styled-components';
```

#### React Router:
Utilizaremos React-Router para crear rutas de navegacion dentro de una app React SPA.
Nos va a ser de utilidad para diseñar el panel de navegación de alumnos y administrador.
Tenemos que seguir el siguiente flujo:
1. Instalar la libreria React-Router
```bash
npm install react-router-dom
```
2. Envolver app con BrowserRouter
3. Definir rutas con Routes y Route
4. Leer parámetro con useParams()
5. Cambiar escena con useNavigate()
6. Sincronizar la escena con la URL mediante useEffect()

---

### Componentes     