
exports.up = function(knex) {
    return knex.schema.createTable('tbl_img' , function(table){
        table.increments();
        table.string('url_img');
        table.string('descripsi');
        table.timestamps(true , true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('tbl_img');  
  
};
