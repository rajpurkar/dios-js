var newGame = new (function(game){
	this.people = null;
	this.player = null;
	this.hud = null;
	this.path = null;
	this.tilemap = null;
	this.person = null;
	this.bubble = null;
	this.game = game; 
	this.states = null;
	
	this.preload = function()
	{
		//Use when there is a tilemap background
		//this.tilemap = new Tilemap(this.game);
		//this.tilemap.preload();
		
		this.decors = new Decors(this.game);
		this.decors.preload();
		
		this.people = new People(this.game);
		this.people.preload();
		
		this.player = new Player(this.game, 'Stephany');
		this.player.preload();
		
		this.bubble = new Bubble(this.game);
		this.bubble.preload();
		
		this.hud = new HUD(this.game);
	};
	
	this.create = function()
	{
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.stage.backgroundColor = 0xffffff;
		//Add these lines if want to enable full screen mode
		this.game.input.onDown.add(gofull, this);
		//this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT; //stretch screen; other options available
		
		//this.tilemap.create();
		this.decors.create();
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
		this.decors.update();
		this.people.update();
		this.player.update();
		this.bubble.update();
		

		this.states.forEach(function(state){
			state.run();
		});
		
		//somehow order matters!
		//this.game.physics.arcade.collide(this.player.sprite, this.tilemap.layer3);
	    //this.game.physics.arcade.collide(this.people.group, this.tilemap.layer3);
	    this.game.physics.arcade.collide(this.people.group, this.player.sprite);
	    this.game.physics.arcade.collide(this.people.group);
	    this.game.physics.arcade.collide(this.player.sprite, this.decors.platforms);
	    this.game.physics.arcade.collide(this.people.group, this.decors.platforms);
	};

	this.render = function(){
		debug = false; //set to true when wanting to see stats
		if(debug === true){
			this.game.debug.cameraInfo(this.game.camera, 32, 32);
			this.game.debug.spriteCoords(this.player.sprite, 32, 110);
			this.game.debug.spriteCoords(this.people.group, 32, 110);
		}
	};
})(game);

//takes in the script, and runs the game from it
<<<<<<< HEAD
function convertScriptToFunction(ppl, states){
	data.people.forEach(function(npcObj){
		var npc = ppl.getnpc(npcObj.name);
=======
function convertScriptToFunction(people, states){
	console.log(data["people"]);
	data.forEach(function(npcObj){ // extract static assets. data["assets"].forEach
		var npc = people.getnpc(npcObj.name);
>>>>>>> FETCH_HEAD
		var npc_actions = [];
		if(npcObj.fns){
			npcObj.fns.forEach(function(fn){
				npc_actions.push((npc[fn[0]]).apply(npc,fn.slice(1, fn.length)));
			});
			if(npc_actions.length > 0){
				states.push(npc['npc_state'](npc_actions));	
			}	
		}
	});
}

var game = new Phaser.Game(600, 600, Phaser.AUTO, 'phaser', { preload: newGame.preload, create: newGame.create, update: newGame.update, render: newGame.render });