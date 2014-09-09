Player = function(game, name) {
	this.game = game;
	this.sprite = null;
	this.cursors = null;
	this.label = null;
	this.name = name;
};

Player.prototype = {
	preload: function () {
		this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	},
	
	addAnimations: function() {
		this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
		this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
		this.sprite.animations.add('up', [4], 10, true);
		this.sprite.animations.add('down', [4], 10, true);
	},

	create: function () {
		this.sprite = game.add.sprite(game.world.width/2, game.world.height/2, 'dude');

		//  We need to enable physics on the player
		this.game.physics.arcade.enable(this.sprite);
		this.sprite.body.collideWorldBounds = true;
		//  Our two animations, walking left and right
		this.addAnimations();
		
		//add keyboard motion
		this.cursors = this.game.input.keyboard.createCursorKeys();
		
		(function addLabel(obj){
			obj.label = obj.game.add.text(obj.sprite.x, 	obj.sprite.y, obj.name, { font: '8pt Helvetica Neue', fill: '#000' });
		obj.label.align = 'center';
		})(this);
		
	},
	
	handleHorizontal: function () {
		if(this.cursors.down.isDown)
			{
				this.sprite.body.velocity.y = 250;    	
				this.sprite.animations.play('up');
			}
			else if (this.cursors.up.isDown)
			{
				this.sprite.body.velocity.y = -250;
				this.sprite.animations.play('down');
			}
			else{
				this.sprite.body.velocity.y = 0;	
			}
	},
	
	handleVertical: function () {
		if(this.cursors.left.isDown)
			{
				this.sprite.body.velocity.x = -250;

				this.sprite.animations.play('left');
			}
			else if(this.cursors.right.isDown)
			{
				this.sprite.body.velocity.x = 250;

				this.sprite.animations.play('right');
			}
			else{
				this.sprite.body.velocity.x = 0;
			}
	},
	
	handleStop: function () {
		if(!(this.cursors.up.isDown || this.cursors.down.isDown || this.cursors.right.isDown || 	this.cursors.left.isDown)){
				this.sprite.animations.stop();
				this.sprite.frame = 4;
			}
	},
	
	update: function() {
		this.label.x = this.sprite.x;
		this.label.y = this.sprite.y - 3;

		this.handleVertical();
		this.handleHorizontal();
		this.handleStop();
	}
};