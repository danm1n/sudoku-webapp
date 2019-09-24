module.exports = (login, signup) => {
    
    let createUser = async (req,res) => {
        let {inputName, inputEmail, inputPassword, confirmPassword} = req.body
        if(inputPassword === confirmPassword){
            await signup.createAccount(inputName, inputEmail, inputPassword, confirmPassword)
        }else{
            res.json({
                data: "Passwords do not match."
            })
        }
    }
    
    let auth = (req,res) => {
        let {inputEmail, inputPassword} = req.body
        console.log(inputEmail)       
    }

   
    return{
        createUser,
        auth
    }
}