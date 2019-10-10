module.exports = (pool) => {

    const increaseScore = async (username,gamemode) => {
        let points = 0;
        if(gamemode === 'easy') points = 1;
        if(gamemode === 'intermediate') points = 2;
        if(gamemode === 'hard') points = 3;
        if(gamemode === 'expert') points = 4;
        let userScore =  await pool.query('select highscore from users where username = $1',[username])
        let score = userScore.rows[0].highscore
        await pool.query('update users set highscore = $1 where username = $2',[score+points,username])
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