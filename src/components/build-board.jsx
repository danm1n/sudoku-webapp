import React from 'react';


export default class BuildBoard extends React.Component {
  constructor(props) {
    super(props);
  }

  setActiveBlock = event => {
    let row = Number(event.target.name[0])
    let col = Number(event.target.name[2])
    this.props.setActiveBlock([row, col])
  }

  BuildGame = () => {
    let table = [];
    let { grid, answer } = this.props;
    let coord = this.props.activeBlock;
    for (var row = 0; row < grid.length; row++) {
      let children = [];
      for (var col = 0; col < grid.length; col++) {
        if (row === coord[0] && col === coord[1] && typeof (grid[row][col]) !== "number") {
          children.push(<td className="exists"><input name={[row, col]} className="active-block" value={grid[row][col]} onChange={this.setActiveBlock} disabled /></td>)
        } else {
          if (Number(grid[row][col]) === answer[row][col] || grid[row][col] === 0 || grid[row][col] === "") {
            if (grid[row][col] !== 0 && typeof (grid[row][col]) !== "string") {
              if (row === coord[0] && col === coord[1]) {
                children.push(<td className="exists"><input name={[row, col]} className="active-nofill" value={grid[row][col]} disabled /></td>)
              } else {
                children.push(<td className="exists"><input name={[row, col]} className="game-input" value={grid[row][col]} disabled /></td>)
              }
            }
            else {
              if (grid[row][col] === 0) grid[row][col] = ""
              if (grid[row][col] === "") {
                children.push(<td><input name={[row, col]} className="game-input" value={grid[row][col]} type="number" pattern="\d*" maxlength="1" min="1" max="9" onFocus={this.setActiveBlock} onChange={this.setActiveBlock} required readOnly /></td>)
              }
              else {
                children.push(<td><input name={[row, col]} className="correct-input" value={grid[row][col]} type="number" pattern="\d*" maxlength="1" min="1" max="9" onFocus={this.setActiveBlock} onChange={this.setActiveBlock} required readOnly /></td>)
              }
            }
          } else {
            children.push(<td><input name={[row, col]} className="wrong-input" value={grid[row][col]} type="number" pattern="\d*" maxlength="1" min="1" max="9" onFocus={this.setActiveBlock} onChange={this.setActiveBlock} required readOnly /></td>)
          }
        }

      }
      table.push(<tr>{children}</tr>)
    }
    return table;
  }

  render() {
    return (
      <div>
        {this.BuildGame()}
      </div>
    )
  }
}


