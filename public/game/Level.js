
Level = function(game) {
	this.game = game;
	this.platforms = null;
	this.stars = null;
	this.map = null;
	this.layer1 = null;
	this.layer2 = null;
	this.layer3 = null;
};


Level.prototype = {

	gofull: function() {
		if (this.game.scale.isFullScreen)
		{
			this.game.scale.stopFullScreen();
		}
		else
		{
			game.scale.startFullScreen();
		}
	},	

	preload: function() {
		this.game.load.tilemap('map', 'assets/test.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('tiles', 'assets/tiles.png');
		this.game.load.image('sky', 'assets/sky.png');
		this.game.load.image('ground', 'assets/platform.png');
		this.game.load.image('star', 'assets/star.png');
	},

	create: function() {
		//this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
		this.game.input.onDown.add(this.gofull, this);
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
	
		//  The platforms group contains the ground and the 2 ledges we can jump on
		this.platforms = game.add.group();
		this.game.physics.arcade.enable(this.platforms);
		//  We will enable physics for any object that is created in this group
		this.platforms.enableBody = true;

		// Here we create the ground.
		var ground = this.platforms.create(0, game.world.height - 64, 'ground');
		//  Scale it to fit the width of the game (the original sprite is 400x32 in size)
		ground.scale.setTo(2, 2);
		
		//  This stops it from falling away when you jump on it
		ground.body.immovable = true;

		//  Now let's create two ledges
		var ledge = this.platforms.create(400, 400, 'ground');
		ledge.body.immovable = true;
	 
		ledge = this.platforms.create(-150, 250, 'ground');
		ledge.body.immovable = true;

	},
	 inBattlezone: function() {
		alert('hi');
	},

	update: function() {
	},
};