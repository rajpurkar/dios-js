/* Credits to http://jsfiddle.net/lewster32/81pzgs4z/ */

SpeechBubble = function(game, x, y, width, text) {
	this.game = game;
	
    Phaser.Sprite.call(this, this.game, x, y);
    
    // Some sensible minimum defaults
    width = width || 27;
    var height = 18;
    
    // Set up our text and run our custom wrapping routine on it
    this.bitmapText = this.game.make.bitmapText(x + 12, y + 4, '8bitoperator', text, 22);
    SpeechBubble.wrapBitmapText(this.bitmapText, width);
    
    // Calculate the width and height needed for the edges
    var bounds = this.bitmapText.getLocalBounds();
    if (bounds.width + 18 > width) {
        width = bounds.width + 18;
    }
    if (bounds.height + 14 > height) {
        height = bounds.height + 14;
    }
    
    // Create all of our corners and edges
    this.borders = [
        this.game.make.tileSprite(x + 9, y + 9, width - 9, height - 9, 'bubble-border', 4),
        this.game.make.image(x, y, 'bubble-border', 0),
        this.game.make.image(x + width, y, 'bubble-border', 2),
        this.game.make.image(x + width, y + height, 'bubble-border', 8),
        this.game.make.image(x, y + height, 'bubble-border', 6),
        this.game.make.tileSprite(x + 9, y, width - 9, 9, 'bubble-border', 1),
        this.game.make.tileSprite(x + 9, y + height, width - 9, 9, 'bubble-border', 7),
        this.game.make.tileSprite(x, y + 9, 9, height - 9, 'bubble-border', 3),
        this.game.make.tileSprite(x + width, y + 9, 9, height - 9, 'bubble-border', 5)
    ];  
    
    // Add all of the above to this sprite
    for (var b = 0, len = this.borders.length; b < len; b++) {
        this.addChild(this.borders[b]);   
    }

    // Add the tail
    this.tail = this.addChild(this.game.make.image(x + 18, y + 3 + height, 'bubble-tail'));

    // Add our text last so it's on top
    this.addChild(this.bitmapText);
    this.bitmapText.tint = 0x111111;
    
    // Offset the position to be centered on the end of the tail
    this.pivot.set(x + 25, y + height + 24);
};

SpeechBubble.prototype = Object.create(Phaser.Sprite.prototype);
SpeechBubble.prototype.constructor = SpeechBubble;

SpeechBubble.wrapBitmapText = function (bitmapText, maxWidth) {
    var words = bitmapText.text.split(' '), output = "", test = "";
    
    for (var w = 0, len = words.length; w < len; w++) {
        test += words[w] + " ";
        bitmapText.text = test;
        bitmapText.updateText();
        if (bitmapText.textWidth > maxWidth) {
            output += "\n" + words[w] + " ";
        }
        else {
            output += words[w] + " ";
        }
        test = output;
    }   
    output = output.replace(/(\s)$/gm, ""); // remove trailing spaces
    bitmapText.text = output;
    bitmapText.updateText();
}

Bubble = function (game){
	this.game = game;
};

Bubble.prototype = {
	preload: function(){
		this.game.load.spritesheet('bubble-border', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbAgMAAADwuhzGAAAADFBMVEUAAAD///8AAADMzMyl8w72AAAAAXRSTlMAQObYZgAAADlJREFUCNdjYGDQWrWqgQGT5poaGpqFSTMtDQWCFRj0PyrR/3+B7cGgmf+/AroLk2bg////AwMGDQCR0FKxG5KiwAAAAABJRU5ErkJggg==', 9, 9);
        this.game.load.image('bubble-tail', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVAgMAAADUeU0FAAAADFBMVEUAAAAAAAD////MzMyoZCTaAAAAAXRSTlMAQObYZgAAAC1JREFUCNdjCA3NWrXUAY36/xULxYyN+hu1amUAAyYVwoBBhYYyYFDh/w9gUADQUTeozcOYAwAAAABJRU5ErkJggg==');
        this.game.load.bitmapFont('8bitoperator', 'assets/font.png', 'assets/font.xml');
	},
	
	create: function(){
		var bubble = this.game.world.add(new SpeechBubble(game, 110, 190, 256, "This is some tail woah dadklsjdal "));
	},
	
	update: function(){
		
	}
};