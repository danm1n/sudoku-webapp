import React from 'react';
import '../styling/App.css';
import GenerateGame from '../components/generate-game';
import NavBar from '../components/nav-bar';

export default function NewGame() {
    return (
        <div>
            <NavBar />
        <div className="">
        <div className="container">
            <div className="row justify-content-center">
            <GenerateGame />
            </div>
        </div>
      </div>
      </div>
    )  
}


