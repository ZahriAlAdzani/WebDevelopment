const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("high-score"); // New element for high score


// Load high score from localStorage or initialize it to 0
let highScore = parseInt(localStorage.getItem("highScore")) || 0;
highScoreElement.textContent = `High Score: ${highScore}`;

// Define an array of image URLs for animation
const dinoImages = ["img/dino-run-0.png", "img/dino-run-1.png", 
                  "img/dino-run-3.png", "img/dino-run-4.png", 
                  "img/dino-run-5.png"];

let imageIndex = 0;

let score = 0;

function jump() {
  if (dino.classList != "jump") {
    dino.classList.add("jump");

    setTimeout(function () {
      dino.classList.remove("jump");
    }, 400);
  }
}

setInterval(function () {
  score += 1; // Increment the score every 36ms
  scoreElement.textContent = score;
}, 36);

let isAlive = setInterval(function () {
  // get current dino Y position
  let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));

  // get current cactus X position
  let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

  // detect collision
  if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
    gameOver();
  }

  // Update the animation
  dino.style.backgroundImage = `url('${dinoImages[imageIndex]}')`;
  imageIndex = (imageIndex + 1) % dinoImages.length;

}, 50);

document.addEventListener("keydown", function (event) {
  jump();
});

function gameOver() {
  if (score > highScore) {
    highScore = score;
    highScoreElement.textContent = `High Score: ${highScore}`;
    // Save the high score to localStorage
    localStorage.setItem("highScore", highScore.toString());
  }
  alert("Game Over!");
  score = 0; // Reset the score to 0
  scoreElement.textContent = score;
}