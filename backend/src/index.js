//Comando para importar bibliotecas
const express = require('express');
const cors = require('cors');

//Aqui é usado o ./ para dizer ao Node que estou importando um arquivo e não um pacote
//O ./ serve para referenciar a mesma pasta do index.js
const routes = require('./routes');

const app = express();

app.use(cors());

//Configurando a aplicação para entender Json
app.use(express.json());
app.use(routes);

//Configurando a aplicação para ser chamada pela porta 3333
app.listen(3333);