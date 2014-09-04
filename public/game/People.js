Person = function(game, name) {
	this.game = game;
	this.sprites = null;
	this.cursors = null;
	this.label = null;
	this.name = name;
};

Person.prototype = {

	preload: function () {
		this.game.load.image('char', 'assets/charizard.gif');
	},

	create: function () {
		this.sprites = game.add.group();
		this.sprite = this.sprites.create(70, game.world.height - 300, 'char');
		this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.body.collideWorldBounds = true;
		this.label = this.game.add.text(this.sprite.x, this.sprite.y, this.name, { font: '8pt Helvetica Neue', fill: '#000' });
		this.label.align = 'center';
	},

	update: function() {
		//  Collide the player and the stars with the platforms
		this.sprite.body.velocity.y = 0;    
		this.sprite.body.velocity.x = 0;
		this.label.x = this.sprite.x;
		this.label.y = this.sprite.y - 3;

		
	}
};