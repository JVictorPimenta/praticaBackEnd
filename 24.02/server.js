import express from 'express';
import './database/sqlConnection.js'
const app = express();

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

const PORT = 3000

app.listen(PORT, () => console.log(`servidor rodando na porta ${PORT} http://localhost:${PORT}`))