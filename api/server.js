const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

const dbConnection = require('../data/db-config.js')

const sessionConfig = {
    name: "donkey",
    secret: "Shrek meets Winnie the Pooh meets Wind in the Willows",
    cookie: {
        maxAge: 1000 * 60,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false, //change to false for production,
    store: new knexSessionStore({
        knex: dbConnection,
        tablename: 'sessions',
        sidfieldname: 'sid',
        createTable: true,
        clearInterval: 60000
    })
};

const UsersRouter = require('../users/users-router.js');
const ContextsRouter = require('../contexts/contexts-router.js');

const server = express();

server.use(session(sessionConfig));
server.use(express.json());
server.use(helmet());
server.use(morgan('tiny'));
server.use(cors());

server.use('/api/contexts' , ContextsRouter);

server.use('/api', UsersRouter);

module.exports = server;