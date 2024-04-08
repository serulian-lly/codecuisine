const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
app.set('view engine', 'ejs');


const app = express();
const port = 8084;

app.use(bodyParser.urlencoded({ extended: false }));


const sequelize = new Sequelize("codecuisine", "root", "aula", {
    host: 'localhost',
    dialect: 'mysql'
  });

db.connect((err) => {
    if (err) {
        console.error('Erro na conexão com o banco de dados:', err);
    } else {
        console.log('Conexão com o banco de dados estabelecida');
    }
});

// Rota para processar o formulário
app.post('/cadastro', (req, res) => {
    // ...

    const sql = 'INSERT INTO users (nome, email, telefone, senha, Confirmarsenha) VALUES (?, ?, ?, ?)';
    db.query(sql, [nome, email, telefone, senha, Confirmarsenha], (err, result) => {
      if (err) {
        console.error('Erro ao inserir dados no banco de dados:', err);
        res.send('Erro ao cadastrar usuário.');
      } else {
        // Redirecionar para a página "homee.html" após o envio bem-sucedido
        res.redirect('/pratos');
      }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
