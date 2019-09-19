import React from 'react';
import '../styling/App.css';
import GenerateGame from '../components/generate-game';
import NavBar from '../components/nav-bar';

export default class NewGame extends React.Component {
    state ={
        level: this.props.match.params.handle
    }
    
    render() {
    return (
        <div>
            <NavBar />
        <div className="">
        <div className="container">
            <div className="row justify-content-center">
            <GenerateGame level={this.state.level}/>
            </div>
        </div>
      </div>
      </div>
    )  
}
}


