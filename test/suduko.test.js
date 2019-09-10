describe('Suduku ', function () {

  describe('Testing different levels', function () {
  it('Should give me 12 numbers as the level is easy. For testing the number 0 is blank.', function () {
    let instance = sudoku()
   instance.intialBoard("easy")
   console.log("--------------------")
  });

  it('Should give me 2 numbers as level is intermediate. For testing the number 0 is blank.', function () {
    let instance = sudoku()
    instance.intialBoard("expert")
  });

  // it('Should give me 2 numbers as level is hard. For testing the number 0 is blank.', function () {
  //   let instance = sudoku()
  //   instance.intialBoard("hard")
  // });

  // it('Should give me 2 numbers as level is expert. For testing the number 0 is blank.', function () {
  //   let instance = sudoku()
  //   instance.intialBoard("expert")
  // });
})

  });
