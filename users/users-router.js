const express = require('express');
const bcrypt = require('bcryptjs');
const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');
const restrictedRouter = require('./restricted-router.js');

const router = express.Router();

router.use('/restricted', restrictedRouter);

router.get('/users', restricted, (req, res) => {
    Users.findUsers()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({error: err, message: 'Failure to retrieve users'})
        });
});  
    

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;
    Users.addUser(user)
        .then(saved => res.status(201).json(saved))
        .catch(err => {
            res.status(500).json({error: err, message: 'Failure to add user'})
        });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;
    Users.findUserByUsername(username)
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                //create a new session for the user
                // and send cookie that contains the user id
                req.session.user = user;
                //console.log(req.session.user);
                
                res.status(200).json({message: 'Logged in successfully', user_id: user.id})
            } else {
                res.status(401).json({message: 'Invalid credentials. You shall not pass!'})
            }
        })
        .catch(err => {
            res.status(500).json({error: err, message: 'Failure to log in'})
        });
});

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.json({error: err, message: "Logout error"})
            } else {
                res.status(200).json({message: "Successful logout"});
            }
        })
    } else {
        res.status(200).json({message: "No session found"})
    }
});

router.get('/users/:id/contexts', restricted, (req, res) => {
    Users.findUsersContexts(req.params.id)
        .then(response => {
            console.log(response);
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err, message: `Unable to retrieve contexts for user ${req.params.id}`});
        });
});

module.exports = router;