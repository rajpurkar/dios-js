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
	this.states = null;
	
	this.preload = function()
	{
		//this.tilemap = new Tilemap(this.game);
		//this.tilemap.preload();
		
		this.level = new Level(this.game);
		this.level.preload();
		
		this.people = new People(this.game);
		this.people.preload();
		
		this.player = new Player(this.game, 'Pranav');
		this.player.preload();
		
		this.bubble = new Bubble(this.game);
		this.bubble.preload();
		
		this.hud = new HUD(this.game);
	};
	
  function convertScriptToFunction(people, states){
		data.acting.forEach(function(npcObj){
			console.log(npcObj.name);
			var npc = people.getnpc(npcObj.name);
			var npc_actions = [];
			npcObj.fns.forEach(function(fn){
				npc_actions.push((npc[fn[0]]).apply(npc,fn.slice(1, fn.length)));
			});
			states.push(npc['npc_state'](npc_actions));
		});
	}
	
	this.create = function()
	{
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
	 this.game.stage.backgroundColor = 0xffffff;

		//this.tilemap.create();
		this.level.create();
		this.player.create();
		this.people.create();
		this.bubble.create(this.player);
		this.hud.create();
		
		
		/*Path stuff which is not working*/
    	//this.game.input.onDown.add(movePlayer,this);
		
		this.game.camera.follow(this.player.sprite);

		this.states = [];
		convertScriptToFunction(this.people, this.states);
		
	};

	this.update = function() 
	{
		//this.tilemap.update();
		this.level.update();
		this.people.update();
    this.player.update();
		this.bubble.update();
		

		this.states.forEach(function(state){
			state.run();
		});
		//somehow order matters!
		//this.game.physics.arcade.collide(this.player.sprite, this.tilemap.layer3);
    //this.game.physics.arcade.collide(this.people.group, this.tilemap.layer3);
    this.game.physics.arcade.collide(this.people.group);
    this.game.physics.arcade.collide(this.people.group, this.player.sprite);
		this.game.physics.arcade.collide(this.sprites, this.level.platforms);
	};

	this.render = function(){
		//this.game.debug.cameraInfo(this.game.camera, 32, 32);
		//this.game.debug.spriteCoords(this.player.sprite, 32, 110);
    //this.game.debug.spriteCoords(this.people.group, 32, 110);
	};
	
})(game);


function movePlayer(){
	var pathy = new Path(this.game, this.tilemap, [0], this.player.sprite);
	var that = this;
	pathy.findPathTo(this.game.input.activePointer.worldX, this.game.input.activePointer.worldY, function(path){
    if(path.length >0){
      
		var tween = that.game.add.tween(that.player.sprite.body);
		for(var i =0; i < path.length; i++){
			var wc = pathy.getWorldCoords(path[i]);
			tween.to({x: wc.x, y:wc.y}, 100, Phaser.Easing.Linear.None);
		}
		tween.interpolation(Phaser.Math.bezierInterpolation)
		.start();
    }
	});
}

var game = new Phaser.Game(600, 600, Phaser.AUTO, 'phaser', { preload: newGame.preload, create: newGame.create, update: newGame.update, render: newGame.render });