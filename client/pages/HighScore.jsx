import React from 'react';
import '../styling/App.css';
import '../styling/index.css';
import NavBar from '../components/nav-bar';
import axios from 'axios';
import Auth from '../Auth';


export default class HighScore extends React.Component {
  state = {
    userdata: {},
  }
 async componentDidMount() {
    let config = {
      headers: {
       'Authorization': `bearer:${Auth.getToken()}`
      }
    }
   await axios.get(`/api/users/highscore`, config)
      .then(res => {
        this.setState({ userdata: res.data.data });
      })
  }

  makeTable = () => {
    let table = [];
    let userdata = this.state.userdata
    for(let z = 0; z < userdata.length;z++){
      let children = [];
            children.push(<td>{z+1}</td>)
           children.push(<td>{userdata[z].username}</td>)
            children.push(<td>{userdata[z].highscore}</td>)
            table.push(<tr>{children}</tr>)
    }
    return table;
  }


  render() {
  return (
    <div className="bg">
      <NavBar />
      <div className="container">
        <table className="table highscoreTable">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Username</th>
      <th scope="col">Score</th>
    </tr>
  </thead>
  <tbody>
      {this.makeTable()}
      </tbody>
        </table>
      </div>
    </div>
  )
}
}

