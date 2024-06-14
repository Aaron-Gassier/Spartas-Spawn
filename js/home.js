document.getElementById('back-to-game-button').addEventListener('click', function() {
    window.location.href = 'game.html';
});

const canvas = document.getElementById('homeCanvas');
const ctx = canvas.getContext('2d');

const grid = {
    rows: 8,
    cols: 12,
    cellSize: 0 // Will be set dynamically
};

const sprite = {
    x: 6, // Starting column
    y: 4, // Starting row
    width: 0, // Will be set dynamically
    height: 0, // Will be set dynamically
    speed: 1, // One cell at a time
    image: new Image(),
    direction: 'right' // Track the direction the sprite is facing
};

const woodTexture = new Image();
woodTexture.src = 'images/pixel-wood.png';

sprite.image.src = 'images/mc.png';

function resizeCanvas() {
    const minSize = Math.min(window.innerWidth / grid.cols, window.innerHeight / grid.rows);
    grid.cellSize = minSize;

    // Set canvas width and height based on the calculated cell size and grid dimensions
    canvas.width = grid.cols * grid.cellSize;
    canvas.height = grid.rows * grid.cellSize;
    sprite.width = grid.cellSize;
    sprite.height = grid.cellSize;

    drawSprite();
}

function drawGrid() {
    for (let row = 0; row < grid.rows; row++) {
        for (let col = 0; col < grid.cols; col++) {
            ctx.drawImage(woodTexture, col * grid.cellSize, row * grid.cellSize, grid.cellSize, grid.cellSize);
        }
    }
}

function drawSprite() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    ctx.save();

    const spriteX = sprite.x * grid.cellSize;
    const spriteY = sprite.y * grid.cellSize;

    if (sprite.direction === 'left') {
        ctx.translate(spriteX + sprite.width, spriteY);
        ctx.scale(-1, 1);
        ctx.drawImage(sprite.image, 0, 0, sprite.width, sprite.height);
    } else {
        ctx.translate(spriteX, spriteY);
        ctx.drawImage(sprite.image, 0, 0, sprite.width, sprite.height);
    }

    ctx.restore();
}

function moveSprite(event) {
    switch(event.key) {
        case 'ArrowUp':
            if (sprite.y - sprite.speed >= 0) {
                sprite.y -= sprite.speed;
            }
            break;
        case 'ArrowDown':
            if (sprite.y + sprite.speed < grid.rows) {
                sprite.y += sprite.speed;
            }
            break;
        case 'ArrowLeft':
            if (sprite.x - sprite.speed >= 0) {
                sprite.x -= sprite.speed;
                sprite.direction = 'left'; // Change direction to left
            }
            break;
        case 'ArrowRight':
            if (sprite.x + sprite.speed < grid.cols) {
                sprite.x += sprite.speed;
                sprite.direction = 'right'; // Change direction to right
            }
            break;
    }
    drawSprite();
}

window.onload = function() {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
};

document.addEventListener('keydown', moveSprite);
