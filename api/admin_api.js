module.exports = (logger) => {
    

    let viewLog = async (req, res) => {
        try {
            let log = await logger.viewLog();
            console.log(log)
            res.json({
                status:"success",
                log,
            });
        }
        catch (err) {
            res.json({
                status: "error",
                error: err.stack
            });
        }
    };


return{
    viewLog
}
}