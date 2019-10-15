module.exports = (pool) => {

    const createAccount = async (name,username,password) => {
        let user = [name,username,password,0,null,false]
        let all_users = await pool.query(`select username from users`)
        for(let user of all_users.rows){
            if(username === user.username){
                return false;
            }
        }
        await pool.query('insert into users (name,username,password,highscore,level,admin) values($1,$2,$3,$4,$5,$6)', user)
        return true;
    }


    return{
        createAccount
    }
}