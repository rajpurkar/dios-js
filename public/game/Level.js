Level = function(game) {
	this.game = game;
	this.platforms = null;
};

Level.prototype = {
	preload: function() {
		this.game.load.image('sky', '/game/assets/sky.png');
		this.game.load.image('ground', '/game/assets/platform.png');
		this.game.load.image('star', '/game/assets/star.png');
	},

	create: function() {
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
	update: function() {
	},
};