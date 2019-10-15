import React from 'react'
import { Redirect } from 'react-router-dom';
import Hotkeys from 'react-hot-keys';
import BuildBoard from '../components/build-board';
import Auth from '../Auth';
import axios from 'axios';
import Modal from '../components/modal'


export default class TimeStrike extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            grid: [],
            answer:[], 
            level:1,
            diffculty: props.level,
            onScreenKeyboard:[],
            response: [],
            modalBtnAction: [],
            activeBlock: ['', ''],
            setduration:1/2,
            stopCounter: false,
            gameover: false
        }
    }

    async componentDidMount() {
      let setduration;
      let diffculty = this.state.diffculty
      if(diffculty === 'easy') setduration = 1/2
      if(diffculty === 'intermediate') setduration = 1/3
      if(diffculty === 'hard') setduration = 1/4
      if(diffculty === 'expert') setduration = 1/5
      this.setState({setduration})
      await this.getPuzzle()
      this.startTimer()
      }

      getPuzzle = async () => {
        let config = {
          headers: { 'Authorization': `bearer:${Auth.getToken()}` }
        }
        let { level } = this.state
        await axios.get(`/api/game/timestrike/${level}`, config)
          .then(res => {
            const { grid, answer } = res.data;
            this.setState({ grid, answer });
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
        let { grid,answer,activeBlock,level } = this.state;
        let activeBtn = event.target.value;
        level += 1
        let row = activeBlock[0];
        let col = activeBlock[1];
        if (activeBlock !== '' && typeof(grid[row][col]) === "string") {
          grid[row][col] = activeBtn;
          for(let row = 0;row < grid.length;row++){
            for(let col = 0; col  < grid.length;col++){
              if(Number(grid[row][col]) !== answer[row][col]){
                this.setState({activeBlock: ['', '']})
                return false;
              }
            }
          }
          Modal.open()
          let duration = this.state.setduration;
          duration += 1/8;
          this.setState({ grid, 
            activeBlock: ['', ''],
            setduration:duration,
            stopCounter:true,
            response: ["Level completed","Next Level"],
            modalBtnAction:[false,this.nextLvl],
            level,
          });
          this.forceUpdate();
        }
      }

       startTimer = () => {
        let duration = this.state.setduration * 60
        let time_left,minutes,seconds;
        let countdown = setInterval(() => {
            minutes = parseInt(duration / 60, 10)
            seconds = parseInt(duration % 60, 10);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;    
              duration --
              if(duration < 0){
                clearInterval(countdown)
               this.gameover()
              }
              if(this.state.stopCounter) clearInterval(countdown)
              time_left = minutes + ":" + seconds
              document.querySelector(".time").innerHTML = `Time:${time_left}`
        }, 1000);
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

    nextLvl = async () => {
      this.setState({stopCounter:false})
     await this.getPuzzle();
      this.forceUpdate();
      this.startTimer();
      Modal.close();
    }

    gameover = async () => {
      Modal.open()
      this.setState({onScreenKeyboard:[],
      modalBtnAction:[false,this.Redirect],
      response: ["You ran out of time.","New Game"]
      })
      let config = {
        headers: {'Authorization': `bearer:${Auth.getToken()}`}
      }
      let gamemode = 'timestrike'
      let { grid,level } = (this.state)
      await axios.post(`/api/check/`, { gamemode,grid, level }, config)
        .then(res => {
          
        })
    }
    newGameBtn = () => {
      this.setState({ response: ["Are you sure you want to start a new game?", "Yes"] })
      this.setState({ modalBtnAction: [false, this.Redirect] })
      Modal.open()
    }
  
      setActiveBlock = (coord) => {
        this.setState({ activeBlock: coord })
      }

render(){
  if (this.state.modalBtnAction[0]) {
    return <Redirect to="/" />
  }
return(
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
    <h1 className="heading">TimeStrike</h1>
    <div className="game-bar"><span className="time">Time:00.00</span><span>Level:{this.state.level}</span></div>
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
  <button type="button" className="btn btn-warning btn-md button" onClick={this.newGameBtn}>New Game</button>
          </div>
</div>
)
}
}