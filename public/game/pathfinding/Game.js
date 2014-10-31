
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'gameContainer', { preload: preload, create: create, update: update, render: render });

function preload() {

	game.load.tilemap('desert', 'desert.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.image('tiles', 'tmw_desert_spacing.png');
	game.load.image('car', 'car90.png');

}

var map;
var tileset;
var layer;
var pathfinder;

var cursors;
var sprite;
var marker;
var blocked = false;
var tween;
var pathDebug = false;

function create() {

	game.physics.startSystem(Phaser.Physics.ARCADE);

	map = game.add.tilemap('desert');
	map.addTilesetImage('Desert', 'tiles');
	layer = map.createLayer('Ground');
	layer.resizeWorld();

	var walkables = [30];

	pathfinder = game.plugins.add(Phaser.Plugin.PathFinderPlugin);
	pathfinder.setGrid(map.layers[0].data, walkables);

	sprite = game.add.sprite(450, 80, 'car');
	sprite.anchor.setTo(0.5, 0.5);

	game.physics.enable(sprite);

	game.camera.follow(sprite);

	cursors = game.input.keyboard.createCursorKeys();
	marker = game.add.graphics();
	marker.lineStyle(2, 0x000000, 1);
	marker.drawRect(0, 0, 32, 32);
	
	game.input.onDown.add(doSomething, this);
	
	function doSomething() {
  		console.log('here');
		blocked = true;
		findPathTo(layer.getTileX(marker.x), 						layer.getTileY(marker.y));
	}
	
	tween = game.add.tween(sprite);
}

function getWorldCoords(coord){
	var currentTile = map.getTile(coord.x, coord.y); 
	return {x:currentTile.worldX, y: currentTile.worldY};
}

function usePath(path){
	path = path || [];
	if(pathDebug ===true){
		for(var i = 0, ilen = path.length; i < ilen; i++) {
			map.putTile(46, path[i].x, path[i].y);
		}
	}
	blocked = false;
	
	var start = getWorldCoords(path[0]);
	
	var tween = game.add.tween(sprite.body);
	
	for(var i =0; i < path.length; i++){
		var wc = getWorldCoords(path[i]);
		tween.to({x: wc.x, y:wc.y}, 100, Phaser.Easing.Linear.None);
	}

	tween.interpolation(Phaser.Math.bezierInterpolation)
	.start()
	.onComplete.add(function(){
		
	});
	
}

function findPathTo(tilex, tiley) {

	pathfinder.setCallbackFunction(usePath);

	pathfinder.preparePathCalculation([layer.getTileX(sprite.x),layer.getTileY(sprite.y)], [tilex,tiley]);
	pathfinder.calculatePath();
}

function update() {
	game.physics.arcade.collide(sprite, layer);
	sprite.body.velocity.x = 0;
	sprite.body.velocity.y = 0;
	sprite.body.angularVelocity = 0;

	if (cursors.left.isDown)
	{
		sprite.body.angularVelocity = -200;
	}
	else if (cursors.right.isDown)
	{
		sprite.body.angularVelocity = 200;
	}

	if (cursors.up.isDown)
	{
	
		sprite.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(sprite.angle, 300));
	}

	marker.x = layer.getTileX(game.input.activePointer.worldX) * 32;
	marker.y = layer.getTileY(game.input.activePointer.worldY) * 32;

}

function render() {

}
