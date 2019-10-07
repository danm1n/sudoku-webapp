import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/App.css';
import Auth from '../Auth';
import App from '../App';

export default class NavBar extends React.Component {
  state = {
    username: Auth.getUserName(),
    redirect: false
  }

  signout = () => {
    Auth.signOutUser()
    this.setState({redirect : true})
  }

  render() {
    if(this.state.redirect){
      return <App />
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark navCol">
  <Link className="navbar-brand" to="/">Sudoku</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/highscore">HighScores</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/about">About</Link>
      </li>
    </ul>
    <div className="btn-group">
  <button type="button" className="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Welcome, {this.state.username}
  </button>
  <div className="dropdown-menu dropdown-menu-right">
    <Link to="/edit-user"><button className="dropdown-item" type="button">Edit Profile</button></Link>
    <button className="dropdown-item" type="button" onClick={this.signout}>Sign Out</button>
  </div>
</div>
  </div>
</nav>
    )  
}
}


