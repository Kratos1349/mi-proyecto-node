const { DataSource } = require('typeorm')
const path = require('path')
require('dotenv').config()

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [path.join(__dirname, '/entity/*.js')],
  synchronize: true, // en producción pon esto en false y usa migraciones
})

module.exports = AppDataSource
