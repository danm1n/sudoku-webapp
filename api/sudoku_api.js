const CheckSolution = require('../src/user/checkuserBoard')
const user = CheckSolution()
module.exports = (generate) => {

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
        let grid = req.body.grid;
        if(user.checkSolution(grid)){
            res.json({
                status: 'success',
                data: ['You won, well done!','New Game','/home']
            });
        }else{
            res.json({
                status: 'success',
                data: ['Looks like your numbers clash.','Try Again']
            });
        }
    }

        return {
            all,
            checker
        }
}