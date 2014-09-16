People = function(game){
	this.game = game;
	this.mapping = {};
	this.group = null;
	this.states= [];
};

People.prototype = {
	preload: function(){
			this.game.load.spritesheet('dude', '/game/assets/dude.png', 32, 48);
	},
		
	create: function(){
		//  We're going to be using physics, so enable the Arcade Physics system
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	this.game.stage.backgroundColor = 0xffffff;

	this.createNPCs();
	this.convertScriptToFunction();
	},
		
	convertScriptToFunction: function(){
	data.acting.forEach(function(npcObj){
		var npc = this.getnpc(npcObj.name);
		var npc_actions = [];
		npcObj.fns.forEach(function(fn){
			npc_actions.push((npc[fn.shift()]).apply(npc,fn));
		});
		this.states.push(npc['npc_state'](npc_actions));
	});
},
	getnpc: function(name){
		return this.mapping[name];	
	},
	
	setnpc: function(name, npc){
		this.mapping[name] = npc;
	},

	update: function(){
		this.game.physics.arcade.collide(this.group);
	 this.states.forEach(function(state){
		  state.run();
	 });
	},
	
	createNPCs: function(){
	this.group = new Phaser.Group(this.game, this.game.world, 'people', true, true, Phaser.Physics.Arcade);
	 for (var i = 0; i < data.players.length; i++){
			var person = new Person(this.game, data.players[i]);
			this.setnpc(data.players[i], person);
			this.group.add(person);
		}
}
};