var Path = function (game, tilemap, walkables, sprite){
	this.game = game;
	this.marker = null;
	this.sprite = sprite;
	this.tilemap = tilemap;
	this.layer = tilemap.getLayer(3);
	this.pathfinder = this.game.plugins.add(Phaser.Plugin.PathFinderPlugin);
	this.pathfinder.setGrid(this.tilemap.getLayer(3).data, walkables);
	this.pathDebug = false;
};

Path.prototype = {
	findPathTo: function (coordX, coordY){
		var tileX = this.layer.getTileX(coordX);
		var tileY = this.layer.getTileY(coordY);
		this.pathfinder.setCallbackFunction(this.usePath);
		this.pathfinder.preparePathCalculation([this.layer.getTileX(this.sprite.x),this.layer.getTileY(this.sprite.y)], [tileX,tileY]);
		this.pathfinder.calculatePath();
	},

	usePath: function (path) {
		path = path || [];
		if(this.pathDebug ===true){
			for(var i = 0, ilen = path.length; i < ilen; i++) {
				this.tilemap.putTile(46, path[i].x, path[i].y);
			}
		}
		var tween = this.game.add.tween(this.sprite.body);
		for(var i =0; i < path.length; i++){
			var wc = this.getWorldCoords(path[i]);
			tween.to({x: wc.x, y:wc.y}, 100, Phaser.Easing.Linear.None);
		}
		tween.interpolation(Phaser.Math.bezierInterpolation)
		.start();
	},
	
	getWorldCoords: function (coord){
		var currentTile = this.tilemap.getTile(coord.x, coord.y); 
		return {x:currentTile.worldX, y: currentTile.worldY};
	}
};

Path.prototype = {
	
};
