// DOM Elements
const startButton = document.getElementById("btn-start");
const levelDisplay = document.getElementById("level-display");
const tiles = document.querySelectorAll(".tile");
const modal = document.getElementById("modal");
const howToPlayBtn = document.getElementById("btn-how-to-play");
const closeModalBtn = document.getElementById("close-modal");

// Game Variables
let gameSequence = [];             // Stores the generated color sequence
let userSequence = [];             // Stores the user's input sequence
let level = 0;                     // Current level
let gameStarted = false;           // Has the game started?
let userTurn = false;              // Is it the user's turn?
let canClick = true;               // Prevent rapid clicking

// Sound URLs
const sounds = {
  green: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
  red: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
  yellow: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
  blue: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3",
  wrong: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3" // Reuse red sound for wrong answer
};

// Start Button Click
startButton.addEventListener("click", () => {
  if (!gameStarted) {
    resetGame();
    nextSequence();
    gameStarted = true;
    startButton.textContent = "Restart";
  }
});

// Tile Click Event
tiles.forEach(tile => {
  tile.addEventListener("click", () => {
    if (!userTurn || !canClick) return;
    
    canClick = false;
    const color = tile.dataset.color;
    userSequence.push(color);
    playTile(tile);
    checkAnswer(userSequence.length - 1);
    
    setTimeout(() => {
      canClick = true;
    }, 300);
  });
});

// Check User Answer
function checkAnswer(currentIndex) {
  if (gameSequence[currentIndex] === userSequence[currentIndex]) {
    if (userSequence.length === gameSequence.length) {
      userTurn = false;
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
  }
}

// Generate Next Sequence
function nextSequence() {
  userSequence = [];
  level++;
  levelDisplay.textContent = `Level: ${level}`;

  const randomColor = getRandomColor();
  gameSequence.push(randomColor);

  // Play the entire sequence
  let i = 0;
  const interval = setInterval(() => {
    playTile(document.querySelector(`[data-color="${gameSequence[i]}"]`));
    playSound(gameSequence[i]);
    i++;
    if (i >= gameSequence.length) {
      clearInterval(interval);
      userTurn = true;
    }
  }, 600);
}

// Get Random Color
function getRandomColor() {
  const colors = ["green", "red", "yellow", "blue"];
  const randomNumber = Math.floor(Math.random() * 4);
  return colors[randomNumber];
}

// Play Sound
function playSound(color) {
  const sound = new Audio(sounds[color]);
  sound.play().catch(e => console.log("Audio playback error:", e));
}

// Animate Tile Press
function playTile(tile) {
  tile.classList.add("pressed");
  playSound(tile.dataset.color);

  setTimeout(() => {
    tile.classList.remove("pressed");
  }, 300);
}

// Game Over
function gameOver() {
  playSound("wrong");
  document.body.classList.add("game-over");
  levelDisplay.textContent = `Game Over! Level: ${level}`;
  
  setTimeout(() => {
    document.body.classList.remove("game-over");
  }, 500);

  resetGame();
}

// Reset Game
function resetGame() {
  gameSequence = [];
  userSequence = [];
  level = 0;
  gameStarted = false;
  userTurn = false;
  startButton.textContent = "Start";
}

// Modal Controls
howToPlayBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Close modal when clicking outside
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});