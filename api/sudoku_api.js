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
                answer: genPuzzle[1],
                mistake: genPuzzle[2]
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
        // console.log(grid)
        if(user.checkSolution(grid) === true){
            game_score.increaseScore(req.user)
            res.json({
                status: 'success',
                data: ['You won, well done!','New Game','/']
            });
        }else if(user.checkSolution(grid) === false){
            res.json({
                status: 'success',
                data: ['Looks like your numbers clash.','Try Again']
            });
        }else{
            res.json({
                status: 'success',
                data: ['Looks like the puzzle is incomplete.','Resume']
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