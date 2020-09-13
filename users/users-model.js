module.exports = {
    addUser,
    findUserById,
    findUserByUsername,
    findUsers,
    findUsersContexts
}

const db = require('../data/db-config.js');

function addUser(newUser) {
    return db('users')
        .insert(newUser)
        .then(ids => {
            return findUserById(ids[0]);
        });
}

function findUserById(user_id) {
    return db('users')
        .where({ id: user_id })
        .first();
}

function findUserByUsername(submitted_username) {
    return db('users')
        .where({ username: submitted_username})
        .first();
}

function findUsers() {
    return db('users')
        .select('users.id', 'users.username');
}

function findUsersContexts(user_id) {
    return db('user-context')
        .join('users', 'users.id', 'user-context.user_id')
        .join('contexts', 'contexts.id', 'user-context.context_id')
        .where({'user-context.user_id': user_id})
        .select('users.username', 'contexts.name')
}

