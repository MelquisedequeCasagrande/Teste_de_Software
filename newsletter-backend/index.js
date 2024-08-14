const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Configuração da conexão MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'XXXX', // substitua com o usuário do seu MySQL
  password: 'XXXXXXXX', // substitua com a senha do seu MySQL
  database: 'newsletter'
});

// Conectando ao banco de dados MySQL
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL');
});

// Rota para inscrever um e-mail
app.post('/subscribe', (req, res) => {
  const { email } = req.body;

  const query = 'INSERT INTO emails (email) VALUES (?)';

  db.query(query, [email], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'Este e-mail já está inscrito.' });
      }
      return res.status(500).json({ message: 'Erro ao processar sua inscrição.' });
    }
    res.status(201).json({ message: 'Inscrição realizada com sucesso!' });
  });
});

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
