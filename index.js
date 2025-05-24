const db = require('./db');

db.query('SELECT NOW() AS ahora', (err, results) => {
  if (err) throw err;
  console.log('Hora en la base de datos:', results[0].ahora);
  process.exit();
});
