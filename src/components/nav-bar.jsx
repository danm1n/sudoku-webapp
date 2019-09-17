import React from 'react';
import { Link } from 'react-router-dom';
// import logo from './logo.gif';
import '../styling/App.css';

export default function NavBar() {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <Link class="navbar-brand" to="/">Sudoku</Link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <Link class="nav-link" to="/">Home <span class="sr-only">(current)</span></Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="#">More</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="#">About</Link>
      </li>
    </ul>
  </div>
</nav>
    )  
}


