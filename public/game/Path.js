/* NOT YET WORKING! LOOK AT game/pathfinding/Game.js to start integration*/

Path = function (game, tilemap, walkables, sprite){
	this.game = game;
	this.marker = null;
	this.sprite = sprite;
	this.tilemap = tilemap.map;
	this.layer = tilemap.layer3;
	this.pathfinder = this.game.plugins.add(Phaser.Plugin.PathFinderPlugin);
	this.pathfinder.setGrid(tilemap.map.layers[2].data, walkables);
	this.callback;
};

Path.prototype = {
	findPathTo: function (coordX, coordY, callback){
		var tileX = this.layer.getTileX(coordX);
		var tileY = this.layer.getTileY(coordY);
		this.pathfinder.setCallbackFunction(callback);	this.pathfinder.preparePathCalculation([this.layer.getTileX(this.sprite.x),this.layer.getTileY(this.sprite.y)], [tileX,tileY]);
		this.pathfinder.calculatePath();
	},

	getWorldCoords: function (coord){
		var currentTile = this.tilemap.getTile(coord.x, coord.y); 
		return {x:currentTile.worldX, y: currentTile.worldY};
	},
};

//adding the path. Not yet completed/used
function movePlayer(){
	var pathy = new Path(this.game, this.tilemap, [0], this.player.sprite);
	var that = this;
	pathy.findPathTo(this.game.input.activePointer.worldX, this.game.input.activePointer.worldY, function(path){
		if(path.length >0){
			var tween = that.game.add.tween(that.player.sprite.body);
			for(var i =0; i < path.length; i++){
				var wc = pathy.getWorldCoords(path[i]);
				tween.to({x: wc.x, y:wc.y}, 100, Phaser.Easing.Linear.None);
			}
			tween.interpolation(Phaser.Math.bezierInterpolation)
			.start();
		}
	});
}