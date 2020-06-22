import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Hotkeys from 'react-hot-keys';
import Auth from '../Auth'
import BuildBoard from '../components/build-board';
import Modal from '../components/modal';


export default class ClassicMode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      answer: [],
      level: props.level,
      lives: 0,
      response: '',
      checkBtnDisable: false,
      onScreenKeyboard: '',
      activeBlock: ['', ''],
      modalBtnAction: false,
    }
  }

  async componentDidMount() {
    let config = {
      headers: { 'Authorization': `bearer:${Auth.getToken()}` }
    }
    let { level } = this.state
    await axios.get(`/api/game/classic/${level}`, config)
      .then(res => {
        const { grid, answer, lives, level } = res.data;
        this.setState({ level, grid, answer, lives });
      })
    this.dynamicBuildBtns()
  }

  dynamicBuildBtns = () => {
    let onScreenKeys = [];
    for (var value = 1; value <= 9; value++) {
      onScreenKeys.push(<button className="btn btn-info btn-md gameBtn" value={value} type="button" onClick={this.onScreenbuttonTrigger}>{value}</button>)
    }
    this.setState({ onScreenKeyboard: onScreenKeys })
  }

  onScreenbuttonTrigger = (event) => {
    let grid = this.state.grid;
    let activeBtn = event.target.value;
    let activeBlock = this.state.activeBlock;
    let row = activeBlock[0];
    let col = activeBlock[1];
    if (activeBlock !== '' && typeof(grid[row][col]) === "string") {
      grid[row][col] = activeBtn;
      this.setState({ grid, activeBlock: ['', ''] });
      this.forceUpdate();
    }
  }

  setActiveBlock = (coord) => {
    this.setState({ activeBlock: coord })
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { grid, level } = this.state
    let config = {
      headers: {
        'Authorization': `bearer:${Auth.getToken()}`
      }
    }
    let gamemode = 'classic'
    await axios.post(`/api/check`, { gamemode,grid, level }, config)
      .then(res => {
        this.setState({ response: res.data.data })
      })
    if (this.state.response[0] === "You won, well done!") {
      this.setState({ checkBtnDisable: true })
      this.setState({ modalBtnAction: [false, this.Redirect] })
    } else {
      this.setState({ modalBtnAction: [false, Modal.close] })
    }
    Modal.open()
  }

  Redirect = () => {
    this.setState({ modalBtnAction: [true] })
  }

  onKeyDown(keyName) {
    let activeBlock = this.state.activeBlock;
    if(typeof(activeBlock[0]) === "string") activeBlock = [4,4]
    if (keyName === 'up') {
      activeBlock[0] -= 1
    } else if (keyName === 'down') {
      activeBlock[0] += 1
    } else if (keyName === 'left') {
      activeBlock[1] -= 1
    } else {
      activeBlock[1] += 1
    }
    if(activeBlock[0] === 9) activeBlock[0] = 0
    if(activeBlock[1] === 9) activeBlock[1] = 0
    if(activeBlock[0] === -1) activeBlock[0] = 8
    if(activeBlock[1] === -1) activeBlock[1] = 8
    this.setState({activeBlock})
  }

  newGameBtn = () => {
    this.setState({ response: ["Are you sure you want to start a new game?", "Yes"] })
    this.setState({ modalBtnAction: [false, this.Redirect] })
    Modal.open()
  }

  render() {
    if (this.state.modalBtnAction[0]) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <Hotkeys
          keyName="up,down,left,right"
          onKeyDown={this.onKeyDown.bind(this)}
        />
        <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{this.state.response[0]}</h5>
                <button type="button" className="close" aria-label="Close" onClick={Modal.close}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-warning btn-md button" onClick={this.state.modalBtnAction[1]}>{this.state.response[1]}</button>
              </div>
            </div>
          </div>
        </div>


        <form className="gameDiv" onSubmit={this.handleSubmit}>
          <table>
            <BuildBoard grid={this.state.grid} 
            answer={this.state.answer} 
            activeBlock={this.state.activeBlock} 
            setActiveBlock={this.setActiveBlock} 
            />
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