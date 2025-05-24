require('dotenv').config();
const express = require('express');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

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
});
