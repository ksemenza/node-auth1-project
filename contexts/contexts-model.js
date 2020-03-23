module.exports = {
    addContext,
    findContextById,
    findContextByName,
    findContexts
}

const db = require('../data/db-config.js');

function addContext(newContext) {
    return db('contexts')
        .insert(newContext)
        .then(ids => {
            return findContextById(ids[0]);
        });
}

function findContextById(context_id) {
    return db('contexts')
        .where({ id: context_id })
        .first();
}

function findContextByName(submitted_name) {
    return db('contexts')
        .where({ username: submitted_name})
        .first();
}

function findContexts() {
    return db('contexts')
        .select('contexts.id', 'contexts.name');
}
