const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.connect()
  .then(() => console.log(`✅ Conectado ao PostgreSQL com sucesso, https://localhost:3000`))
  .catch(err => console.error('❌ Erro ao conectar no banco:', err.message));

module.exports = pool;