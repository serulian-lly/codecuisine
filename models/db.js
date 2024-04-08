const Sequelize = require('sequelize');

const sequelize = new Sequelize("codecuisine", "root", "aula", {
    host: 'localhost',
    dialect: 'mysql'
  });
  sequelize.authenticate()
  .then(function () {
    console.log("cer");
  }).catch(function () {
    console.log("err");
  })

  module.exports=sequelize;

  