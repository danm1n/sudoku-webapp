module.exports = (pool) => {
let today = new Date();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let log_it = async (username,event) => {
    console.log('test')
await pool.query(`insert into logger (username,event,time) values($1,$2,$3)`,[username,event,time])
}

return{
    log_it
}
}