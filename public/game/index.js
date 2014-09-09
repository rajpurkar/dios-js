var newGame = new (function(game){
	this.person = null;
	this.player = null;
	this.level = null;
	this.hud = null;
	this.tilemap = null;
	this.person = null;
	this.sprites = null;
	this.game = game; 
	
	this.preload = function()
	{
		this.tilemap = new Tilemap(this.game);
		this.tilemap.preload();
		
		this.level = new Level(this.game);
		this.level.preload();

		this.person = new Person(this.game, 'Worker');
		this.person.preload();

		this.player = new Player(this.game, 'Pranav');
		this.player.preload();

		this.hud = new HUD(this.game);
	}

	this.create = function()
	{
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.tilemap.create();
		this.level.create();
		this.player.create();
		this.person.create();
		this.hud.create();

		this.game.camera.follow(this.player.sprite);

		this.sprites = this.game.add.group();
		this.sprites.add(this.player.sprite);
		this.sprites.add(this.person.sprite);
	}

	this.update = function() 
	{
		this.tilemap.update();
		this.level.update();
		this.person.update();
		this.player.update();

		//somehow order matters!
		this.game.physics.arcade.collide(this.sprites, this.tilemap.layer3);
		this.game.physics.arcade.collide(this.player.sprite, this.tilemap.layer2);
		this.game.physics.arcade.collide(this.sprites);
		this.game.physics.arcade.collide(this.sprites, this.level.platforms);
	}

	this.render = function(){
		this.game.debug.cameraInfo(this.game.camera, 32, 32);
		this.game.debug.spriteCoords(this.player.sprite, 32, 100);
	}
})(game);

var game = new Phaser.Game(600, 300, Phaser.CANVAS, '', { preload: newGame.preload, create: newGame.create, update: newGame.update, render: newGame.render });