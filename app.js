const express = require('express');
const appCadastro = express();
const appPratos = express(); 
appCadastro.use(express.json());
appPratos.use(express.json());
const portCadastro = 8081;
const portPratos = 8082;
const Prato = require('./Prato');
const User = require('./models/User');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();

appCadastro.set('views', path.join(__dirname, 'public', 'views'));
appCadastro.use(express.static(path.join(__dirname, 'public', 'css')));
appCadastro.use(express.static(path.join(__dirname, 'public')));
appCadastro.use(express.static(path.join(__dirname, 'public', 'js')));
appCadastro.use(express.static(path.join(__dirname, 'public', 'img')));
appCadastro.use(express.static('img'));
appCadastro.use(express.static('css'));
appCadastro.use(bodyParser.urlencoded({ extended: false }));
appCadastro.set('view engine', 'ejs');

appPratos.set('view engine', 'ejs');
appPratos.set('views', path.join(__dirname, 'public', 'views'));
appPratos.use(express.static(path.join(__dirname, 'public', 'css')));
appPratos.use(express.static(path.join(__dirname, 'public', 'js')));
appPratos.use(express.static(path.join(__dirname, 'public', 'img')));
appPratos.use(express.static(path.join(__dirname, 'public')));
appPratos.use(express.static('public'));
appPratos.use(express.static('img'));
appPratos.use(express.static('css'));

// cadastro
appCadastro.get('/login', function (req, res) {
  res.render('login');
});

appCadastro.post('/login', async (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;


  if (!email || !senha) {
      // Certifique-se de que ambos os campos sejam preenchidos
      return res.status(400).json({ mensagem: 'E-mail e senha são obrigatórios' });
  }

  try {
      // Consulte o banco de dados para encontrar o registro do usuário com o e-mail fornecido
      const usuario = await User.findOne({ where: { email } });

      if (!usuario) {
          return res.status(401).json({ mensagem: 'E-mail não encontrado' });
      }
      // Compara senhas
      const senhasCorrespondentes = await bcrypt.compare(senha, usuario.senha);

      if (senhasCorrespondentes) {
          res.status(200).json({ mensagem: 'Login bem-sucedido' });
      } else {
          // Senha incorreta
          return res.status(401).json({ mensagem: 'Senha incorreta' });
      }
  } catch (error) {
      console.error('Erro ao fazer login:', error);
      return res.status(500).json({
          erro: true,
          mensagem: 'Erro ao fazer login',
          detalhes: error.message
      });
  }
});


appCadastro.get('/pratos', (req, res) => {
  Prato.findAll()
    .then((pratos) => {
      res.render('homee', { pratos });
    })
    .catch((err) => {
      console.error('Erro ao buscar pratos: ' + err.message);
      res.send('Erro ao buscar pratos.');
    });
});
appCadastro.get('/cadastro', function (req, res) {
  res.render('indexx');
});


appCadastro.post('/cadastro', async (req, res) => {
  const nome = req.body.nome;
  const email = req.body.email;
  const telefone = req.body.telefone;
  const senha = req.body.senha;
  const Confirmarsenha = req.body.Confirmarsenha;

  const sql = 'INSERT INTO users (nome, email, telefone, senha, Confirmarsenha) VALUES (?, ?, ?, ?, ?)';
  const errorMessages = [];

try {
const newUser = await User.create({
nome: nome,
email: email,
telefone: telefone,
senha: senha,
Confirmarsenha: Confirmarsenha
});

console.log('Usuário cadastrado com sucesso:', newUser);

} catch (error) {
console.error('Erro ao cadastrar usuário:', error);
return res.status(500).json({
erro: true,
mensagem: 'Erro ao cadastrar usuário.',
detalhes: error.message // Adicione detalhes do erro para depuração
});
}
});

// pratos

appPratos.get('/restaurante', function (req, res) {
  res.render('rest');
});

appPratos.get('/cadastrores', function (req, res) {
  res.render('cadastrores');
});


appPratos.post('/restaurante', async (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;


  if (!email || !senha) {
      // Certifique-se de que ambos os campos sejam preenchidos
      return res.status(400).json({ mensagem: 'E-mail e senha são obrigatórios' });
  }

  try {
      // Consulte o banco de dados para encontrar o registro do usuário com o e-mail fornecido
      const usuario = await User.findOne({ where: { email } });

      if (!usuario) {
          return res.status(401).json({ mensagem: 'E-mail não encontrado' });
      }
      // Compara senhas
      const senhasCorrespondentes = await bcrypt.compare(senha, usuario.senha);

      if (senhasCorrespondentes) {
          res.status(200).json({ mensagem: 'Login bem-sucedido' });
      } else {
          // Senha incorreta
          return res.status(401).json({ mensagem: 'Senha incorreta' });
      }
  } catch (error) {
      console.error('Erro ao fazer login:', error);
      return res.status(500).json({
          erro: true,
          mensagem: 'Erro ao fazer login',
          detalhes: error.message
      });
  }
});

appPratos.post('/cadastrores', async (req, res) => {
  const nome = req.body.nome;
  const email = req.body.email;
  const telefone = req.body.telefone;
  const senha = req.body.senha;
  const Confirmarsenha = req.body.Confirmarsenha;

  const sql = 'INSERT INTO rests (nome, email, telefone, senha, Confirmarsenha) VALUES (?, ?, ?, ?, ?)';
  const errorMessages = [];

try {
const newRest = await Rest.create({
nome: nome,
email: email,
telefone: telefone,
senha: senha,
Confirmarsenha: Confirmarsenha
});

console.log('rest cadastrado com sucesso:', newRest);

} catch (error) {
console.error('Erro ao cadastrar usuário:', error);
return res.status(500).json({
erro: true,
mensagem: 'Erro ao cadastrar usuário.',
detalhes: error.message // Adicione detalhes do erro para depuração
});
}
});

appPratos.set('view engine', 'ejs');
appPratos.use(express.urlencoded({ extended: false }));

appPratos.get('/pratos', (req, res) => {
  Prato.findAll()
    .then((pratos) => {
      res.render('homee', { pratos });
    })
    .catch((err) => {
      console.error('Erro ao buscar pratos: ' + err.message);
      res.send('Erro ao buscar pratos.');
    });
});

appPratos.get('/', (req, res) => {
  Prato.findAll()
    .then((pratos) => {
      res.render('index', { pratos });
    })
    .catch((err) => {
      console.error('Erro ao buscar pratos: ' + err.message);
      res.send('Erro ao buscar pratos.');
    });
});


appPratos.post('/adicionar-prato', (req, res) => {
  const { nome, descricao, preco, imagem, gluten, vegano, lactose } = req.body;

  Prato.create({ nome, descricao, preco, imagem, gluten, vegano, lactose })
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
        console.error('Erro ao buscar pratos: ' + err.message);
        res.status(500).send('Erro ao buscar pratos: ' + err.message);
     });     
});

appCadastro.listen(8081, () => {
  console.log('Servidor conectado: http://localhost:8081');
});

appPratos.listen(portPratos, () => {
  console.log('Aplicativo de pratos conectado: http://localhost:8082' + portPratos);
});