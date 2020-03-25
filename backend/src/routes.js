const express = require('express');
const ongController = require('./controllers/ongsController');
const incidentsController = require('./controllers/incidentsController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

const routes = express.Router();

//Criando uma rota para retornar todas as ongs cadastradas
routes.get('/ongs', ongController.index);

/*
Configurando uma rota para a aplicação - Neste caso, a rota principal
Passando uma função como segundo parâmetro
Essa função sempre recebe dois parâmetros request e response

    Existem parâmetros que podemos passar para a nossa requisição:
    QUERY Params: São parâmetros nomeados e enviados na rota após o símbolos de ?
           São usados geralmente para filtros e paginação.
    ROUTE Params: São parâmetros usados para identificar um único recurso(resources)
    Request Body: O corpo da requisição, utilizado para criar ou alterar recursos.
*/
routes.post('/ongs', ongController.create);

routes.post('/incidents', incidentsController.create);
routes.get('/incidents', incidentsController.index);    
routes.delete('/incidents/:id', incidentsController.delete);

routes.get('/profile', profileController.index);

routes.post('/sessions', sessionController.create);

//Exportando a variável routes para ser usada fora desse arquivo
//Esse arquivo será usado sendo importado em outro arquivo
module.exports = routes;