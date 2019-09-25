module.exports = (pool) => {

    const createAccount = async (name,email,password) => {
        
        let user = [name,email,password,0]
        await pool.query('insert into users (name,username,password,highscore) values($1,$2,$3,$4)', user)
    }

    return{
        createAccount
    }
}