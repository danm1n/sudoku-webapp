import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styling/App.css';
import Auth from '../Auth'


export default class GenerateGame extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      grid: [],
      level: props.level,
      response: '',
      popup: '',
      btnStatus: false,
      buttons: '',
      activeBtn: '',
    }
  }

  componentDidMount() {
    let config = {
      headers: {
       'Authorization': `bearer:${Auth.getToken()}`
      }
    }
    let level = this.state.level
    axios.get(`/api/new-game/${level}`, config)
      .then(res => {
        const grid = res.data.data;
        this.setState({ grid });
      })
      this.dynamicBuildBtns()
  }

  makeTable = () => {
    let table = [];
    let grid = this.state.grid
    for(var row = 0;row < grid.length;row++){
      let children = [];
      for(var col = 0; col < grid.length;col++ ){
        if(grid[row][col] !== 0 && typeof(grid[row][col]) !== "string"){
        children.push(<td className="exists"><input name={[row,col]} class="input" value={grid[row][col]} onChange={this.handleChange} disabled/></td>)
      }else{
        if(grid[row][col] === 0) grid[row][col] = ""
        children.push(<td><input name={[row,col]} class="input" value={grid[row][col]} type="number" pattern="\d*" maxlength="1" min="1" max="9" onFocus={this.handleChange} onChange={this.handleChange} required/></td>)
      }
    }
      table.push(<tr>{children}</tr>)
    }
    return table;
  }

  dynamicBuildBtns = () => {
    let buttonDiv =[];
      for(var value = 1;value <= 9;value++){
        buttonDiv.push(<button className="btn btn-info btn-sm gameBtn" value={value} type="button" onClick={this.activeBtn}>{value}</button>)
      }
      this.setState({buttons:buttonDiv})
  }
  activeBtn = (event) => {
    this.setState({activeBtn:event.target.value})
  }

  handleChange = event => {
    let grid = this.state.grid
    let row = Number(event.target.name[0])
    let col = Number(event.target.name[2]) 
    // grid[row][col] = event.target.value
    grid[row][col] = this.state.activeBtn
    this.setState({ grid });
    this.forceUpdate();
    this.setState({activeBtn:""});
  }

  handleSubmit = async event => {
    event.preventDefault();
    document.querySelector('#exampleModal').classList.add('show');
    document.querySelector('#exampleModal').style.display = "block";
    const { grid } =
      this.state
      let config = {
        headers: {
         'Authorization': `bearer:${Auth.getToken()}`
        }
      }
   await axios.post(`/api/check`, { grid },config)
      .then(res => {
        this.setState({response: res.data.data})
      })
      if(this.state.response[0] === "You won, well done!"){
        this.setState({btnStatus:true})
      }
  }

  closeModal = () => {
    document.querySelector('#exampleModal').classList.remove('show');
    document.querySelector('#exampleModal').style.display = "none";
  }


  render() {
    return (
      <div>

<div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">{this.state.response[0]}</h5>
        <button type="button" className="close" aria-label="Close" onClick={this.closeModal}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-footer">
        <Link to={this.state.response[2]}><button type="button" className="btn btn-warning btn-md button">{this.state.response[1]}</button></Link>
      </div>
    </div>
  </div>
</div>


      <form onSubmit={this.handleSubmit}>
      <table>
        {this.makeTable()}
    </table>
    <div className="row justify-content-md-center">
    {this.state.buttons}
    </div>
    <div className="row justify-content-center">
    <button id="checkBtn" className="btn btn-warning btn-md button" type="submit" disabled={this.state.btnStatus}>Check</button>
    <Link to="/"><button type="button" className="btn btn-warning btn-md button">New Game</button></Link>
    </div>
    </form>
    </div>
    )
  }
}