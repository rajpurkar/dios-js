Person = function(game, name) {

	this.game = game;
	this.sprite = null;
	this.cursors = null;
	this.label = null;
	this.name = name;
	this.cg = null;
};

Person.prototype = {

	preload: function () {
		this.game.load.image('char', 'assets/charizard.gif');
	},

	create: function () {

		this.sprite = game.add.sprite(70, game.world.height - 300, 'char');
		//  We need to enable physics on the player
		this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	
		//  Player physics properties. Give the little guy a slight bounce.
		//this.sprite.body.bounce.y = 0.2;
		//this.sprite.body.bounce.x = 0.2;
		//this.sprite.body.gravity.y = 300;
		this.sprite.body.collideWorldBounds = true;
		this.label = this.game.add.text(this.sprite.x, this.sprite.y, this.name, { font: '8pt Helvetica Neue', fill: '#000' });
		this.label.align = 'center';
	},

	update: function() {
		//  Collide the player and the stars with the platforms
		this.game.physics.arcade.collide(this.sprite, level.platforms);


		this.sprite.body.velocity.y = 0;    
		this.sprite.body.velocity.x = 0;
		//this.sprite.body.setZeroVelocity();
		this.label.x = this.sprite.x;
		this.label.y = this.sprite.y - 3;

		
	}
};