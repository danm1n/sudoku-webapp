module.exports = () => {

    const standardizeData = (grid) => {
        for(var row = 0; row < grid.length;row++){
            for(var col = 0; col < grid.length;col++){
                if(grid[row][col] === ""){
                    return false
                }else{
                grid[row][col] = Number(grid[row][col])
        }
    }
    }
        return grid
}

    const checkSolution = (grid) => {
        grid  = standardizeData(grid)
        if(grid === false)return "Clash";
        for(var z =0 ; z < grid.length;z++){
            let row = z
            let col = z
            for(var num = 1; num <= 9; num++){
            if(checkAll(grid,row,col,num) === false){
                return false;
            }
        }
        }            
        return true;
    }


    function checkAll(grid,row,col,number){
        return checkRow(grid,row,number) && checkColumn(grid,col,number) && checkBox(grid,row,col,number)
    }

    function checkRow(grid,row,number){
        let count = 0;
        for(var col = 0; col < 9; col++){
            if(grid[row][col] === number){
                count += 1
                if(count > 1){
                // console.log(`row:${row} col:${col} num:${number} count:${count} row`)
                return false;
            }
        }
        return true;
     }
    }
 
     function checkColumn(grid,col,number) {
         let count = 0;
         for(var row = 0; row < 9; row++){
             if(grid[row][col] === number){
                count += 1
                if(count > 1){
                // console.log(`row:${row} col:${col} num:${number} count:${count} col`)
                 return false;
                }
             }
         }
         return true;
     }
 
     function checkBox(grid,row,col,number){
         row = Math.floor(row / 3) * 3
         col = Math.floor(col / 3) * 3
         let count = 0;
         for(var r = 0; r < 3;r++){
             for(var c = 0; c < 3;c++){
                 if(grid[row +r ][col + c] === number){
                    count += 1
                     if(count > 1){
                    // console.log(`row:${row} col:${col} num:${number} count:${count} box`)
                     return false;
                     }
                 }
             }
         }
         return true;
     }



    return{
        checkSolution
    }
}