// Enemies our player must avoid
var Enemy = function(pos) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = pos.x;
    this.y = pos.y;
    this.speed = enemySpeed(3, 7); // between 3 and 7

    function enemySpeed(min, max) {
        return Math.floor(Math.random() * max) + max;
    }

    return this;
}


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 550) {
        this.x = -101;
    } else {
        this.x = this.x + this.speed;
        // console.log(Resources.get(this.sprite).width);
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

    this.MOVEX = 101;
    this.MOVEY = 83;

    return this;
}


Player.prototype.render = function() {
    // console.log(this.x);

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
    // TODO:
    // boolean isValidMove()
    // return true if in bounds, or if no errors

    // Move player 
        switch(userInput) {
            case 'left':
                var nextXmove = this.x - this.MOVEX;
                if(nextXmove >= -2) {
                    this.x = this.x - this.MOVEX;
                } else {
                    this.resetPlayer();
                }
            break;
            case 'right':
                var nextXmove = this.x + this.MOVEX;
                if(nextXmove <= 500) {
                    this.x = this.x + this.MOVEX;
                } else {
                    this.resetPlayer();
                }
            break;
            case 'up':
                var nextYmove = this.y + this.MOVEY;
                if(nextYmove >= -35) {
                    this.y = this.y - this.MOVEY;
                } else {
                    this.resetPlayer();
                }
            break;
            case 'down':
                var nextYmove = this.y - this.MOVEY;
                if(nextYmove <= 360) {
                    this.y = this.y + this.MOVEY;
                } else {
                    this.resetPlayer();
                }
            break;
        }

    // console.log(this.isValidMove());

    console.log('player: ' + this.x + ' ' + this.y);
}

Player.prototype.resetPlayer = function() {
    this.x = 200;
    this.y = 380;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var e1 = new Enemy({ x: 0, y: 60 });
var e2 = new Enemy({ x: 0, y: 150 });
var e3 = new Enemy({ x: 0, y: 230 });

var allEnemies = [ e1, e2, e3 ];

var player = new Player({ x: 200, y: 380});


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
