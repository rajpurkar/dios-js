Tilemap = function(game){
	this.game = game;
	this.something = null;
	this.map = null;
	this.layer1 = null;
	this.layer2 = null;
	this.layer3 = null;
};

function gofull(game){
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
		this.game.load.tilemap('map', 'assets/test.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('tiles', 'assets/tiles.png');
	},

	create: function() {
		this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
		this.game.input.onDown.add(gofull, this);
		this.map = this.game.add.tilemap('map');
		this.map.addTilesetImage('tiles');	
		this.layer1 = this.map.createLayer('background');
		this.layer2 = this.map.createLayer('battlezone');
		this.layer3 = this.map.createLayer('obstacles');
		this.layer1.resizeWorld();
		this.layer2.resizeWorld();
		this.layer3.resizeWorld();

		this.map.setCollisionByExclusion([],true,this.layer3);
		this.map.setTileIndexCallback([7410], this.inBattlezone, this, this.layer2);
	},
	inBattlezone: function() {
		console.log("time for a battle");
	},

	update: function() {
	},
};