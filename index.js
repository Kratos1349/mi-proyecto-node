require('dotenv').config();
const express = require('express');
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSMysql = require('@adminjs/mysql2');
const db = require('./db');

AdminJS.registerAdapter(AdminJSMysql);

const app = express();
const PORT = process.env.PORT || 3000;

const adminJs = new AdminJS({
  databases: [db],
  rootPath: '/admin',
});

const adminRouter = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, adminRouter);

// Ruta de ejemplo para consultar la hora
app.get('/', (req, res) => {
  db.query('SELECT NOW() AS ahora', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error en la base de datos');
    }
    res.send(`Hora en la base de datos: ${results[0].ahora}`);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`AdminJS disponible en http://localhost:${PORT}/admin`);
});
