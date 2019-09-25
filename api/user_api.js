const bcrypt = require('bcrypt');
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
        
        const user = await login.authUser(inputEmail);
        if (user) {
            const match = await bcrypt.compare(inputPassword, user.password);
            if (match === true) {
            res.redirect('/#/home')
            }else{
                res.json({
                    data: "Login details incorrect."
                })
            } 
        }
    }

   
    return{
        createUser,
        auth
    }
}