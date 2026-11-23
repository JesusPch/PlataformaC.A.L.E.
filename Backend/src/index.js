const app = require('./app');
const { sequelize } = require('./Models');

const PORT = process.env.PORT || 3000;

async function main() {
  try {
    // Verifica la conexión a PostgreSQL
    await sequelize.authenticate();
    console.log('Conexión a PostgreSQL establecida con éxito.');

    // En desarrollo crea las tablas que falten sin alterar ni borrar las existentes.
    if (process.env.DB_SYNC === 'true') {
      await sequelize.sync();
      console.log('Sincronización de tablas completada.');
    }

    // Inicia el servidor express
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo iniciar el backend (conexión o sincronización de la base de datos):', error);
  }
}

main();