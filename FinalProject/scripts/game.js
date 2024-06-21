const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const playAgainBtn = document.getElementById('playAgainBtn');

canvas.width = 480;
canvas.height = 320;

// Load images
const spaceshipImg = new Image();
spaceshipImg.src = 'images/rocket.gif';

const asteroidImg = new Image();
asteroidImg.src = 'images/asteroid.gif';

const spaceship = {
    x: canvas.width / 2 - 15,
    y: canvas.height - 60,
    width: 60,
    height: 60,
    dx: 5
};

let asteroids = [];
let score = 0;
let gameOver = false;

function drawSpaceship() {
    ctx.drawImage(spaceshipImg, spaceship.x, spaceship.y, spaceship.width, spaceship.height);
}

function createAsteroid() {
    const x = Math.random() * (canvas.width - 60);
    asteroids.push({ x, y: -60, width: 60, height: 60, dy: 2 });
}

function drawAsteroids() {
    asteroids.forEach((asteroid, index) => {
        ctx.drawImage(asteroidImg, asteroid.x, asteroid.y, asteroid.width, asteroid.height);
        asteroid.y += asteroid.dy;

        // Check collision with spaceship
        if (
            asteroid.x < spaceship.x + spaceship.width &&
            asteroid.x + asteroid.width > spaceship.x &&
            asteroid.y < spaceship.y + spaceship.height &&
            asteroid.y + asteroid.height > spaceship.y
        ) {
            gameOver = true;
        }

        // Remove asteroids that are out of bounds
        if (asteroid.y > canvas.height) {
            asteroids.splice(index, 1);
            score += 1;
        }
    });
}

function moveSpaceship() {
    if (rightPressed && spaceship.x < canvas.width - spaceship.width) {
        spaceship.x += spaceship.dx;
    } else if (leftPressed && spaceship.x > 0) {
        spaceship.x -= spaceship.dx;
    }
}

let rightPressed = false;
let leftPressed = false;

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '18px Arial';
    ctx.fillText(`Score: ${score}`, 8, 20);
}

function drawGameOver() {
    ctx.fillStyle = 'red';
    ctx.font = '40px Arial';
    ctx.fillText('Game Over', canvas.width / 4, canvas.height / 2);
}

function update() {
    if (gameOver) {
        drawGameOver();
        playAgainBtn.style.display = 'block';
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSpaceship();
    drawAsteroids();
    moveSpaceship();
    drawScore();

    requestAnimationFrame(update);
}

function startGame() {
    spaceship.x = canvas.width / 2 - 15;
    asteroids = [];
    score = 0;
    gameOver = false;
    playAgainBtn.style.display = 'none';
    update();
}

setInterval(createAsteroid, 2000);

update();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth < 480 ? window.innerWidth - 20 : 480;
    canvas.height = window.innerHeight < 320 ? window.innerHeight - 20 : 320;
});