People = function(game){
	this.game = game;
	this.mapping = {};
	this.group;
};

People.prototype = {
	preload: function(){
		this.game.load.spritesheet('doctor', '/game/assets/doctor.png', 26, 46);
		this.game.load.spritesheet('doctor1', '/game/assets/doctor.png', 26, 46);
		this.game.load.spritesheet('nurse', '/game/assets/nurse.png', 32, 48);
		this.game.load.spritesheet('dude', '/game/assets/dude.png', 32, 48);
		this.game.load.spritesheet('baby', '/game/assets/baby.png', 30,30);
		this.game.load.spritesheet('Chandler', '/game/assets/male-patient2.png', 20, 48);
		this.game.load.spritesheet('Ross', '/game/assets/patient-thin.png', 20, 48);

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
		game.physics.arcade.enable(this.group);
		for (var i = 0; i < data.people.length; i++){
			var person = new Person(this.game, data.people[i].name, this, data.people[i].loc);
			this.setnpc(data.people[i].name, person);
			this.group.add(person);
		}
	}
};