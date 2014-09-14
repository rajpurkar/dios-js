var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	game.load.image('sky', '/ethan/sky.png');
	game.load.spritesheet('dude', '/ethan/body-alpha.png', 21, 47);
}

var player;
var people;
var list = ['doctor', 'nurse', 'patient','patient', 'doctor2'];
var m = {};
var states = [];
var hello;

var init_player = function(player){
	game.physics.arcade.enable(player);
	player.body.collideWorldBounds = true;
	player.animations.add('backward', [0, 1, 2, 3], 10, true);
	player.animations.add('left', [4, 5, 6, 7], 10, true);
	player.animations.add('forward', [8, 9, 10, 11], 10, true);
	player.animations.add('right', [12, 13, 14, 15], 10, true);
};

var createNPCs = function(){
	people = new Phaser.Group(game, game.world, 'people', true, true, Phaser.Physics.Arcade);
	player = game.add.sprite(32, 32, 'dude');
	 for (var i = 0; i < 2; i++)
    {
        var sprite = people.create(game.world.randomX, 	game.world.randomY, 'dude');
		init_player(sprite);
	}
	for(var i = 0; i< people.length; i++){
		var p = people.getAt(i);
		console.log(i, p);
		m[list[i]] = p;
	}
	people.add(player);
};
hello = {
	within: function(c1,c2,t){
		return Math.abs(c1.x - c2.x) <= t && Math.abs(c1.y - c2.y) <= t;
	},

	go_to_loc : function(name, coord){
		var npc = this.getnpc(name);
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
	},
	go_to_person: function(name,name2){
		var npc = this.getnpc(name);
		var npc2 = this.getnpc(name2);
		var close_enough = 30;
		var that = this;
		return function(){
			if(that.within(npc, npc2, close_enough) === true){
				return true;
			}
			else{
				that.update_npc(npc,npc2,70);
				return false;
			}
		};
	},
	wait_for : function(name,name2){
		var npc = this.getnpc(name);
		var coord = this.getnpc(name2);
		var close_enough = 30;
		var that = this;
		return function(){
			if(that.within(npc, coord, close_enough) === true){
				return true;
			}
		};
	},

	wait_for_action : function(name,act){
		var npc = this.getnpc(name);
		return function(){
			return npc.action === act;
		};
	},

	pause_animation: function(npc){
		npc.animations.play("backward");
		npc.animations.stop();
		npc.body.velocity.x = 0;
		npc.body.velocity.y = 0;
	},

	getnpc : function(name){
		return m[name];	
	},
	
	npc_state: function(name,states){
		var npc = this.getnpc(name);
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
	},
	say_pause :function(text,name,time){
		var npc = this.getnpc(name);
		var that = this;
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
	},
	pause: function(name,time){
		var npc = this.getnpc(name);
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
	},
	update_npc : function(npc, goal, speed){
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
				npc.animations.play("backward");
			}
			else if(diffy > 0){
				npc.body.velocity.y = -speed;
				npc.animations.play("forward");
			}
			else{
				npc.body.velocity.y = 0;
				npc.body.velocity.x = 0;
				npc.animations.stop();
			}
		}
	}
};

function create() {

	//  We're going to be using physics, so enable the Arcade Physics system
	game.physics.startSystem(Phaser.Physics.ARCADE);

	//  A simple background for our game
	game.add.sprite(0, 0, 'sky');

	createNPCs();
	init_player(player);
	//people.forEach(init_player);
	
	
	states.push(hello['npc_state']('doctor',
								 [ hello['say_pause']("I am a doctor", 'doctor', 2000),
								  //hello['go_to_person']('doctor', 'patient'),
								  hello['say_pause']("(cutting cord...)",'doctor', 2000),
								 // say_pause("(wrapping bandage...)",'doctor', 2000),
								  hello['go_to_person']('doctor', 'nurse'),
								  hello['say_pause']("(instructing nurse...)", 'doctor', 2000),
								 // pause('doctor',2000)
								 ]));
	states.push(hello['npc_state']('nurse',
							[ hello['say_pause']("I am a nurse.", 'nurse', 2000),
							 hello['wait_for_action']('doctor',"(instructing nurse...)"),
							 hello['pause']('nurse', 1000),
							 hello['say_pause']("(open door...)", 'nurse', 2000),
							 //go_to_person('nurse', 'patient'),
							 //say_pause("(call name...)", 'nurse', 2000),
							//go_to_loc('nurse', function() { return {x:300, y:300}; }),
							]
							 ));
		/*					 
	states.push(npc_state('patient',
							  [ say_pause("I am lying in the hospital.", 'patient', 2000),
							   pause('patient', 5000),
							   say_pause("Now I am leaving the hospital.", 'patient', 2000),
							   pause('patient', 1000),
							  ]));
	}
*/
  }
 function update() {
	 game.physics.arcade.collide(people);
	 game.physics.arcade.collide(people, player);
	 states.forEach(function(state){
		  state.run();
	 });
}
