var Reflux = require ('reflux');
var Actions = require ('./actions.jsx');
var array = [];

var PixelStore = Reflux.createStore({
	listenables: [Actions],

	updateList: function(pixel){
		for (var x=0;x<array.length;x++){
			if(array[x].id===pixel){
				console.log('found')
				if (array[x].alive){
					array[x].alive = false
					this.fireUpdate(pixel,'dead')
					this.performCheck(pixel)
				}
				else {
					array[x].alive = true
					console.log(pixel)
					this.fireUpdate(pixel,'alive')
					this.performCheck(pixel)
				}
			}  
		}
	},
	performCheck: function(list){
		var copyOfList = list
		// count alive neighbors
		for (var x=0;x<list.length;x++){
			var xarray = list[x]
			for (var y=0;y<xarray.length;y++){
				var count = 0
				if(list[x-1] && list [x+1]){
				var newarray=[list[x-1][y-1],list[x][y-1],list[x+1][y-1],
					list[x-1][y],list[x+1][y],
					list[x-1][y+1],list[x][y+1],list[x+1][y+1]]
				}
				if(!list[x+1]){
				var newarray=[list[x-1][y-1],list[x][y-1],
					list[x-1][y],
					list[x-1][y+1],list[x][y+1]]
				}
				if(!list[x-1]){
				var newarray=[list[x][y-1],list[x+1][y-1],
					list[x+1][y],
					list[x][y+1],list[x+1][y+1]]
				}
				var counting = newarray.map(function(item){
					if(item===1){
						count++
					}
				});
				counting;
				if (list[x][y]===1 && count<2){
					copyOfList[x].splice(y,1,0)
				}
				if (list[x][y]===1 && count>3){
					copyOfList[x].splice(y,1,0)
				}
				if (list[x][y]===0 && count===3){
					copyOfList[x].splice(y,1,1)
				}
			}
		}
		this.fireUpdate(copyOfList)

	},
	fireUpdate: function(newlist){
		this.trigger('change',newlist);
	}
});

module.exports=PixelStore;