const Sequelize=require('sequelize');
const db = require('./db');
const bcrypt = require('bcrypt');
const Rest= db.define('rests', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey: true
    },
    nome:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    email:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    telefone:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    senha:{
        type: Sequelize.STRING,
        allowNull:false
    },
    Confirmarsenha:{
        type: Sequelize.STRING,
        allowNull:false
    }
});

Rest.beforeCreate(async (rest) => {
    const saltRounds = 10; // Número de rounds de salt (aumente se desejar maior segurança)
    const hashedPassword = await bcrypt.hash(rest.senha, saltRounds);
    rest.senha = hashedPassword;
  }); 

Rest.sync();

module.exports=Rest;