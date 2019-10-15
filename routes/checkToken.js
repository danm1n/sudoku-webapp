const jwt = require('jsonwebtoken');
const config = require('../config/config');
module.exports = (req, res, next) => {
    if(config.testing === true){
        //--bypass token authentication(for testing purposes)--
        req.user = "Test Account"
        next();
    }else{
    try {
        let header = req.headers['authorization'];
        if (typeof header !== 'undefined') {
        let bearer = header.split(':')
            var { username,admin } = jwt.verify(bearer[1], config.secret)
            req.user = username
            req.isAdmin = admin
            req.token = bearer[1]
            if(req.path.includes('admin')){
                if(admin) next(); else{
                    res.sendStatus(403) 
                }
            }else{next();}
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