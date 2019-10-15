module.exports = (pool) => {
let today = new Date();
let time = today.getHours()+2 + ":" + today.getMinutes() + ":" + today.getSeconds();
let log_it = async (username,event) => {
await pool.query(`insert into logger (username,event,time) values($1,$2,$3)`,[username,event,time])
}

let viewLog = async () => {
   let log = await pool.query(`select * from logger`)
    log = log.rows
    return log
}
return{
    log_it,
    viewLog
}
}