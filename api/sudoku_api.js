module.exports = (generate,solver) => {

    let all = (req, res) => {
        let mode = req.params.mode;
        try {
            let genPuzzle = generate.intialBoard(mode);
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