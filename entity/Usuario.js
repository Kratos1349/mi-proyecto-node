const { EntitySchema } = require('typeorm')

module.exports = new EntitySchema({
  name: 'Usuario',
  tableName: 'usuarios', // nombre real de tu tabla en MySQL
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    nombre: {
      type: 'varchar'
    },
    email: {
      type: 'varchar'
    }
  }
})
