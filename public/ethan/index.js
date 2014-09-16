var game = new Phaser.Game(600, 600, Phaser.AUTO, 'phaser', { preload: preload, create: create, update: update });

function preload() {
	game.load.spritesheet('dude', '/game/assets/dude.png', 32, 48);
}
var people;
var m = {};
var states = [];

var Person = function(name){
	Phaser.Sprite.apply(this, [game, game.world.randomX, game.world.randomY, 'dude']);
	this.name = name;
};

Person.prototype = Phaser.Sprite.prototype; 
Person.prototype.constructor = Phaser;


Person.prototype.within = function(c1,c2,t){
		return Math.abs(c1.x - c2.x) <= t && Math.abs(c1.y - c2.y) <= t;
	};

Person.prototype.go_to_loc = function(coord){
		var npc = this;
		var close_enough = 30;
		var that = this;
		return function(){
			if(that.within(npc, coord, close_enough) === true){
				return true;
			}
			else{
				that.update_npc(npc,coord,70);
				return false;
			}
		};
	};
	
Person.prototype.go_to_person = function(name2){
		var npc = this;
		var npc2 = getnpc(name2);
		var close_enough = 70;
		var that = this;
		return function(){
			if(that.within(npc, npc2, close_enough) === true){
				return true;
			}
			else{
				that.update_npc(npc2,70);
				return false;
			}
		};
	};
	
Person.prototype.wait_for = function(name,name2){
		var npc = this;
		var coord = this.getnpc(name2);
		var close_enough = 30;
		var that = this;
		return function(){
			if(that.within(npc, coord, close_enough) === true){
				return true;
			}
		};
	};

Person.prototype.wait_for_action = function(name, act){
		var npc = getnpc(name);
		return function(){
			return npc.action === act;
		};
	};

Person.prototype.pause_animation = function(npc){
		npc.animations.play("down");
		npc.animations.stop();
		npc.body.velocity.x = 0;
		npc.body.velocity.y = 0;
	};
	
Person.prototype.npc_state = function(states){
		var npc = this;//.getnpc(name);
		npc.state_m = {
			state:0,
			paused:false,
			states:states,
			next:function(){
				npc.state_m.state = npc.state_m.state + 1;
				if(npc.state_m.state == npc.state_m.states.length){
					npc.state_m.state = 0;
				}
			},
			run:function(){
				if(npc.state_m.paused === false){
					var func = npc.state_m.states[npc.state_m.state];
					if(func.async === true){
						func.init();
						window.setTimeout(function(){
							func.cleanup();
						},func.time);
						npc.state_m.next();
					}
					else{
						if(func() == true){
							npc.state_m.next();
						}
					}
				}
			}
		};
		return npc.state_m;
	}
	Person.prototype.say = function(text,time){
		var that = this;
		var npc = this;
		return {
			async:true,
			init:function(){
				npc.state_m.paused = true;
				that.pause_animation(npc);
				if(npc.dialog !== undefined){
					npc.dialog.destroy();
				}
				npc.dialog = game.add.text(npc.x, npc.y-20, text, { font: '12px monaco', fill: '#000000' });
				npc.action = text;
			},
			cleanup:function(){
				npc.dialog.destroy();
				npc.action = null;
				npc.state_m.paused = false;
			},
			time:time
		};
	};
	Person.prototype.pause = function(time){
		var npc = this;
		var that = this;
		return {
			async:true,
			init:function(){
				npc.state_m.paused = true;
				that.pause_animation(npc);
			},
			cleanup:function(){
				npc.state_m.paused = false;
			},
			time:time
		};
	};
	Person.prototype.update_npc = function(goal, speed){
		var npc = this;
		var diffx = npc.x - goal.x;
		var diffy = npc.y - goal.y;
		if(Math.abs(diffx) > 5 * Math.abs(diffy)){
			npc.body.velocity.y = 0;
			if(diffx < 0){
				npc.body.velocity.x = speed;
				npc.animations.play("right");
			}
			else if (diffx > 0){
				npc.body.velocity.x = -speed;
				npc.animations.play("left");
			}
			else{
				npc.body.velocity.x = 0;
				npc.body.velocity.y = 0;
				npc.animations.stop();
			}
		}
		else{
			npc.body.velocity.x = 0;
			if(diffy < 0){
				npc.body.velocity.y = speed;
				npc.animations.play("down");
			}
			else if(diffy > 0){
				npc.body.velocity.y = -speed;
				npc.animations.play("up");
			}
			else{
				npc.body.velocity.y = 0;
				npc.body.velocity.x = 0;
				npc.animations.stop();
			}
		}
	};

var init_player = function(player){
	game.physics.arcade.enable(player);
	player.body.collideWorldBounds = true;
	player.animations.add('left', [0, 1, 2, 3], 10, true);
	player.animations.add('right', [5, 6, 7, 8], 10, true);
	player.animations.add('up', [4], 10, true);
	player.animations.add('down', [4], 10, true);
};

var addLabel = function(player, name){
		var label = this.game.add.text(0,0, name, { font: '10px Helvetica Neue', fill: '#000' });
		label.x = Math.floor((player.width - player.width)*0.5);
		label.y = Math.floor(player.height);
		label.align = 'center';
		player.addChild(label);
};

var createNPCs = function(){
	people = new Phaser.Group(game, game.world, 'people', true, true, Phaser.Physics.Arcade);
	//player = game.add.sprite(32, 32, 'dude');
	 for (var i = 0; i < data.players.length; i++)
    {
			var person = new Person(data.players[i]);
			m[data.players[i]] = person;
			init_player(person);	
			people.add(person);
			addLabel(person, data.players[i]);
	}
};

function getnpc(name){
		return m[name];	
}

function convertScriptToFunction(){
	data.acting.forEach(function(npcObj){
		var npc = getnpc(npcObj.name);
		var npc_actions = [];
		npcObj.fns.forEach(function(fn){
			npc_actions.push((npc[fn.shift()]).apply(npc,fn));
		});
		states.push(npc['npc_state'](npc_actions));
	});
}

function create() {

	//  We're going to be using physics, so enable the Arcade Physics system
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.stage.backgroundColor = 0xffffff;

	createNPCs();
	convertScriptToFunction();
}

 function update() {
	 game.physics.arcade.collide(people);
	 states.forEach(function(state){
		  state.run();
	 });
 }