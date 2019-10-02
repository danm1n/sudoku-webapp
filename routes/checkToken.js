const jwt = require('jsonwebtoken');
const config = require('../config/config');
module.exports = (req, res, next) => {
    let header = req.headers['authorization'];
    let bearer = header.split(':')
    try {
        if (typeof header !== 'undefined') {
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
            error: err
        })
    }
}