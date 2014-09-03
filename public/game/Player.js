Player = function(game) {

	this.game = game;
	this.sprite = null;
	this.cursors = null;
	this.label = null;
	
};

Player.prototype = {

	preload: function () {
		this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	},

	create: function () {
		this.sprite = game.add.sprite(32, game.world.height - 150, 'dude');

		//  We need to enable physics on the player
    	game.physics.arcade.enable(this.sprite);

	    //  Player physics properties. Give the little guy a slight bounce.
	    //this.sprite.body.bounce.y = 0.2;
	    //this.sprite.body.gravity.y = 300;
	    this.sprite.body.collideWorldBounds = true;

	    //  Our two animations, walking left and right.
	    this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
	    this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);

	    this.cursors = this.game.input.keyboard.createCursorKeys();
	    this.label = this.game.add.text(this.sprite.x, this.sprite.y, 'Pranav', { font: '8pt Helvetica Neue', fill: '#000' });
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
    	this.game.physics.arcade.collide(this.sprite, level.platforms);

    	this.game.physics.arcade.overlap(this.sprite, level.stars, this.collectStar, null, this);

		this.sprite.body.velocity.x = 0;
		this.sprite.body.velocity.y = 0;

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
	    
	    if(this.cursors.down.isDown)
	    {
	    	this.sprite.body.velocity.y = 250;
	    	
	    	this.sprite.animations.play('right');
	    }
	    else if (this.cursors.up.isDown)// && this.sprite.body.touching.down)
	    {
	        this.sprite.body.velocity.y = -250;
	        this.sprite.animations.play('left');
	    }
	    else{
	    	this.sprite.body.velocity.y = 0;	
	    }

	    if(!(this.cursors.up.isDown || this.cursors.down.isDown || this.cursors.right.isDown || this.cursors.left.isDown)){
    	this.sprite.animations.stop();
    	this.sprite.frame = 4;
	   }
	}
	    //  Allow the player to jump if they are touching the ground.
	   

};