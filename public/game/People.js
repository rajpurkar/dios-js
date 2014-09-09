People = function(game, name) {
	this.game = game;
	this.sprite = null;
	this.cursors = null;
	this.label = null;
	this.name = name;
};

People.prototype = {

	preload: function () {
		this.game.load.spritesheet('char', 'assets/dude.png',32,48);
	},
	
	addLabel: function(){
		this.label = this.game.add.text(0,0, this.name, { font: '10px Helvetica Neue', fill: '#000' });
		this.label.x = Math.floor((this.sprite.width - this.label.width)*0.5);
		this.label.y = Math.floor(-10);
		this.label.align = 'center';
		this.sprite.addChild(this.label);
	},

	create: function () {
		this.sprite = this.game.add.sprite(this.game.world.width/2 - 70, this.game.world.height/2, 'char');
		this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.body.collideWorldBounds = true;
		this.addLabel();
	},

	update: function() {
		//  Collide the player and the stars with the platforms
		this.sprite.body.velocity.y = 0;    
		this.sprite.body.velocity.x = 0;
	}
};