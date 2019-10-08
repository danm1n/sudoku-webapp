import React from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import '../styling/App.css';
import Auth from '../Auth'


export default class GenerateGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      answer: [],
      level: props.level,
      response: '',
      checkBtnDisable: false,
      onScreenKeyboard: '',
      activeBtn: '',
      modalBtnAction: false,
      mistakes: 3,
    }
  }

  async componentDidMount() {
    let config = {
      headers: {
        'Authorization': `bearer:${Auth.getToken()}`
      }
    }
    let level = this.state.level
    await axios.get(`/api/new-game/${level}`, config)
      .then(res => {
        const grid = res.data.data;
        const answer = res.data.answer;
        this.setState({ grid, answer });
      })
    this.dynamicBuildBtns()
  }

  makeTable = () => {
    let table = [];
    let grid = this.state.grid
    let answer = this.state.answer
    for (var row = 0; row < grid.length; row++) {
      let children = [];
      for (var col = 0; col < grid.length; col++) {
        if (Number(grid[row][col]) === answer[row][col] || grid[row][col] === 0 || grid[row][col] === "") {
          if (grid[row][col] !== 0 && typeof (grid[row][col]) !== "string") {
            children.push(<td className="exists"><input name={[row, col]} className="game-input" value={grid[row][col]} onChange={this.handleChange} disabled /></td>)
          } else {
            if (grid[row][col] === 0) grid[row][col] = ""
            if (grid[row][col] === "") {
              children.push(<td><input name={[row, col]} className="game-input" value={grid[row][col]} type="number" pattern="\d*" maxlength="1" min="1" max="9" onFocus={this.handleChange} onChange={this.handleChange} required readOnly /></td>)
            } else {
              children.push(<td><input name={[row, col]} className="correct-input" value={grid[row][col]} type="number" pattern="\d*" maxlength="1" min="1" max="9" onFocus={this.handleChange} onChange={this.handleChange} required readOnly /></td>)
            }
          }
        } else {
          children.push(<td><input name={[row, col]} className="wrong-input" value={grid[row][col]} type="number" pattern="\d*" maxlength="1" min="1" max="9" onFocus={this.handleChange} onChange={this.handleChange} required readOnly /></td>)
        }
      }
      table.push(<tr>{children}</tr>)
    }
    return table;
  }

  dynamicBuildBtns = () => {
    let onScreenKeys = [];
    for (var value = 1; value <= 9; value++) {
      onScreenKeys.push(<button className="btn btn-info btn-sm gameBtn" value={value} type="button" onClick={this.activeBtn}>{value}</button>)
    }
    this.setState({ onScreenKeyboard: onScreenKeys })
  }
  activeBtn = (event) => {
    this.setState({ activeBtn: event.target.value })
  }

  handleChange = event => {
    let grid = this.state.grid
    let row = Number(event.target.name[0])
    let col = Number(event.target.name[2])
    grid[row][col] = this.state.activeBtn
    this.countMistakes(row,col);
    this.setState({ grid });
    this.forceUpdate();
    this.setState({ activeBtn: "" });
    if (this.state.mistakes === 1) {
      this.openModal()
      this.setState({
        checkBtnDisable: true,
        modalBtnAction: [false, this.Redirect],
        response: ["Looks like you ran out of lives", "New Game"],
        onScreenKeyboard: ''
      })
    }
  }

  countMistakes = (row,col) => {
    let answer = this.state.answer
    let grid = this.state.grid
    let mistakes = this.state.mistakes - 1
        if (Number(grid[row][col]) !== answer[row][col] && grid[row][col] !== "") {
          this.setState({ mistakes })
        }
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { grid } =
      this.state
    let config = {
      headers: {
        'Authorization': `bearer:${Auth.getToken()}`
      }
    }
    await axios.post(`/api/check`, { grid }, config)
      .then(res => {
        this.setState({ response: res.data.data })
      })
    if (this.state.response[0] === "You won, well done!") {
      this.setState({ checkBtnDisable: true })
      this.setState({ modalBtnAction: [false, this.Redirect] })
    } else {
      this.setState({ modalBtnAction: [false, this.closeModal] })
    }
    this.openModal()
  }

  openModal = () => {
    document.querySelector('#exampleModal').classList.add('show');
    document.querySelector('#exampleModal').style.display = "block";
  }

  closeModal = () => {
    document.querySelector('#exampleModal').classList.remove('show');
    document.querySelector('#exampleModal').style.display = "none";
  }

  Redirect = () => {
    this.setState({ modalBtnAction: [true] })
  }

  newGameBtn = () => {
    this.setState({ response: ["Are you sure you want to start a new game?", "Yes"] })
    this.setState({ modalBtnAction: [false, this.Redirect] })
    this.openModal();
  }


  render() {
    if (this.state.modalBtnAction[0]) {
      return <Redirect to="/" />
    }
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
                <button type="button" className="btn btn-warning btn-md button" onClick={this.state.modalBtnAction[1]}>{this.state.response[1]}</button>
              </div>
            </div>
          </div>
        </div>


        <form onSubmit={this.handleSubmit}>
          <div className="game-status"><span>mistakes:{this.state.mistakes}</span></div>
          <table>
            {this.makeTable()}
          </table>
          <div className="center-item">
            {this.state.onScreenKeyboard}
          </div>
          <div className="center-item">
            <button id="checkBtn" className="btn btn-warning btn-md button" type="submit" disabled={this.state.checkBtnDisable}>Check</button>
            <button type="button" className="btn btn-warning btn-md button" onClick={this.newGameBtn}>New Game</button>
          </div>
        </form>
      </div>
    )
  }
}