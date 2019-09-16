import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import logo from './logo.gif';
import '../styling/App.css';
import NavBar from '../components/nav-bar'
import logo from '../styling/images/logo.gif';
export default function HomePage() {
    return (
        <div>
        <NavBar />
        <div className="container">
        <div className="row justify-content-center">
          <img src={logo} className="App-logo" alt="logo"/>
          </div>
          <div className="row justify-content-center">
          <div className="button">
          <Link to="/new-game"><button class="btn btn-outline-warning btm-mds">Start Game</button></Link>
        </div>
        </div>
      </div>
      </div>
    )  
}


