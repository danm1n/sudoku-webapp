import React from 'react';
import '../styling/App.css';
import ClassicGame from '../game-modes/classic-sudoku';
import NavBar from '../components/nav-bar';
import TimeStrike from '../game-modes/time-strike';

export default class NewGame extends React.Component {
    state ={
        mode: this.props.match.params.mode,
        level: this.props.match.params.level
    }

    startgame = () => {
        let {mode,level} = this.state
        if(mode === "timestrike"){
            return <TimeStrike level={level} />
        }else{
            return <ClassicGame level={level} />
        }
    }
    
    render() {
    return (
        <div className="bg">
            <NavBar />
        <div className="container-fluid">
            <div className="row justify-content-center">
            {this.startgame()}
            </div>
        </div>
      </div>
    )
}
}


