const Sequelize = require('sequelize');
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost:5432/TasksApp',
  {
    logging: false,
  }
);

const Task = db.define('task', {
  taskContent: {
    type: Sequelize.STRING,
    allowEmpty: false,
    allowNull: false,
  },
  complete: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = { db, Task };
