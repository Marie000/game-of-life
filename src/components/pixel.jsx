var React = require('react');
var Reflux = require ('reflux');
var Actions = require ('../reflux/actions.jsx');
var PixelStore = require ('../reflux/pixel-store.jsx');


var Pixel = React.createClass({
 // mixins:[Reflux.listenTo(PixelStore, 'onChange')],
  getInitialState: function(){
    return {
      value:this.props.value,
      background: 'white'
    }
  },
  changeState:function(){
    if(this.state.value === 1){
      this.setState({value:0})
     }
    else {
      this.setState({value:1})
    }
  },
  componentWillReceiveProps: function(){
    this.setState({value:this.props.value})
    if(this.props.value===1){
      this.setState({background:'red'})
    }
    else{
      this.setState({background: 'white'})
    }
  },
  render:function(){
  var MyStyle = {
            background:this.state.background,
            width:'20px',
            height: '20px',
            border: 'solid'
        };
    return <button key={this.props.key} className="pixels" style={MyStyle} onClick={this.changeState}>< /button>
  }
})

module.exports=Pixel;