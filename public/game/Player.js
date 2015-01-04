Player = function(game, name) {
	this.game = game;
	this.sprite = null;
	this.cursors = null;
	this.label = null;
	this.name = name;
	this.speed = 4;

};

Player.prototype = {
	preload: function () {
		this.game.load.spritesheet('you', '/game/assets/female-patient.png', 32, 48);
	},

	addAnimations: function() {
		this.sprite.animations.add('left', [7, 6, 7, 8], 10, true);
		this.sprite.animations.add('right', [4, 5, 4, 5], 10, true);
		this.sprite.animations.add('up', [3, 2, 3, 2], 10, true);
		this.sprite.animations.add('down', [1, 9, 1, 0], 10, true);

	},

	addLabel: function(){
		this.label = this.game.add.text(0,0, this.name, { font: '10px Helvetica Neue', fill: '#000' });
		this.label.x = Math.floor((this.sprite.width - this.label.width)*0.5);
		this.label.y = Math.floor(this.sprite.height);
		this.label.align = 'center';
		this.sprite.addChild(this.label);
	},

	createPlayer: function () {
		this.sprite = this.game.add.sprite(this.game.world.width/2-100, this.game.world.height/2-100, 'you');

		this.addLabel();
	},

	create: function () {
		this.createPlayer();
		//  We need to enable physics on the player
		this.game.physics.arcade.enable(this.sprite);
		this.sprite.body.collideWorldBounds = true;
		this.sprite.body.bounce.x = 0.01;
		this.sprite.body.bounce.y = 0.01;
		//  Our two animations, walking left and right
		this.addAnimations();
		//add keyboard motion
		this.cursors = this.game.input.keyboard.createCursorKeys();
	},

	handleVertical: function () {
		if(this.cursors.down.isDown)
		{
			this.sprite.body.y+=this.speed;    	
			this.sprite.animations.play('down');
			return true;
		}
		else if (this.cursors.up.isDown)
		{
			this.sprite.body.y-=this.speed;
			this.sprite.animations.play('up');
			return true;
		}
		else{
			//this.sprite.body = 0;
			return false;
		}
	},

	handleHorizontal: function () {
		if(this.cursors.left.isDown)
		{
			this.sprite.body.x-=this.speed;

			this.sprite.animations.play('left');
			return true;
		}
		else if(this.cursors.right.isDown)
		{
			this.sprite.body.x+=this.speed;
			this.sprite.animations.play('right');
			return true;
		}
		else{
			return false;
		}
	},

	handleStop: function () {
		this.sprite.animations.stop();
		this.sprite.body.velocity = 0;
		this.sprite.frame = 1;
	},

	update: function() {
		var hMove = this.handleHorizontal();
		var vMove = this.handleVertical();
		
		if(!vMove && !hMove){
			this.handleStop();
		}
	}
};