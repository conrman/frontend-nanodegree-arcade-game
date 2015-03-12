// Enemies our player must avoid
var Enemy = function(pos) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = pos.x;
    this.y = pos.y;
    this.speed = 10;

    return this;
}


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 550) {
        this.x = -100;
    } else {
        this.x = this.x + this.speed;
    }

    ctx.drawImage(Resources.get(this.sprite), this.x*dt, this.y*dt);
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(pos) {
    this.sprite = 'images/char-boy.png';
    this.x = pos.x;
    this.y = pos.y;

    return this;
}


Player.prototype.render = function() {
    // console.log(Player.position);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.update = function() {
    // console.log(Enemy.x);

    if (this.x === Enemy.x || this.y === Enemy.y) {
        ctx.drawImage(Resources.get(this.sprite), 200, 400);
    }
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(userInput) {

    // Move player 
    this.move(userInput, 100);

    // console.log('player: ' + this.x + ' ' + this.y);
}

Player.prototype.move = function(direction, distance) {
    switch(direction) {
        case 'left':
            this.x = this.x - distance;
        break;
        case 'right':
            this.x = this.x + distance;
        break;
        case 'up':
            this.y = this.y - distance;
        break;
        case 'down':
            this.y = this.y + distance;
        break;
    }
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var e1 = new Enemy({ x: 0, y: 50 });
var e2 = new Enemy({ x: 0, y: 150 });
var e3 = new Enemy({ x: 0, y: 230 });

var allEnemies = [ e1, e2, e3 ];

var player = new Player({ x: 200, y: 400});


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
