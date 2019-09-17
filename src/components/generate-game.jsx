import React from 'react';
import axios from 'axios';
import '../styling/App.css';

export default class GenerateGame extends React.Component {
  state = {
    grid: []
  }

  componentDidMount() {
    axios.get(`/api/new-game/easy`)
      .then(res => {
        const grid = res.data.data;
        this.setState({ grid });
      })
  }

  makeTable = () => {
    let table = [];
    let grid = this.state.grid
    for(var row = 0;row < grid.length;row++){
      let children = [];
      for(var col = 0; col < grid.length;col++ ){
        if(grid[row][col] !== 0){
        children.push(<td><input name={[row,col]} class="input" value={grid[row][col]} onChange={this.handleChange}/></td>)
      }else{
        children.push(<td><input name={[row,col]} class="input" type="number" pattern="\d*" maxlength="1" onChange={this.handleChange} /></td>)
      }
    }
      table.push(<tr>{children}</tr>)
    }
    return table;
  }

  handleChange = event => {
    // console.log(event.target.name)
    let grid = this.state.grid
    let row = Number(event.target.name[0])
    let col = Number(event.target.name[2]) 
    grid[row][col] = Number(event.target.value)
    console.log(grid)

    
    this.setState({ grid });
    // console.log(this.state.grid)
  }

  handleSubmit = event => {
    event.preventDefault();

    const { grid } =
      this.state
    // console.log(number)
    axios.post(`/check`, { grid })
      .then(res => {
        console.log(grid)
      })
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      <table>
        {this.makeTable()}
    </table>
    <div className="row justify-content-center">
    <button className="btn btn-warning btn-md button" type="submit">Check</button>
    </div>
    </form>
    )
  }
}