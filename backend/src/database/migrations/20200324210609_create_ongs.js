//Função responsável pela criação da tabela
exports.up = function(knex) {
  return knex.schema.createTable('ongs', function(table){
      table.string('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('whatzapp').notNullable();
      table.string('city').notNullable();
      table.string('uf').notNullable();
  })
};

//Função responsável para executar o script caso ocorra algum proglema
exports.down = function(knex) {
    return knex.dropTable('ongs');
};
