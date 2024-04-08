const Sequelize=require('sequelize');
const db = require('./db');
const bcrypt = require('bcrypt');
const User= db.define('users', {
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

User.beforeCreate(async (user) => {
    const saltRounds = 10; // Número de rounds de salt (aumente se desejar maior segurança)
    const hashedPassword = await bcrypt.hash(user.senha, saltRounds);
    user.senha = hashedPassword;
  }); 

User.sync();

module.exports=User;