const Sequelize = require('sequelize');

const sequelize = new Sequelize("codecuisine", "root", "aula", {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => {
    console.log("Conexão bem-sucedida ao banco de dados");
  })
  .catch((err) => {
    console.error('Erro de conexão com o banco de dados: ' + err.message);
  });

module.exports = sequelize;