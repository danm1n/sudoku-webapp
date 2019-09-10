function sudoku() {

    let array = [
        [0, 0, 0,  0, 0, 0,  0, 0, 0],
        [0, 0, 0,  0, 0, 0,  0, 0, 0],
        [0, 0, 0,  0, 0, 0,  0, 0, 0],

        [0, 0, 0,  0, 0, 0,  0, 0, 0],
        [0, 0, 0,  0, 0, 0,  0, 0, 0],
        [0, 0, 0,  0, 0, 0,  0, 0, 0],

        [0, 0, 0,  0, 0, 0,  0, 0, 0],
        [0, 0, 0,  0, 0, 0,  0, 0, 0],
        [0, 0, 0,  0, 0, 0,  0, 0, 0]
    ]

    let num = 0;

    function generateNumber(num) {
        let random_Number = Math.floor(Math.random() * (num)) + 0;
        return random_Number
    }

    function intialBoard(level) {
        console.log(`**${level}**`)
        let a = 0;
        let b = 0;
        let rounds = 0;
        if (level === "easy") rounds = 35
        if (level === "intermediate") rounds = 25
        if (level === "hard") rounds = 18
        if (level === "expert") rounds = 10

        for (var z = 0; z < rounds; z++) {
            let row = generateNumber(8)
            let col = generateNumber(8)
            let random = generateNumber(8)
            if (checkRow(row) === true && checkColumn(col) === true) {  
                
                a+= 1
                array[row][col] = num || random
            }else{b += 1}
        }

        console.log("success:"+a, "|duplicates:" +b, "|total:"+ (a+b))
        TESTING()
           console.log("---------END-----------")
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

    function checkColumn(col){
        for(var k  = 0; k < array.length;k++){
            let columns = array[k][col]
            if(columns === num){
             console.log('loc---> row/col:'+ k+"/"+col + ' number:'+num)
                return false;
            }
        }
        return true;
    }







    function TESTING() {
        for (var j = 0; j < array.length; j++) {
            console.log(array[j])
        }
    }


    return {
        intialBoard
    }
}