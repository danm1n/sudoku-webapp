const CheckSolution = require('../src/user/checkuserBoard')
const user = CheckSolution()
module.exports = (generate,game_score) => {

    let all = (req, res) => {
        let mode = req.params.mode;
        try {
            let genPuzzle = generate.intialBoard(mode);
            res.json({
                status: 'success',
                mode: genPuzzle[0],
                grid: genPuzzle[1],
                answer: genPuzzle[2],
                mistake: genPuzzle[3]
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
        let {grid,gamemode} = req.body;
        // console.log(grid)
        if(user.checkSolution(grid) === true){
            game_score.increaseScore(req.user,gamemode)
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