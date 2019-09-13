module.exports = (generate) => {

    let all = async (req, res) => {
        let mode = req.params.mode;
        try {
            let genPuzzle = await generate.intialBoard(mode);
            res.json({
                status: 'success',
                data: genPuzzle
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
    all
}
}