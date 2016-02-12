var React = require('react');
var Reflux = require ('reflux');
var Actions = require ('../reflux/actions.jsx');
var PixelStore = require ('../reflux/pixel-store.jsx');


var Pixel = React.createClass({
 // mixins:[Reflux.listenTo(PixelStore, 'onChange')],
  getInitialState: function(){
    return {
      value:this.props.value,
      background: 'white',
      list:this.props.list
    }
  },
  changeState:function(){
    var list = this.props.list
    var pixelarray = this.props.identification.split('-');
    console.log(pixelarray)
    var xvalue = parseInt(pixelarray[0])
    var yvalue = parseInt(pixelarray[1])
    if(this.state.value===1){
      this.setState({value:0});
      list[xvalue].splice(yvalue,1,0);
    }
    else {
      this.setState({value:1})
      list[xvalue].splice(yvalue,1,1);
    }
    this.setState({list:list},function(){
      Actions.updateList(list);
      console.log('list',list)
    })
  },
  
  componentWillReceiveProps: function(nextProps){
    this.setState({value:nextProps.value})
  },
  render:function(){
  var MyStyle = {
            background:'#C5C5C5',
            width:'18px',
            height: '18px',
            border: 'solid 1px #aaaaaa'
        };
    if(this.props.value===1){
      MyStyle.background="#EE8D09"
    }
    else{
      MyStyle.background="#C5C5C5"
    }
    return <button key={this.props.key} className="pixels" style={MyStyle} onClick={this.changeState}>< /button>
  }
})

module.exports=Pixel;