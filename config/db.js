const { Sequelize, Model, DataTypes } = require('sequelize');


const db = new Sequelize('uptasknode', 'jose', 'Temporal32', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    operatorsAliases: false,
    define: {
        timestamps: false
    },

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    storage: 'path/to/database.sqlite'
});


module.exports = db;
