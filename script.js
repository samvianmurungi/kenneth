document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('gameArea');
    const snake = document.getElementById('snake');
    const food = document.getElementById('food');

    let snakeX = 0;
    let snakeY = 0;
    let foodX = 0;
    let foodY = 0;
    let score = 0;
    let speed = 200; // milliseconds

    function randomPosition() {
        return Math.floor(Math.random() * 20) * 20; // 20 is the size of each grid cell
    }

    function updateFoodPosition() {
        foodX = randomPosition();
        foodY = randomPosition();
        food.style.left = foodX + 'px';
        food.style.top = foodY + 'px';
    }

    function checkCollision() {
        if (snakeX === foodX && snakeY === foodY) {
            score++;
            speed -= 5; // increase speed as score increases
            updateFoodPosition();
        }
    }

    function updateScore() {
        document.getElementById('score').innerText = 'Score: ' + score;
    }

    function moveSnake() {
        checkCollision();

        // Move snake
        switch (direction) {
            case 'up':
                snakeY -= 20;
                break;
            case 'down':
                snakeY += 20;
                break;
            case 'left':
                snakeX -= 20;
                break;
            case 'right':
                snakeX += 20;
                break;
        }

        // Check if snake hits the wall
        if (snakeX < 0 || snakeX >= 400 || snakeY < 0 || snakeY >= 400) {
            gameOver();
            return;
        }

        // Update snake position
        snake.style.left = snakeX + 'px';
        snake.style.top = snakeY + 'px';

        setTimeout(moveSnake, speed);
    }

    function gameOver() {
        alert('Game Over! Your score is ' + score);
        snakeX = 0;
        snakeY = 0;
        score = 0;
        speed = 200;
        updateScore();
        updateFoodPosition();
    }

    // Initial setup
    let direction = 'right'; // initial direction
    updateFoodPosition();
    moveSnake();

    // Event listener for keyboard controls
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp':
                if (direction !== 'down') direction = 'up';
                break;
            case 'ArrowDown':
                if (direction !== 'up') direction = 'down';
                break;
            case 'ArrowLeft':
                if (direction !== 'right') direction = 'left';
                break;
            case 'ArrowRight':
                if (direction !== 'left') direction = 'right';
                break;
        }
    });
});
