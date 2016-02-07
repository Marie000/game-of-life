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
		this.setState({stopped:false})
	},
	clearBoard: function(){
		console.log('clear clicked')
		this.setState({cleared:true})
	},
  render:function(){
  	console.log('from main.jsx',this.state.stopped)
  return(<div>
    <div>
    <button onClick={this.stop}>Stop</button>
    <button onClick={this.startPlay}>Start</button>
    <button onClick={this.clearBoard}>Clear</button>
    < /div>
    <Grid stopped={this.state.stopped} cleared={this.state.cleared}/>
  </div>
  )
}
});


ReactDOM.render(<Main />, document.getElementById('main'));