const Users = require('../users/users-model.js');
const bcrypt = require('bcryptjs');


module.exports = function restricted(req, res, next) {
 
    //Client must put username and password in headers
    /*
    const { username, password } = req.headers;
    if (username && password) {
        Users.findUserByUsername(username)
            .then(user => {
                if (user && bcrypt.compareSync(password, user.password)) {
                    next();
                } else {
                    res.status(401).json({message: 'Invalid credentials. You shall not pass!'})
                }
            })
            .catch(err => {
                res.status(500).json({error: err, message: 'Unable to retrieve user'})
            });
    } else {
        res.status(400).json({message: 'Please provide valid credentials'});
    }
*/

    //Uses the cookie instead:

   if (req.session && req.session.id) {
       next();
   } else if (!req.session) {
       console.log('no session found');
       res.status(401).json({message: 'no session found'});
   } else {
       console.log('session is invalid');
       res.status(401).json({message: 'session is invalid'});
   }

}
