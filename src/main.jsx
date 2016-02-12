var React = require('react');
var ReactDOM = require('react-dom');
var Grid = require('./components/grid.jsx');

var Main = React.createClass({
	getInitialState: function(){
		return{
			stopped:false,
			cleared:false
		}
	},
	stop: function(){
		console.log('stopped clicked')
		this.setState({stopped:true})
	},
	startPlay: function(){
		console.log('start clicked')
		if(this.state.stopped){
		this.setState({stopped:false,cleared:false})
	}
	},
	clearBoard: function(){
		console.log('clear clicked')
		this.setState({stopped:true})
		this.setState({cleared:true})
	},
  render:function(){
  	if(this.state.stopped){
  	  	  return(<div className="row">
    <div className="col-sm-3 col-lg-4">
    <br/><br/><br/><br/>
    <button className="btn btn-default" onClick={this.startPlay}>Play</button>
    <button className="btn btn-default" onClick={this.clearBoard}>Clear</button>
    < /div>
    <div className="col-sm-6 col-lg-4">
    <Grid stopped={this.state.stopped} cleared={this.state.cleared} key="grid"/>
    </div>
    <div className="col-sm-3 col-lg-4">
    <div className="explanation">
    <h3>What is Conway's Game Of Life?</h3>
    <p>Conway's game of life is a life simulator. Each cell in the grid is either alive or dead and 
    its fate is determined by the number of live neighbors.
    </p><p> The rules: </p>
    <ul>
    <li>If a live cell has fewer than 2 live neighbors, it dies (underpopulation)</li>
    <li>If a live cell has more than 3 live neighbors, it dies (overpopulation)</li>
    <li>If a dead cell has 3 live neighbors, it comes to life (reproduction)</li>
    </ul>
    <p>Find more information on <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank">
    wikipedia</a></p>
    </div></div>
  </div>
  )
  	}
  else {
  	  return(<div className="row">
    <div className="col-sm-3 col-lg-4">
        <br/><br/><br/><br/>
    <button className="btn btn-default"onClick={this.stop}>Pause</button>
    < /div>
    <div className="col-sm-6 col-lg-4">
    <Grid stopped={this.state.stopped} cleared={this.state.cleared} key="grid"/>
    </div>
    <div className="col-sm-3 col-lg-4">
    <div className="explanation">
    <h3>What is Conway's Game Of Life?</h3>
    <p>Conway's game of life is a life simulator. Each cell in the grid is either alive or dead and 
    its fate is determined by the number of live neighbors.
    </p><p> The rules: </p>
    <ul>
    <li>If a live cell has fewer than 2 live neighbors, it dies (underpopulation)</li>
    <li>If a live cell has more than 3 live neighbors, it dies (overpopulation)</li>
    <li>If a dead cell has 3 live neighbors, it comes to life (reproduction)</li>
    </ul>
    <p>Find more information on <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank">
    wikipedia</a></p>
    </div></div>
      </div>
  )
  }

}
});


ReactDOM.render(<Main />, document.getElementById('main'));