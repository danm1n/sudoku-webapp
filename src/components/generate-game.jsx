import React from 'react';
import axios from 'axios';
import '../styling/App.css';

export default class InitializeGame extends React.Component {
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
        children.push(<td>{grid[row][col]}</td>)
      }else{
        children.push(<td><input class="input" type="text" pattern="\d*" maxlength="1" /></td>)
      }
    }
      table.push(<tr>{children}</tr>)
    }
    return table;
  }

  render() {
    return (
      <table>
        {this.makeTable()}
    </table>

    )
  }
}