import express from 'express';
import { connect, sequelize } from './models/index.js'
import Category from './models/category.js';
import Product from './models/Product.js';
import './database/sqlConnection.js';

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send('<h1> servidor node ativo :D <h1/>');
});

app.get('/hello', (req,res) => {
    res.send({message: 'Hello world!'})})

app.get('/info', (req, res) => {
    res.send({
        curso: 'Desenvolvimento de Sistemas',
        modulo: 'backEnd',
        versao: 1.0
    })
})

// Rota para sincronizar o banco e criar dados
app.get("/sync", async (req, res) => {
  try {
    await sequelize.sync({ force: true }); // recria tabelas
    console.log("✅ Tabelas sincronizadas!");

    const cat = await Category.create({
      name: "Eletrônicos",
      description: "Dispositivos e tecnologia"
    });

    await Product.create({
      name: "Notebook Gamer",
      price: 8500.0,
      categoryId: cat.id
    });

    await Product.create({
      name: "Mouse Wireless",
      price: 250.0,
      categoryId: cat.id
    });

    res.json({ message: "Banco sincronizado e dados criados!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao sincronizar" });
  }
});

// Rota para listar categorias com produtos
app.get("/categories", async (req, res) => {
  const categories = await Category.findAll({ include: "products" });
  res.json(categories);
});

app.listen(3000, async () => {
  await connect();
  console.log("🚀 Servidor rodando em http://localhost:3000");
});