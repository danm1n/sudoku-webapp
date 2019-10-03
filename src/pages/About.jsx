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
        <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">Sudoku Webapp</h1>
    <p class="lead">Sudoku is a logic-based, combinatorial number-placement puzzle. This app was built with React and nodeJS. </p>
</div>
        </div>
      </div>
    )  
}
}


