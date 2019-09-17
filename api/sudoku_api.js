module.exports = (generate, solver) => {

    let all = (req, res) => {
        let mode = req.params.mode;
        try {
            let genPuzzle = generate.intialBoard(mode);
            res.json({
                status: 'success',
                data: genPuzzle[0],
                answer: genPuzzle[1]
            });
        }
        catch (err) {
            res.json({
                status: "error",
                error: err.stack
            });
        }
    };

    let checker = (req, res) => {
        console.log('test')
        let grid = req.body.grid;
        console.log(grid)
        if(solver.solve(grid,0,0)){

        }
        res.redirect('/')
    }
        return {
            all,
            checker
        }
}