var Reflux = require ('reflux');
var Actions = require ('./actions.jsx');
var array = [];

var PixelStore = Reflux.createStore({
	listenables: [Actions],
	updateList: function(list){
		//take new list created by pixel and send it to the grid
		this.fireUpdate(list);
	},
	performCheck: function(list){
		//cloning list
		var copyOfList = [];
		for (var x=0;x<list.length;x++){
			copyOfList.push(list[x].slice(0))
		}
		// count alive neighbors,ignorings x-1 or x+1 if it doesn't exist (vertical edges are not a problem, they return undefined)
		for (var x=0;x<list.length;x++){
			var xarray = list[x];
			for (var y=0;y<xarray.length;y++){
				var count = 0;
				if(list[x+1]===undefined){
				var newarray=[list[x-1][y-1],list[x][y-1],
					list[x-1][y],
					list[x-1][y+1],list[x][y+1]];
				}
				else if(list[x-1]===undefined){
				var newarray=[list[x][y-1],list[x+1][y-1],
					list[x+1][y],
					list[x][y+1],list[x+1][y+1]];
				}
				else{
				var newarray=[list[x-1][y-1],list[x][y-1],list[x+1][y-1],
					list[x-1][y],list[x+1][y],
					list[x-1][y+1],list[x][y+1],list[x+1][y+1]];
				}
				newarray.map(function(item){
					if(item===1){
						count++;
					}
				});
				//underpopulation			
				if (list[x][y]===1 && count<2){
					copyOfList[x].splice(y,1,0);
				}
				//overpopulation
				if (list[x][y]===1 && count>3){
					copyOfList[x].splice(y,1,0);
				}
				//reproduction
				if (list[x][y]===0 && count===3){
					copyOfList[x].splice(y,1,1);
				}
			}
		}
		this.fireUpdate(copyOfList);

	},
	fireUpdate: function(newlist){
		this.trigger('change',newlist);
	}
});

module.exports=PixelStore; 