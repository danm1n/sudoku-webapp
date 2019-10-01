const jwt = require('jsonwebtoken');
const config = require('../config/config');
module.exports = (req,res,next) => {
    let header = req.headers['authorization'];
    if(typeof header !== 'undefined'){
    let bearer = header.split(':')
    var username = jwt.verify(bearer[1],config.secret).username;
     req.user = username
     req.token = bearer[1]
     next();
    }else{
        res.sendStatus(403)
    }
}