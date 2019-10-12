const CheckSolution = require('../services/user/checkuserBoard')
const user = CheckSolution()
module.exports = (generate,game_score) => {

    let generateboard = (req, res) => {
        let {mode,level} = req.params;
        try {
            let genPuzzle = generate.intialBoard(mode,level);
            res.json({
                status: 'success',
                level: genPuzzle[0],
                grid: genPuzzle[1],
                answer: genPuzzle[2],
                lives: genPuzzle[3]
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
        let {grid,level} = req.body;
        // console.log(grid)
        if(user.checkSolution(grid) === true){
            game_score.increaseScore(req.user,level)
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
            generateboard,
            checker,
            highscore
   }
}