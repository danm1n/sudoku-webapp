import React from 'react'
import BuildBoard from '../components/build-board';
import Auth from '../Auth';
import axios from 'axios';


export default class TimeStrike extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            grid: [],
            answer:[], 
            level:1,
            onScreenKeyboard:[],
            activeBlock: ['', ''],
        }
    }

    async componentDidMount() {
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

render(){
return(
<div>
    <h1 className="heading">TimeStrike</h1>
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