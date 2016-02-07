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
      width: 10,
      height: 15,
      cleared:this.props.cleared,
      stopped:this.props.stopped
    };
  },
  componentWillMount: function(){
    var width=this.state.width;
    var height=this.state.height;

    for (i=0;i<height;i++) {
      array[i]=new Array();
      for (j=0;j<width;j++) {
        var random = Math.random()
        if(random>0.5){
          array[i][j]=1
        }
        else {
          array[i][j]=0
        }
      }
    }    
  },
  componentDidMount: function(){
    Actions.performCheck(this.state.list);
  },
  componentDidUpdate: function(){
    var templist = this.state.list;
    var update = function(){
      Actions.performCheck(templist);
    };
    if(this.props.stopped===false){
      setTimeout(update,500);
    }
    if(this.props.cleared){
      var clearedList = []
      console.log(this.state.height)
      for (i=0;i<this.state.height;i++) {
      clearedList[i]=new Array();
      for (j=0;j<this.state.width;j++) {
         clearedList[i][j]=0
      }
    } 
    this.setState({list:clearedList})
    }

  },

  onChange: function(e,newlist){
    this.setState({list:newlist});
  },
  render: function(){
    var generatePixels = this.state.list.map(function(x,index){
        var xindex = index
        return <div>{x.map(function(y,index){
            var newId=xindex.toString()+"-"+index.toString();
            return <Pixel key={newId} className="pixel" value={y}/>    
        })}</div>
    });
    return(<div>{generatePixels}</div>)
  }
});


module.exports = Grid;