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

app.post("/alunos", (req, res) => {
    const { nome, idade, matricula } = req.body;
    const id = alunos.length + 1;

    alunos.push({ id, nome, idade, matricula});
    res.status(201).location(`/alunos/${id}`).send();
})


app.put("/alunos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const aluno = alunos.find((aluno) => aluno.id === id);

    if (aluno) {
        const { nome, idade, matricula } = req.body;
        aluno.nome = nome;
        aluno.idade = idade;
        aluno.matricula = matricula;
        res.status(200).send("Mudança concluida");
    } else {
        res.status(404).send("Aluno não existe")
    }
})

app.patch("/alunos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const aluno = alunos.find((aluno) => aluno.id === id);

    if (aluno) {
        const { nome, idade, matricula } = req.body;

        if (nome !== undefined) aluno.nome = nome;
        if (idade !== undefined) aluno.idade = idade;
        if (matricula !== undefined) aluno.matricula = matricula;

        res.status(200).send("Dados atualizados com sucesso!");
    } else {
        res.status(404).send("Aluno não encontrado");
    }
})

app.delete("/alunos/:id", (req, res) => {
    const id = parseInt(req.params.id); 
    const index = produtos.findIndex((aluno) => aluno.id === id); 

      if(index !== -1) { 
        alunos.splice(index, 1) 
        res.status(200).send();
      } else {
        res.status(404).send();
      }
  })




app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});