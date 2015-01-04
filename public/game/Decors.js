Decors = function(game) {
	this.game = game;
	this.platforms = null;
};

Decors.prototype = {
	preload: function() {
		this.game.load.image('bed', '/game/assets/bed.png');
		this.game.load.image('table', '/game/assets/table.jpg');

		this.game.load.image('hospital', '/game/assets/hospital-nice.png');


	},

	create: function(assets) {
		this.platforms = this.game.add.group();
		this.game.physics.arcade.enable(this.platforms);
		this.platforms.enableBody = true;

		var hospital = this.platforms.create((100*i)+110, 0, 'hospital');
		hospital.body.immovable = true;

		for (var i = 0; i < assets.length; i++){
			var decor_item = this.platforms.create(assets[i].loc[0], assets[i].loc[1], assets[i].name);
			console.log(assets[i].loc[0]);
			// decor_item.scale.setTo(0.35,0.35);
			decor_item.body.immovable = true;
		}


		// for(var i = 0; i < 3; i++){
		// 	var bed = this.platforms.create((100*i)+210, 150, assets[0].name); // bed
		// 	console.log(assets[0]);
		// 	bed.scale.setTo(0.35,0.35);
		// 	bed.body.immovable = true;
		// }
  //   	for(var j = 0; j < 1; j++){
	 //    	for(var i = 0; i < 1; i++){
		// 		var table = this.platforms.create((160*i)+40, (160*j)+ 250, assets[0][0]); //1
		// 		table.scale.setTo(0.55,0.55);
		// 		table.body.immovable = true;
		// 	}
		// }

	},
	update: function() {
	},
};