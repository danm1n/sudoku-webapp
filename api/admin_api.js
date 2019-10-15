module.exports = (logger) => {
    

    let view_log = async (req, res) => {
        try {
            let log = await logger.viewLog();
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
    view_log
}
}