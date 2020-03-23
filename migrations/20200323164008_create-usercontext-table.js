
exports.up = function(knex) {
    return knex.schema.createTable('user-context', tbl => {
        tbl.increments();
        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users');
        tbl.integer('context_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('contexts');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user-context');
};
