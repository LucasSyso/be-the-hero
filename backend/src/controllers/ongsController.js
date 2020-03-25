const connection = require('../database/connection');
const crypto = require('crypto');

//Este arquivo controller é o que possui as funções que tem contato com banco de dados
module.exports = {
    async index(request, response){
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(request, response){
        //Para armazenar cada valor em sua variável específica, basta colocar o nome dos campos entre chaves
        const {name, email, whatzapp, city, uf} = request.body;

        //Gerando o id pela aplicação
        const id = crypto.randomBytes(4).toString('HEX');

        //A palavra await indica que, quando o node chegar nesta parte do código, ele irá aguardar a sua execução terminar para continuar
        await connection('ongs').insert({
            id, 
            name,
            email,
            whatzapp,
            city,
            uf
        })

        return response.json({id});
    }
}