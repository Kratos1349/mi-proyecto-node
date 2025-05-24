const AdminJS = require('adminjs')
const { default: AdminJSExpress } = require('@adminjs/express');
const AdminJSTypeORM = require('@adminjs/typeorm')
const express = require('express')
const AppDataSource = require('./data-source')
const Usuario = require('./entity/Usuario')
require('dotenv').config()

AdminJS.registerAdapter({
  Resource: AdminJSTypeORM.Resource,
  Database: AdminJSTypeORM.Database,
})

const start = async () => {
  await AppDataSource.initialize()

  const admin = new AdminJS({
    resources: [
      { resource: Usuario }
    ],
    rootPath: '/admin',
  })

  const app = express()
  const router = AdminJSExpress.buildRouter(admin)
  app.use(admin.options.rootPath, router)

  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`Admin corriendo en http://localhost:${PORT}${admin.options.rootPath}`)
  })
}

start()
