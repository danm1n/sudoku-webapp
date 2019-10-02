const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config')
const saltRounds = 10;
module.exports = (login, signup) => {
    

    let createUser = async (req,res) => {
        let {inputName, inputUsername, inputPassword, confirmPassword} = req.body
        if(inputPassword === confirmPassword){
            bcrypt.hash(req.body.inputPassword, saltRounds, async function (err, hash) {
            await signup.createAccount(inputName, inputUsername, hash);
            });
            res.redirect('/')
        }else{
            res.json({
                data: "Passwords do not match."
            })
        }
    }
    
    let sign_in = async (req,res) => {
        let {inputUsername, inputPassword} = req.body
        const user = await login.authUser(inputUsername);
        console.log(user)
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

    const verify = (req,res) => {
        let { token } = req.body
        if(token){
        let verifiedJwt = jwt.verify(token,config.secret);
        //--------------add try and catch
        res.json({
            status:'Token Verified',
            response: true,
            client_id: verifiedJwt.username
        });
    }else{
        res.json({
            status:'No Token',
            response:false
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
        verify,
        sign_in
    }
}