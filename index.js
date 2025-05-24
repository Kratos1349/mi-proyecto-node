require('dotenv').config();
const express = require('express');
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSTypeorm = require('@adminjs/typeorm');
const { DataSource } = require('typeorm');

AdminJS.registerAdapter(AdminJSTypeorm);

const app = express();
const PORT = process.env.PORT || 3000;

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,           // turntable.proxy.rlwy.net
  port: parseInt(process.env.DB_PORT, 10),  // 59449
  username: process.env.DB_USER,       // root
  password: process.env.DB_PASSWORD,   // ZEDwTBWcIDudiwlYuCYHuZjklSPgSKeZ
  database: process.env.DB_NAME,       // railway
  entities: [],
  synchronize: false,  // no cambiar a true en producción
});

AppDataSource.initialize()
  .then(() => {
    console.log('Conectado a la base de datos con TypeORM');

    const adminJs = new AdminJS({
      databases: [AppDataSource],
      rootPath: '/admin',
    });

    const adminRouter = AdminJSExpress.buildRouter(adminJs);
    app.use(adminJs.options.rootPath, adminRouter);

    app.get('/', (req, res) => {
      res.send('API funcionando con AdminJS y TypeORM');
    });

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
      console.log(`AdminJS disponible en http://localhost:${PORT}/admin`);
    });

  })
  .catch((error) => console.log('Error al conectar con la base:', error));
