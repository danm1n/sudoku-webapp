const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config')
const saltRounds = 10;
module.exports = (login, signup) => {
    

    let createUser = async (req,res) => {
        let {inputName, inputEmail, inputPassword, confirmPassword} = req.body
        if(inputPassword === confirmPassword){
            bcrypt.hash(req.body.inputPassword, saltRounds, async function (err, hash) {
            await signup.createAccount(inputName, inputEmail, hash);
            });
            res.redirect('/')
        }else{
            res.json({
                data: "Passwords do not match."
            })
        }
    }
    
    let auth = async (req,res) => {
        let {inputEmail, inputPassword} = req.body
        console.log(inputEmail)
        const user = await login.authUser(inputEmail);
        // console.log()
        if (user) {
            const match = await bcrypt.compare(inputPassword, user.password);
            if (match === true) {
                    const token = jwt.sign({username: user.username}, config.secret, { expiresIn: config.tokenLife})
                    res.json({
                        status: 'success',
                        data: 'Token created',
                        token,
                    });
            }else{
                res.json({
                    status: 'faliure',
                    data: "Login details incorrect.",
                })
            }
        }
    }

    const check = (req,res) => {
        let { token } = req.body
        // console.log(token)
        if(token){
        var verifiedJwt = jwt.verify(token,config.secret);
        console.log(verifiedJwt)
        res.json({
            status:'success',
            response: true
        });
    }else{
        res.json({
            status:'No Token',
        });
    }
    }

    const userData = async (req,res) => {
        // const user = await login.authUser();
        res.json({
            status: 'success',
        });
    }

   
    return{
        createUser,
        check,
        auth
    }
}