import React from 'react';
import '../styling/App.css';
import NavBar from '../components/nav-bar';

export default class NewGame extends React.Component {
    state ={
        level: this.props.match.params.handle
    }
    
    render() {
    return (
        <div className="bg">
            <NavBar />
        <div style={{marginTop:10}} className="jumbotron jumbotron-fluid ">
  <div className="container">
    <h1 className="display-4">Sudoku With A Difference</h1>
    <p className="lead">Sudoku is a logic-based, combinatorial number-placement puzzle. This app was built with React and nodeJS. </p>
    <p className="lead">There are two game modes in this game. Classic Sudoku and Timestrike.</p>
    Classic Rules:
        <li>
        Sudoku is played on a grid of 9 x 9 spaces. Within the rows and columns are 9 “squares” (made up of 3 x 3 spaces). Each row, column and square (9 spaces each) needs to be filled out with the numbers 1-9, without repeating any numbers within the row, column or square. Does it sound complicated? As you can see from the image below of an actual Sudoku grid, each Sudoku grid comes with a few spaces already filled in; the more spaces filled in, the easier the game – the more difficult Sudoku puzzles have very few spaces that are already filled in.
        </li>
        <div>&nbsp;</div>
    Timestrike Rules:
    <li>
        Similar to classic, however you will have to fill in the blocks in a certain time. You get given a time frame when you start and you have to make sure you dont run out of time. The grid starts off with 1 open block that you have to fill in, as you complete it the number of open blocks will increase, therfore getting harder to complete in the given time frame. Once time runs out, gameover. Give it a try! 
    </li>
</div>
        </div>
      </div>
    )  
}
}


