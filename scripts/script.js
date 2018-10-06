/* Select HTML element
* cvs - standard shorthand for canvas
* ctx - standard shorthand for context
*/
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var box = 15; // Width for one cell

cvs.height = 20 * box;
cvs.width = 20 * box;

var width = cvs.width;
var height = cvs.height;

// Variable needed for game
var direction; // Direction of snake

// Food img
var foodImg = new Image();
foodImg.src =
  "http://www.kasparsvendelis.com/wp-content/uploads/2018/04/Vegetarian2.png";

// Game variables
var food; //Object { x , y }

// Create snake.
var snake; //Array [ { x, y }, { x, y } ]

// Updates the canvas
function refreshCanvas() {
  // Clear the canvas
  ctx.clearRect(0, 0, cvs.width, cvs.height);

  // Draw food
  ctx.drawImage(foodImg, food.x, food.y, box, box);

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "green" : "#EB8921";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "white";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }
}

function createSnake() {
  // Initiate snake
  ctx.fillStyle = "blue";
  ctx.fillRect(5, 5, box, box);

  snake = [{ x: 5 * box, y: 5 * box }];
}

// Create food
function createFood() {
  // Check collision
  myX = Math.floor((Math.random() * width) / box) * box;
  myY = Math.floor((Math.random() * height) / box) * box;

  food = { x: myX, y: myY };
}

// Draw scene
function drawScene() {
  // Add your code here!

  var newHeadX = snake[0].x;
  var newHeadY = snake[0].y;
  if (direction == "left") {
    newHeadX -= box;
  } else if (direction == "right") {
    newHeadX += box;
  } else if (direction == "up") {
    newHeadY -= box;
  } else if (direction == "down") {
    newHeadY += box;
  }

  snake.unshift({ x: newHeadX, y: newHeadY });

  if (snake[0].x === food.x && snake[0].y === food.y) {
    createFood();
  } else {
    snake.pop();
  }

  refreshCanvas();
}

// Records input direction
document.addEventListener("keydown", moveSnake);

function moveSnake(event) {
  if (event.keyCode == 37) {
    direction = "left";
  } else if (event.keyCode == 38) {
    direction = "up";
  } else if (event.keyCode == 39) {
    direction = "right";
  } else if (event.keyCode == 40) {
    direction = "down";
  }
}

// CAll draw function every 200 ms
var drawLoop = setInterval(drawScene, 300);

// Setup game objects to initial values
function setupNewGame() {
  direction = "right";
  createSnake();
  createFood();
  refreshCanvas();
}

// Init game
setupNewGame();
