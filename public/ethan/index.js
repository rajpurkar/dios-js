var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	game.load.image('sky', '/ethan/sky.png');
	game.load.spritesheet('dude', '/ethan/body-alpha.png', 21, 47);
}

var player;
var people;
var list = ['doctor', 'doctor2', 'patient','patient', 'nurse'];
var m = {};
var states = [];

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
	people.add(player);
	people.createMultiple(5,'dude', 0, true);
	/*
	//  We will enable physics for any object that is created in this group
	doctor = game.add.sprite(62, 150, 'dude');
	doctor2 = game.add.sprite(500, 50, 'dude');
	nurse = game.add.sprite(162, 200, 'dude');
	patient = game.add.sprite(202, 400, 'dude');
	patient2 = game.add.sprite(450, 200, 'dude');

	people.add(doctor);
	*/
	/*people.add(doctor2);
	people.add(nurse);
	people.add(patient);
	people.add(patient2);
	*/
	for(var i = 0; i< people.length; i++){
		var p = people.getAt(i);
		m[list[i]] = p;
	}
};

function create() {

	//  We're going to be using physics, so enable the Arcade Physics system
	game.physics.startSystem(Phaser.Physics.ARCADE);

	//  A simple background for our game
	game.add.sprite(0, 0, 'sky');

	createNPCs();
	init_player(player);
	people.forEach(init_player);

	var update_npc = function(npc, goal, speed){
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
	};

	var within = function(c1,c2,t){
		return Math.abs(c1.x - c2.x) <= t && Math.abs(c1.y - c2.y) <= t;
	};

	var go_to_place = function(name,coord){
		var npc = getnpc(name);
		var close_enough = 30;
		return function(){
			if(within(npc, coord(), close_enough) === true){
				return true;
			}
			else{
				update_npc(npc,coord(),70);
				return false;
			}
		};
	};

	var wait_for = function(name,name2){
		var npc = getnpc(name);
		var coord = getnpc(name2);
		var close_enough = 30;
		return function(){
			if(within(npc, coord(), close_enough) === true){
				return true;
			}
		};
	};

	var wait_for_action = function(name,act){
		var npc = getnpc(name);
		return function(){
			return npc.action === act;
		};
	};

	var pause_animation = function(npc){
		npc.animations.play("backward");
		npc.animations.stop();
		npc.body.velocity.x = 0;
		npc.body.velocity.y = 0;
	};

	var getnpc = function(name){
		return m[name];	
	}
	
	var npc_state = function(name,states){
		var npc = getnpc(name);
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
	};

	var say_pause = function(text,name,time){
		var npc = getnpc(name);
		return {
			async:true,
			init:function(){
				npc.state_m.paused = true;
				pause_animation(npc);
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

	var pause = function(name,time){
		var npc = getnpc(name);
		return {
			async:true,
			init:function(){
				npc.state_m.paused = true;
				pause_animation(npc);
			},
			cleanup:function(){
				npc.state_m.paused = false;
			},
			time:time
		};
	};
	
	
	states.push(npc_state('doctor',
								 [ say_pause("I am a doctor", 'doctor', 2000),
								  //go_to_place('doctor', function() { return 'patient'; }),
								  say_pause("(cutting cord...)",'doctor', 2000),
								  say_pause("(wrapping bandage...)",'doctor', 2000),
								  //go_to_place('doctor', function() { return 'nurse'; }),
								  //say_pause("(instructing nurse...)", 'nurse', 2000),
								  pause('doctor',2000)
								 ]));
	/*
	doctor2_state = npc_state('doctor2',
							  [ say_pause("I am a doctor", m[list[1]], 2000),
							   wait_for_action(nurse, "(call name...)"),
							   go_to_place(doctor2, function() { return patient2; }),
							   say_pause("(pull cloth...)", doctor2, 2000),
							   say_pause("(unwrap bandage...)", doctor2, 2000),
							   say_pause("(give pill...)", doctor2, 2000),
							   go_to_place(doctor2, function(){ return {x:500, y:50};})
							  ]);

	patient_state = npc_state(people.getAt(2),
							  [ say_pause("I am lying in the hospital.", patient, 2000),
							   wait_for(patient, function(){ return doctor; }),
							   pause(patient, 5000),
							   say_pause("Now I am leaving the hospital.", patient, 2000),
							   pause(patient, 1000),
							  ]);

							   patient2_state = npc_state(people.getAt(3),
							   [ say_pause("I arrive at the hospital.", patient2, 2000),
							   wait_for(patient2, function(){ return doctor2; }),
							   pause(patient2, 7000),
							   say_pause("Now I am leaving the hospital.", patient, 2000),
							   pause(patient2, 1000),
							  ]);

	nurse_state = npc_state(people.getAt(4),
							[ say_pause("I am a nurse.", nurse, 2000),
							 wait_for_action(doctor,"(instructing nurse...)"),
							 pause(nurse, 1000),
							 say_pause("(open door...)", nurse, 2000),
							 go_to_place(nurse, function() { return patient2; }),
							 say_pause("(call name...)", nurse, 2000),
							 go_to_place(nurse, function() { return {x:300, y:300}; }),
							]
							 );
							 */
							 }

	 function update() {
	 game.physics.arcade.collide(people);
	 game.physics.arcade.collide(people, player);
	 states.forEach(function(state){
	 state.run();
	 });
 	}
