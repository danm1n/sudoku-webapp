const jwt = require('jsonwebtoken');
const config = require('../config/config');
module.exports = (req, res, next) => {
    if(config.testing === true){
        //--bypass token authentication--
        req.user = "Test Account"
        next();
    }else{
    try {
        let header = req.headers['authorization'];
        if (typeof header !== 'undefined') {
        let bearer = header.split(':')
            var username = jwt.verify(bearer[1], config.secret).username;
            req.user = username
            req.token = bearer[1]
            next();
        } else {
            res.sendStatus(403)
        }
    } catch (err) {
        res.json({
            status: "error",
            error: err.stack
        })
    }
}
}