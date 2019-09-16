import React, { Component } from 'react';
import '../styling/App.css';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
import InitializeGame from '../components/generate-game';
import NavBar from '../components/nav-bar';
// import logo from '../styling/images/logo.gif';

export default function NewGame() {
    return (
        <div>
            <NavBar />
        <div className="bgColor">
        <div className="container">
        <div className="row">
            {/* <h1>New Game</h1> */}
            </div>
            <div className="row">
            <InitializeGame />
            </div>
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          {/* <Link to="/new_game"><button class="btn btn-outline-warning btm-mds">New Game</button></Link> */}
        </div>
      </div>
      </div>
    )  
}


