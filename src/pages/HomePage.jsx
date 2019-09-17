import React from 'react';
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
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="row justify-content-center">
          <div className="button">
            <div class="input-group">
              <select class="custom-select" id="inputGroupSelect04">
                <option selected>Choose Level</option>
                <option value="1">Easy</option>
                <option value="2">Intermediate</option>
                <option value="3">Hard</option>
                <option value="3">Expert</option>
              </select>
              <div class="input-group-append">
              <Link to="/new-game"><button class="btn btn-warning btm-md">Start Game</button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


