function sudoku() {

    let array = [
        [0, 1, 0, 4, 0, 5, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],

        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],

        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

    let num = 0;

    function generateNumber(num) {
        let random_Number = Math.floor(Math.random() * (num)) + 1;
        return random_Number
    }

    function intialBoard(level) {
        let a = 0;
        let b = 0;
        if (level === "easy") level = 35
        if (level === "intermediate") level = 25
        if (level === "hard") level = 18
        if (level === "expert") level = 10
        // console.log(array[2])
        for (var z = 0; z < level; z++) {
            let row = generateNumber(8)
            let col = generateNumber(8)
            let random = generateNumber()
            if (checkRow(row) === true ) {  
                // checkColumn(col) === true
                a+= 1
                array[row][col] = num || random
            }else{b += 1
                // return;
            }
        }
        console.log("success:"+a, "|duplicates:" +b, "|total:"+ (a+b))
        TESTING()
    }

    function checkRow(row) {
        let array_x = array[row]      
        let number = [1,2,3,4,5,6,7,8,9]
        number = number.filter(function(val) {
            return array_x.indexOf(val) == -1;
          });
          num = number[generateNumber(number.length - 1)]
        for (var z = 0; z < array_x.length; z++) {
            if (array_x[z] === num) {
                console.log('duplicate')
                return false;
        }
    }
    return true;
    }

    // function checkColumn(col){
    //     // console.log(col + "  column")
    //     for(var k  = 0; k < array.length;k++){
    //         let columns = array[k][col]
    //         if(columns === col){
    //             return false;
    //         }
    //     }
    //     return true;
    // }

//     else{
//         console.log("row:"+row,"col:"+col,random)
//         console.log('duplicate found')
// }


// for(var j = 0; z < number.length;j++){
//     let index = number.indexOf(random)
//     if(index > -1){
//         number.splice(index, 1)
//     }else{console.log("error")}
// }




    function TESTING() {
        for (var j = 0; j < array.length; j++) {
            console.log(array[j])
        }
    }


    return {
        intialBoard
    }
}