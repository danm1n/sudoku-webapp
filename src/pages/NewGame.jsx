import React from 'react';
import '../styling/App.css';
import ClassicGame from '../components/classic-game';
import NavBar from '../components/nav-bar';

export default class NewGame extends React.Component {
    state ={
        level: this.props.match.params.handle
    }
    
    render() {
    return (
        <div className="bg">
            <NavBar />
        <div className="container">
            <div className="row justify-content-center">
            <ClassicGame level={this.state.level}/>
            </div>
        </div>
      </div>
    )  
}
}


