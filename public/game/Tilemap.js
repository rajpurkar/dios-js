Tilemap = function(game){
	this.game = game;
	this.something = null;
	this.map = null;
	this.layer1 = null;
	this.layer2 = null;
	this.layer3 = null;
};

function gofull(){
	if (game.scale.isFullScreen)
	{
		game.scale.stopFullScreen();
	}
	else
	{
		game.scale.startFullScreen();
	}
}

Tilemap.prototype = {
	preload: function() {
		this.game.load.tilemap('map', '/game/assets/test.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('tiles', '/game/assets/tiles.png');
	},

	create: function() {
		this.map = this.game.add.tilemap('map');
		this.map.addTilesetImage('tiles');	
		this.layer1 = this.map.createLayer('background');
		this.layer2 = this.map.createLayer('battlezone');
		this.layer3 = this.map.createLayer('obstacles');
		this.layer1.resizeWorld();
		this.layer2.resizeWorld();
		this.layer3.resizeWorld();

		this.map.setCollisionByExclusion([],true,this.layer3);
		this.map.setTileIndexCallback([7410], this.inInteractionZone, this, this.layer2);
	},
	inInteractionZone: function() {
		console.log("Time for an interaction.");
	},

	update: function() {
	},
};