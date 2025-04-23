let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 20;
let snake = [{ x: 10 * box, y: 10 * box }];
let direction = "right";
let food = {
  x: Math.floor(Math.random() * 20) * box,
  y: Math.floor(Math.random() * 20) * box
};

let speed = 200; // velocidade inicial (ms)
let score = 0;
let game;

function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = i === 0 ? "lime" : "green";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function drawFood() {
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, box, box);
}

document.addEventListener("keydown", updateDirection);
function updateDirection(event) {
  if (event.key === "ArrowLeft" && direction !== "right") direction = "left";
  if (event.key === "ArrowUp" && direction !== "down") direction = "up";
  if (event.key === "ArrowRight" && direction !== "left") direction = "right";
  if (event.key === "ArrowDown" && direction !== "up") direction = "down";
}

function increaseSpeed() {
  if (speed > 50) { // define o mínimo de velocidade
    speed -= 10;
    clearInterval(game);
    game = setInterval(startGame, speed);
  }
}

function startGame() {
  context.clearRect(0, 0, 400, 400);

  drawSnake();
  drawFood();

  let head = { x: snake[0].x, y: snake[0].y };

  if (direction === "right") head.x += box;
  if (direction === "left") head.x -= box;
  if (direction === "up") head.y -= box;
  if (direction === "down") head.y += box;

  if (
    head.x < 0 || head.x >= 400 ||
    head.y < 0 || head.y >= 400 ||
    snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y)
  ) {
    clearInterval(game);
    alert("💀 Game Over\nPontuação: " + score);
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box
    };

    // aumenta velocidade a cada 5 pontos
    if (score % 5 === 0) {
      increaseSpeed();
    }

  } else {
    snake.pop();
  }
}

// inicia o jogo
game = setInterval(startGame, speed);
