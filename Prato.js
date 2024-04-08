const Sequelize = require('sequelize');
const db = require('./db');

const Prato = db.define('pratos', {
  // Seus campos existentes
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  preco: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  imagem: {
    type: Sequelize.STRING, // Tipo de dados para a URL da imagem
},
  gluten: {
    type: Sequelize.BOOLEAN,
  },
  vegano: {
    type: Sequelize.BOOLEAN,
  },
  lactose: {
    type: Sequelize.BOOLEAN,
  }
});

Prato.sync()
  .then(() => {
    console.log('Tabela de pratos sincronizada com sucesso');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar tabela de pratos: ' + err.message);
  });

module.exports = Prato;
