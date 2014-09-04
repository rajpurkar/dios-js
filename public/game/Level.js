
Level = function(game) {

	this.game = game;
	this.platforms = null;
	this.stars = null;
	this.map = null;
	this.layer1 = null;
	this.layer2 = null;
	this.layer3 = null;
};

function gofull() {

    if (game.scale.isFullScreen)
    {
        game.scale.stopFullScreen();
    }
    else
    {
        game.scale.startFullScreen();
    }

}

Level.prototype = {

	preload: function() {
		game.load.tilemap('map', 'assets/test.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/tiles.png');
		this.game.load.image('sky', 'assets/sky.png');
    	this.game.load.image('ground', 'assets/platform.png');
    	this.game.load.image('star', 'assets/star.png');
	},

	create: function() {
		// add background for this level
		game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
		//game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
		game.input.onDown.add(gofull, this);

		game.stage.backgroundColor = '#fff';
		//game.add.tileSprite(0, 0, 1000, 1000, 'sky');

    	//game.world.setBounds(0, 0, 1000, 1000);
    	this.map = game.add.tilemap('map');
    	this.map.addTilesetImage('tiles');
    	this.layer1 = this.map.createLayer('background');
    	//this.layer2 = this.map.createLayer('battlezone');
    	this.layer3 = this.map.createLayer('obstacles');
    	this.layer1.resizeWorld();
    	//this.layer2.resizeWorld();
    	this.layer3.resizeWorld();

        /*
        this.map.addTilesetImage('tiles');
        this.layer1 = this.map.createLayer('background');
        this.layer2 = this.map.createLayer('battlezone');
        this.layer3 = this.map.createLayer('obstacles');
		*/
		//this.game.add.sprite(0, 0, 'sky');

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

	    // create a group for stars
	    this.stars = game.add.group();
	    this.game.physics.arcade.enable(this.stars);
	    this.stars.enableBody = true;
	 
	    //  Here we'll create 12 of them evenly spaced apart
	    for (var i = 0; i < 12; i++)
	    {
	        //  Create a star inside of the 'stars' group
	        var star = this.stars.create(i * 70, 0, 'star');
	 
	        //  Let gravity do its thing
	        star.body.gravity.y = 6;
	 
	        //  This just gives each star a slightly random bounce value
	        star.body.bounce.y = 0.7 + Math.random() * 0.2;
	    }
	},

	update: function() {
	}

};