const knex = require('knex');
const configuration = require('../../knexfile');

//Escolhendo, no momento, a configuração de desenvolvimento
const connection = knex(configuration.development);

module.exports = connection;