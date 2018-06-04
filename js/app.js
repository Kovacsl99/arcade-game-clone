"use strict";

const startBtn = document.querySelector('#start');
const endBtn = document.querySelector('#end');

endBtn.style.display = 'none';
startBtn.addEventListener('click', start);

// Enemies our player must avoid
let Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y =y;
    this.speed = speed;
}

Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt * 70;
    if (this.x > 505) {
        this.x = -83;
        this.speed = enemySpeed();
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//Player constructor
let Player = function(x, y) {
    this.score = 0;
    this.life =5;
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y =y;

    Player.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Life: " + player.life, 10, 40);
        ctx.fillText("Score: " + player.score, 430, 40);
        ctx.font = "11px Arial";
        ctx.fillText("Google Developer Scholarship Project 4", 150, 600);
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("Arcade Game Clone", 120, 40);
    }

    //it handles the player moves and the score
    Player.prototype.handleInput = function(keyup) {
        switch(keyup) {
            case 'left': 
                this.x -= 101;
                break;
            case 'right': 
                this.x += 101;
                break;
            case 'up': 
                this.y -= 83;
                break;
            case 'down': 
                this.y += 83;
                break;
        }

        if (this.y < 46) {
            this.score++;
        }

        this.x > 404 ? this.x = 0 : this.x = this.x;
        this.x < 0 ? this.x = 404 : this.x = this.x;
        this.y > 390 || this.y < 46 ? this.y = 390 : this.y = this.y;
    }
}


//create random speed
function enemySpeed() {
    return Math.floor(Math.random() * 5) + 3;
}

//enemies & player creation
let enemy1 = new Enemy(0, 63, enemySpeed());
let enemy2 = new Enemy(0, 146, enemySpeed());
let enemy3 = new Enemy(0, 229, enemySpeed());
let enemy4 = new Enemy(0, 63, enemySpeed());
let enemy5 = new Enemy(0, 146, enemySpeed());
let enemy6 = new Enemy(0, 229, enemySpeed());
let allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];
let player = new Player(202, 390);


//start game modal
function start() {
    startBtn.style.display = 'none';
    startBtn.removeEventListener('click', start);
    document.addEventListener('keyup', keys);
    endBtn.style.display = 'none';
    player.score = 0;
    player.life = 5;
} 

//player control keys
function keys(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
}

//checks the collision between the enemies and the player and handles the player's life
function checkCollisions() {
    for (const enem of allEnemies) {
        
        if (((enem.x + 80) >= player.x && (enem.x + 30) <= (player.x + 101)) && player.y === (enem.y-5)) {
            player.x = 202;
            player.y = 390;
            player.life === 1 ? end() : player.life--;
        }
    }
}

//endgame modal & new game button
function end() {
    player.life--;
    document.removeEventListener('keyup', keys);
    endBtn.style.display = 'inline';
    let point;
    player.score > 1 ? point = 'points' : point = 'point';
    endBtn.innerHTML = `<span>GAME OVER</span><br><br>
    Your score: ${player.score} ${point}.<br><br>
    Click for the new game!`;
    
    endBtn.addEventListener('click', start);
}
