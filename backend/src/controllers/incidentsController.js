const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        //Coloca a variável entre colchetes para pegar a primeira posição do array
        const [count] = await connection('incidents')
            .count();

        //Buscando o parâmetro query chamado page. Seu valor padrão é 1
        const {page = 1} = request.query;

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)//Linha criada para fazer com que retorne os registros pulando de cinco em cinco
            .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatzapp', 'ongs.city', 'ongs.uf']);

        response.header('x-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response){
        const {title, description, value} = request.body;
        const ong_id = request.headers.authorization; 

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        //NEste caso, foram colocadas chaves em volta da variável para que o frontEnd saiba que o nome do campo é id e não retorne somente o resultado do ID
        return response.json({id});
    },

    async delete(request, response){
        const {id} = request.params;
        const ong_id = request.headers.authorization; 

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id').first();

        if(incident.ong_id != ong_id){
            //O Status Http 401 significa 'Not outhorized'
            return response.status(401).json({error: 'Operation not permited.'});
        }

        await connection('incidents').where('id', id).delete();

        //O status 204 é uma responsta ao frontEnd que significa 'No content'
        return response.status(204).send();
    }
};