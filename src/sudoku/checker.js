module.exports = (grid, row, col, number) => {

    function checkRow(grid,row,number){
        for(var col = 0; col < 9; col++){
            if(grid[row][col] === number){
                return false;
            }
        }
        return true;
     }
 
     function checkColumn(grid,col,number) {
         for(var row = 0; row < 9; row++){
             if(grid[row][col] === number){
                 return false;
             }
         }
         return true;
     }
 
     function checkBox(grid,row,col,number){
         row = Math.floor(row / 3) * 3
         col = Math.floor(col / 3) * 3
         
         for(var r = 0; r < 3;r++){
             for(var c = 0; c < 3;c++){
                 if(grid[row +r ][col + c] === number){
                     return false;
                 }
             }
         }
         return true;
     }

         return checkRow(grid,row,number) && checkColumn(grid,col,number) && checkBox(grid,row,col,number)
}
