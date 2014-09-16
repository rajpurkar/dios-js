Decors = function(game) {
	this.game = game;
	this.platforms = null;
};

Decors.prototype = {
	preload: function() {
		this.game.load.image('bed', '/game/assets/bed2.png');
		this.game.load.image('table', '/game/assets/table.jpg');
	},

	create: function() {
		//  The platforms group contains the ground and the 2 ledges we can jump on
		this.platforms = game.add.group();
		this.game.physics.arcade.enable(this.platforms);
		//  We will enable physics for any object that is created in this group
		this.platforms.enableBody = true;

		// Here we create the ground.
		//  Now let's create two ledges
		for(var i = 0; i < 5; i++){
			var bed = this.platforms.create((120*i)+10, 400, 'bed');
			bed.scale.setTo(0.4,0.4);
			bed.body.immovable = true;
		}
    
    for(var i = 0; i < 5; i++){
			var table = this.platforms.create((120*i)+10, 200, 'table');
			table.scale.setTo(0.4,0.4);
			table.body.immovable = true;
		}
	},
	update: function() {
	},
};