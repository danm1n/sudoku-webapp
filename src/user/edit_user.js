module.exports = (pool) => {
    //update user details
    let update_account = async (old_username, name, username, password) => {
        console.log(old_username, name, username, password)
        await pool.query('update users set name=$1,username=$2,password=$3 where username = $4', [name, username, password, old_username])
    }
    return {
        update_account
    }
}