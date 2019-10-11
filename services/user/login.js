module.exports = (pool) => {

    let authUser = async (username) => {
        const user = await pool.query('select * from users where username = $1', [username]);
        return user.rows[0]
    }

    return {
        authUser
    }
}