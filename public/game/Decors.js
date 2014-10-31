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
		this.platforms = this.game.add.group();
		this.game.physics.arcade.enable(this.platforms);
		this.platforms.enableBody = true;

		// Here we create the ground.
		//  Now let's create two ledges
		for(var i = 0; i < 4; i++){
			var bed = this.platforms.create((100*i)+110, 50, 'bed');
			bed.scale.setTo(0.35,0.35);
			bed.body.immovable = true;
		}
    	for(var j = 0; j < 2; j++){
	    	for(var i = 0; i < 1; i++){
				var table = this.platforms.create((160*i)+40, (160*j)+ 250, 'table');
				table.scale.setTo(0.55,0.55);
				table.body.immovable = true;
			}
		}
	},
	update: function() {
	},
};