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

	create: function () {
		this.sprite = game.add.sprite(32, game.world.height - 150, 'dude');

		//  We need to enable physics on the player
		this.game.physics.arcade.enable(this.sprite);
		this.sprite.body.collideWorldBounds = true;
		//  Our two animations, walking left and right.
		this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
		this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
		this.sprite.animations.add('up', [4], 10, true);
		this.sprite.animations.add('down', [4], 10, true);

		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.label = this.game.add.text(this.sprite.x, this.sprite.y, this.name, { font: '8pt Helvetica Neue', fill: '#000' });
		this.label.align = 'center';
	},

	collectStar: function(player, star) {
		// Removes the star from the screen
		star.kill();

		//  Add and update the score
		hud.score += 10;
		hud.scoreText.text = 'Score: ' + hud.score;
	},

	update: function() {
		this.label.x = this.sprite.x;
		this.label.y = this.sprite.y - 3;

		//  Collide the player and the stars with the platforms
		
		/*this.game.physics.arcade.collide(this.sprite, level.platforms);

		this.game.physics.arcade.collide(this.sprite, person.sprite);

		this.game.physics.arcade.overlap(this.sprite, level.stars, this.collectStar, null, this);
		
		*///this.sprite.body.setZeroVelocity();

		(function handleHorizontal(obj){
			if(obj.cursors.down.isDown)
			{
				obj.sprite.body.velocity.y = 250;    	
				obj.sprite.animations.play('up');
			}
			else if (obj.cursors.up.isDown)// && this.sprite.body.touching.down)
			{
				obj.sprite.body.velocity.y = -250;
				obj.sprite.animations.play('down');
			}
			else{
				obj.sprite.body.velocity.y = 0;	
			}
		})(this);
		
		(function handleVertical(obj){
			if(obj.cursors.left.isDown)
			{
				obj.sprite.body.velocity.x = -250;

				obj.sprite.animations.play('left');
			}
			else if(obj.cursors.right.isDown)
			{
				obj.sprite.body.velocity.x = 250;

				obj.sprite.animations.play('right');
			}
			else{
				obj.sprite.body.velocity.x = 0;
			}
		})(this);


		(function handleStop(obj){
			if(!(obj.cursors.up.isDown || obj.cursors.down.isDown || obj.cursors.right.isDown || 	obj.cursors.left.isDown)){
				obj.sprite.animations.stop();
				obj.sprite.frame = 4;
			}
		})(this);
	}
};