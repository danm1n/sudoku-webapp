module.exports = (pool) => {

    const createAccount = async (name,username,password) => {
        
        let user = [name,username,password,0]
        console.log(username)
        let all_users = await pool.query(`select username from users`)
        for(let user of all_users.rows){
            if(username === user.username){
                return false;
            }
        }
        await pool.query('insert into users (name,username,password,highscore) values($1,$2,$3,$4)', user)
        return true;
    }


    return{
        createAccount
    }
}