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
            children.push(<td>{userdata[z].level}</td>)
            table.push(<tr>{children}</tr>)
    }
    return table;
  }


  render() {
  return (
    <div className="bg">
      <NavBar />
      <div className="container">

        <div style={{overflowY:"scroll", overflowX:"hidden", height:"70vh", marginTop:"50px", marginBottom:"50px"}}>
        <table className="table highscoreTable">
  <thead>
    <tr>
      <th style={{color:"black"}} scope="col">#</th>
      <th style={{color:"black"}} scope="col">Username</th>
      <th style={{color:"black"}} scope="col">Classic Score</th>
      <th style={{color:"black"}} scope="col">TimeStrike Level</th>
    </tr>
  </thead>
  <tbody>
      {this.makeTable()}
      </tbody>
        </table>
        </div>

      </div>
    </div>
  )
}
}

