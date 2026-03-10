import express from 'express';
import './database/sqlConnection.js';
// import taskRouter from './routes/taskRoutes.js';
import './.env'

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
// app.use('/tasks', taskRouter)

app.get("/", (req, res) => {
    res.send('<h1> servidor node ativo :D <h1/>',

        '<button>oi<button/>'
    );
});

app.listen(3000, async () => {
  await connect();
  console.log("🚀 Servidor rodando em http://localhost:3000");
});