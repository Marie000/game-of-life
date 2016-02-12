var Pixel = require('./pixel.jsx');
var React = require('react');
var Reflux = require ('reflux');
var Actions = require ('../reflux/actions.jsx');
var PixelStore = require ('../reflux/pixel-store.jsx');
var array =[];


var Grid = React.createClass({
  mixins:[Reflux.listenTo(PixelStore, 'onChange')],
  getInitialState: function(){
    return {
      list:array,
      width: 20,
      height: 30,
      cleared:this.props.cleared,
      stopped:this.props.stopped,
      generations: 0
    };
  },
  componentWillMount: function(){
    var width=this.state.width;
    var height=this.state.height;
    //initial grid (random)
    for (i=0;i<height;i++) {
      array[i]=new Array();
      for (j=0;j<width;j++) {
        var random = Math.random();
        if(random>0.5){
          array[i][j]=1;
        }
        else {
          array[i][j]=0;
        }
      }
    }
  },
  componentDidMount: function(){
    //launch performCheck on initial grid
    Actions.performCheck(this.state.list);
  },
  componentDidUpdate: function(){
    //after each new grid is displayed, launch performCheck again (unless stopped)
    var templist = this.state.list;
    var updatelist = function(){
      Actions.performCheck(templist);
    };
    if(!this.props.stopped){
      setTimeout(updatelist,500);
    }
  },
  componentWillReceiveProps: function(nextProps){
    //when cleared button is pressed, return blank array
    if(nextProps.cleared){
    var clearedList = [];
    console.log('cleared');
    for (i=0;i<this.state.height;i++) {
      clearedList[i]=new Array();
      for (j=0;j<this.state.width;j++) {
        clearedList[i][j]=0;
      }
    }
    this.setState({list:clearedList,generations:0});
    }
  },
  onChange: function(e,newlist){
    //when new list received from store
    if(!this.props.stopped){
    this.setState({list:newlist,generations:this.state.generations+1});
  }
  else {
    this.setState({list:newlist})
  }
  },
  render: function(){
    var ifstopped = this.props.stopped
    var ifcleared = this.props.cleared
    var listprop = this.state.list;
    var value;
    var generatePixels = this.state.list.map(function(item,index){
        var xindex = index;
        return <div className="pixelRow">
        {item.map(function(y,index){
            var newId=xindex.toString()+"-"+index.toString();
            return <Pixel key={newId} identification={newId} className="pixel" value={y} 
            list={listprop} stopped={ifstopped} cleared={ifcleared}/>    
        })}</div>
    });
    return(<div id="grid">
      <h3>Generations: {this.state.generations}</h3>
      {generatePixels}</div>)
  }
});


module.exports = Grid;