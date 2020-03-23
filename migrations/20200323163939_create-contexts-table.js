
exports.up = function(knex) {
    return knex.schema.createTable('contexts', tbl => {
        tbl.increments();
        tbl.string('name', 24).notNullable().index();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('contexts');
};
