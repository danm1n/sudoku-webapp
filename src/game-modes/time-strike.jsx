import React from 'react'
import { Redirect } from 'react-router-dom';
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
            onScreenKeyboard:[],
            response: ["You ran out of time.","New Game"],
            modalBtnAction: [false,this.redirect],
            activeBlock: ['', ''],
            setduration:60 * 1/3,
            gameover: false
        }
    }

    async componentDidMount() {
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
        let grid_copy = this.state.grid;
        let activeBtn = event.target.value;
        level += 1
        let row = activeBlock[0];
        let col = activeBlock[1];
        if (activeBlock !== '' && typeof(grid[row][col]) === "string") {
          grid_copy[row][col] = Number(activeBtn);
          if(JSON.stringify(grid_copy) === JSON.stringify(answer)){Modal.open()}
          grid[row][col] = activeBtn;
          this.setState({ grid, 
            activeBlock: ['', ''],
            response: ["Level completed","Next Level"],
            modalBtnAction:[false,this.nextLvl],
            level,
          });
          this.forceUpdate();
        }
      }

       startTimer = () => {
        let duration = this.state.setduration;
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
              time_left = minutes + ":" + seconds
              document.querySelector(".time").innerHTML = `Time:${time_left}`
        }, 1000);
    }

    Redirect = () => {
      this.setState({ modalBtnAction: [true] })
    }

    nextLvl = async () => {
     await this.getPuzzle()
      this.dynamicBuildBtns()
      this.forceUpdate();
      Modal.close()
    }

    gameover = () => {
      Modal.open()
      this.setState({onScreenKeyboard:[],
      modalBtnAction:[false,this.redirect]
      })
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
    <span className="time">Time:00.00</span>
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
</div>
)
}
}