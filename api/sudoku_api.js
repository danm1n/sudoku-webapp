const CheckSolution = require('../src/user/checkuserBoard')
const user = CheckSolution()
module.exports = (generate,game_score) => {

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
            game_score.increaseScore(req.user)
            res.json({
                status: 'success',
                data: ['You won, well done!','New Game','/']
            });
        }else{
            res.json({
                status: 'success',
                data: ['Looks like your numbers clash.','Try Again']
            });
        }
    }

    let highscore = async (req,res) => {
            res.json({
                status: 'success',
                data: await game_score.highscore_table()
            });
        }        
    

        return {
            all,
            checker,
            highscore
        }
}