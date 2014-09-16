People = function(game){
	this.game = game;
	this.mapping = {};
	this.group;
};

People.prototype = {
	preload: function(){
		//this.game.load.spritesheet('dude', '/game/assets/dude.png', 32, 48);
	},

	create: function(){
		//  We're going to be using physics, so enable the Arcade Physics system
		this.createNPCs();
	},
	
	getnpc: function(name){
		return this.mapping[name];	
	},

	setnpc: function(name, npc){
		this.mapping[name] = npc;
	},

	update: function(){
	},

	createNPCs: function(){
		this.group = new Phaser.Group(this.game, this.game.world, 'people', false, true, Phaser.Physics.Arcade);
		for (var i = 0; i < data.players.length; i++){
			var person = new Person(this.game, data.players[i], this);
			this.setnpc(data.players[i], person);
			this.group.add(person);
		}
	}
};