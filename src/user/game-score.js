module.exports = (pool) => {

    const increaseScore = async (username) => {
        let userScore =  await pool.query('select highscore from users where username = $1',[username])
        let score = userScore.rows[0].highscore
        await pool.query('update users set highscore = $1 where username = $2',[score+1,username])
    }

    const highscore_table = async () => {
        let table = await pool.query('SELECT username,highscore FROM users ORDER BY highscore DESC')
        let mtable = table.rows
        return mtable;
    }


    return{
        increaseScore,
        highscore_table
    }
}