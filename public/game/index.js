var newGame = new (function(game){
	this.people = null;
	this.player = null;
	this.level = null;
	this.hud = null;
	this.path = null;
	this.tilemap = null;
	this.person = null;
	this.sprites = null;
	this.bubble = null;
	this.game = game; 
	
	this.preload = function()
	{
		this.tilemap = new Tilemap(this.game);
		this.tilemap.preload();
		
		this.level = new Level(this.game);
		this.level.preload();

		this.people = new People(this.game, 'Worker');
		this.people.preload();

		this.player = new Player(this.game, 'Pranav');
		this.player.preload();
		
		this.bubble = new Bubble(this.game);
		this.bubble.preload();
		
		this.hud = new HUD(this.game);
	}
	
	
	this.create = function()
	{
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.tilemap.create();
		this.level.create();
		this.player.create();
		this.people.create();
		this.bubble.create(this.player);
		this.hud.create();
		
		/*Path stuff which is not working*/
		//this.path = new Path(this.game, this.tilemap, [0], this.player.sprite);
		//this.game.input.onDown.add(doSomething,this);
		
		this.game.camera.follow(this.player.sprite);

		this.sprites = this.game.add.group();
		this.sprites.add(this.player.sprite);
		this.sprites.add(this.people.sprite);
	}

	this.update = function() 
	{
		this.tilemap.update();
		this.level.update();
		this.people.update();
		this.player.update();
		this.bubble.update();

		//somehow order matters!
		this.game.physics.arcade.collide(this.sprites, this.tilemap.layer3);
		this.game.physics.arcade.collide(this.people.sprite, this.tilemap.layer2);
		this.game.physics.arcade.collide(this.sprites);
		this.game.physics.arcade.collide(this.sprites, this.level.platforms);
	}

	this.render = function(){
		this.game.debug.cameraInfo(this.game.camera, 32, 32);
		this.game.debug.spriteCoords(this.player.sprite, 32, 110);
	}
})(game);


var game = new Phaser.Game(600, 300, Phaser.CANVAS, '', { preload: newGame.preload, create: newGame.create, update: newGame.update, render: newGame.render });