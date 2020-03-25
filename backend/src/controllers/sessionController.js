const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        //Buscando o ID da ong pelo corpo da requisição
        const {id} = request.body;

        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();

        //!ong é igual a ong != null
        if(!ong){
            //O status 400 é igual a Bad Request
            return response.status(400).json({error: 'no ONG found with this ID'});
        }

        return response.json(ong);
    }
}