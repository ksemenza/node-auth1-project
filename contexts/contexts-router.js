const express = require('express');

const Contexts = require('./contexts-model.js');

const router = express.Router();

router.get('/', (req, res) => {
    Contexts.findContexts()
        .then(contexts => {
            res.status(200).json(contexts);
        })
        .catch(err => {
            res.status(500).json({error: err, message: 'Failure to retrieve contexts'})
        });
});  



router.post('/', (req, res) => {
    Contexts.addContext(req.body)
        .then(response => {
            res.status(201).json(response);
        })
        .catch(err => {
            res.status(500).json({error: err, message: 'Failure to add context'});
        });
});

module.exports = router;