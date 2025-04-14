const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const morgan = require('morgan');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Configurações do MongoDB
const mongoHost = process.env.MONGODB;
const mongoPort = 27017;
const mongoDatabase = 'mydb';

// Middleware para exibir o stdout das requisições
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.render('index', { message: null, error: null });
});

app.post('/users', async (req, res) => {
  try {
    const { nome, idade, sexo, email } = req.body;

    const client = await MongoClient.connect(`mongodb://${mongoHost}:${mongoPort}`);
    const db = client.db(mongoDatabase);

    // Verifica se o usuário já está cadastrado
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      client.close();
      return res.render('index', { message: null, error: 'E-mail de usuário já cadastrado' });
    }

    // Insere o novo usuário no banco de dados
    await db.collection('users').insertOne({ nome, idade, sexo, email });

    client.close();

    res.render('index', { message: 'Usuário cadastrado com sucesso', error: null });

  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.render('index', { message: null, error: 'Erro ao cadastrar usuário' });
  }
});

app.listen(port, () => {
  console.log(`Aplicativo rodando em http://localhost:${port}`);
});
