module.exports = (pool) => {

    const update_UserScore = async (gamemode,username,difficulty) => {
        if(gamemode === 'timestrike'){
            await levelUp(username,difficulty)
        }else{
           await increaseScore(username,difficulty)
        }
    }

    const increaseScore = async (username,difficulty) => {
        let points = 0;
        if(difficulty === 'easy') points = 1;
        if(difficulty === 'intermediate') points = 5;
        if(difficulty === 'hard') points = 10;
        if(difficulty === 'expert') points = 20;
        let userScore =  await pool.query('select highscore from users where username = $1',[username])
        let new_score = userScore.rows[0].highscore + points;
        await pool.query('update users set highscore = $1 where username = $2',[new_score,username])
    }

    const levelUp = async (username,gamemode) => {
        let lastLevel = Number(gamemode) - 1
        let userLevel =  await pool.query('select level from users where username = $1',[username])
        let bestLevel = userLevel.rows[0].level
        if(lastLevel > bestLevel){
        await pool.query('update users set level = $1 where username = $2',[lastLevel,username])
    }
}

    const highscore_table = async () => {
        let table = await pool.query('SELECT username,highscore,level FROM users ORDER BY highscore DESC')
        let mtable = table.rows
        return mtable;
    }


    return{
        highscore_table,
        update_UserScore
    }
}