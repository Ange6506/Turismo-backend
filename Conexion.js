require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT), // IMPORTANTE pasar a número
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectTimeout: 10000, // 10 segundos
});

db.connect(err => {
  if (err) throw err;
  console.log('Conectado a MySQL');
});

module.exports = db;
