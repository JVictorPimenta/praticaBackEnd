import express from 'express';
import {connect} from './database/sqlConnection.js';
import Task from './models/Task.js';
import taskRouter from './routes/taskRoutes.js';
import './.env'

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use('/tasks', taskRouter)

app.get("/", (req, res) => {
    res.send('<h1> servidor node ativo :D <h1/>',

        '<button>oi<button/>'
    );
});

app.get("/tasks", async (req, res) => {
  try {
    await sequelize.sync({ force: true }); // recria tabelas
    console.log("✅ Tabelas sincronizadas!");

    const tas = await Task.create({
      title: "lavar a alma",
      completed: false,
      description: "lave a alma",
      tasksId: tas.id
    });

    await Product.create({
      title: "lavar o chao",
      completed: true,
      tasksId: tas.id
    });

    await Product.create({
      title: "lavar a louca",
      completed: false,
      tasksId: tas.id
    });

    res.json({ message: "Dados criados!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao sincronizar" });
  }
});

app.listen(3000, async () => {
  await connect();
  console.log("🚀 Servidor rodando em http://localhost:3000");
});