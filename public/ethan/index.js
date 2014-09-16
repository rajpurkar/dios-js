var game = new Phaser.Game(600, 600, Phaser.AUTO, 'phaser', { preload: preload, create: create, update: update });
var people;
var states = [];

function preload(){
	people = new People(game);
	people.preload();
}

function create(){
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	this.game.stage.backgroundColor = 0xffffff;

	people.create();
	convertScriptToFunction();
}

function convertScriptToFunction(){
	data.acting.forEach(function(npcObj){
		console.log(npcObj.name);
		var npc = people.getnpc(npcObj.name);
		var npc_actions = [];
		console.log(npc);
		npcObj.fns.forEach(function(fn){
			npc_actions.push((npc[fn[0]]).apply(npc,fn.slice(1, fn.length)));
		});
		states.push(npc['npc_state'](npc_actions));
	});
}

function update(){
	states.forEach(function(state){
		state.run();
	});
	people.update();
	

}