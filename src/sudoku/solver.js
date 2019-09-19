const checker = require('./checker')
module.exports = () => {
    let failded_attempts = 0;
    function solve(grid, row, col) {

        let coord = findEmptyBlock(grid,row,col)
        row = coord[0]
        col = coord[1]
        if(row == -1){
            return true;
        }
        for (var num = 1; num <= 9; num++) {
            if (checker(grid, row, col, num)) {
                grid[row][col] = num;
                if (solve(grid, row, col)) {
                    return true;
                }    
                grid[row][col] = 0;
            }
        }
        failded_attempts += 1;
    return false;
}

function findEmptyBlock(grid,row,col){
    let found = false;
    let coord = [-1,-1]
    while(!found){
        if(row === 9){
            found = true;
        }else{
        if(grid[row][col] == 0){
            coord[0] = row
            coord[1] = col
            found = true;
        }else{
            if(col < 8){
                col++
            }else{
                row++
                col = 0
            }
        }
    }
    }
    return coord;
}

function attempts(){
    return failded_attempts;
}
return{
    solve,
    attempts
}
}
