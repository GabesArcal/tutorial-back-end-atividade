import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 4001;

app.use(cors())

app.use(bodyParser.json())

const alunos = [
    {
      id: 1,
      nome: "Vinicius",
      idade: 3, 
      matricula: 150
    },
    {
      id: 2,
      nome: "Felipe",
      idade: 8,
      matricula: 251
    },
    {
      id: 3,
      nome: "Guilherme",
      idade: 10,
      matricula: 202
    },
];

app.get('/', (req, res) => {
res.send('Olá!');
});

// Criamos uma rota simples que retorna uma mensagem de boas-vindas
app.get("/alunos", (req, res) => {
    res.send(alunos);
});

app.get("/alunos/:id", (req, res) => {

    const id = parseInt(req.params.id);
    const aluno = alunos.find((aluno) => aluno.id === id );

    if (aluno) {
        res.json(aluno);
    } else {
        res.status(404).json({ error: "Aluno não encontrado"})
    }
});



// Iniciamos o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});