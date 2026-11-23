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
