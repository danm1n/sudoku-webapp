const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config')
const saltRounds = 10;
module.exports = (login, signup, update_user,logger) => {


    let createUser = async (req, res) => {
        let { inputName, inputUsername, inputPassword, confirmPassword } = req.body
        logger.log_it(`${inputName}/${inputUsername}`,'creating an account')
        if (inputPassword === confirmPassword) {
            bcrypt.hash(req.body.inputPassword, saltRounds, async function (err, hash) {
                let checkUser = await signup.createAccount(inputName, inputUsername, hash);
                if (checkUser === true) {
                    res.json({
                        status: "success",
                        createUser: checkUser,
                        reason: "User account created."
                    });
                } else {
                    res.json({
                        status: "failure",
                        createUser: checkUser,
                        reason: "Username already exists."
                    });
                }
            });
        } else {
            res.json({
                status: "failure",
                reason: "Passwords do not match."
            })
        }
    }

    let sign_in = async (req, res) => {
        let { inputUsername, inputPassword } = req.body
        const user = await login.authUser(inputUsername);
        if (user) {
            const match = await bcrypt.compare(inputPassword, user.password);
            if (match === true) {
                await logger.log_it(inputUsername,'logged in')
                const token = jwt.sign({ username: user.username, admin:user.admin }, config.secret, { expiresIn: config.tokenLife })
                res.json({
                    status: 'success',
                    data: 'Token created',
                    token,
                });
            } else {
                res.json({
                    status: 'failure',
                    data: "Password is incorrect.",
                });
            }
        } else {
            res.json({
                status: 'failure',
                data: "User does not exist.",
            })
        }
    }

    const verify = async (req, res) => {
        let { token } = req.body
        try {
            if (token) {
                let verifiedJwt = jwt.verify(token, config.secret);
                await logger.log_it(verifiedJwt.username, 'token checked')
                res.json({
                    status: 'Token Verified',
                    response: true,
                    client_id: verifiedJwt.username
                });
            } else {
                res.json({
                    status: 'No Token',
                    response: false
                });
            }
        }
        catch (err) {
            res.json({
                status: 'Token Invalid',
                response: false,
                error: err
            });
        }
    }

    const userData = async (req, res) => {
        const user = await login.authUser(req.user);
        res.json({
            status: 'success',
            user,
        });
    }

    const editUser = async (req, res) => {
        const { inputName, inputUsername, inputPassword, confirmPassword } = req.body
        await logger.log_it(req.user, 'editing profile')
        if (inputPassword === confirmPassword) {
            bcrypt.hash(inputPassword, saltRounds, async function (err, hash) {
                await update_user.update_account(req.user, inputName, inputUsername, hash)
                res.json({
                    status:"success",
                    response: "Usera account updated"
                })
            })
        } else {
            res.json({
                status: 'failure',
                response: 'Passwords do not match'
            })
        }
    }


    return {
        createUser,
        verify,
        sign_in,
        userData,
        editUser
    }
}