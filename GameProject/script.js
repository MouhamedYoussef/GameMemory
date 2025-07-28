 
 // DOM Elements
 // i watched the linked youtube videos on the readme file to get an idea about how they designs the scripts of it then i wrote my own js code and  chatgpt suggested some modifications and i used some of them
    const startButton = document.getElementById("btn-start");
    const levelDisplay = document.getElementById("level-display");
    const statusMessage = document.getElementById("status-message");
    const tiles = document.querySelectorAll(".tile");
    const modal = document.getElementById("modal");
    const howToPlayBtn = document.getElementById("btn-how-to-play");
    const closeModalBtn = document.getElementById("close-modal");

    // Game Variables
    let gameSequence = [];
    let userSequence = [];
    let level = 0;
    let gameStarted = false;
    let userTurn = false;
    let canClick = true;
    let isShowingSequence = false;

    // Sound URLs
    // Here i gave every colour a sound from s3 amazonaws website so when the pattern start and the user can hear everytime it choosing a pattern and colour
    const sounds = {
      green: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
      red: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
      yellow: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
      blue: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3",
      wrong: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"
    };

    // Preload audio
    const audioCache = {};
    Object.keys(sounds).forEach(key => {
      audioCache[key] = new Audio(sounds[key]);
      audioCache[key].preload = 'auto';
    });

    // Start Button Click
    startButton.addEventListener("click", () => {
      if (!gameStarted) {
        startGame();
      } else {
        restartGame();
      }
    });

    // Start new game
    function startGame() {
      resetGame();
      gameStarted = true;
      startButton.textContent = "Restart Game";
      enableTiles(false);
      statusMessage.textContent = "Watch the sequence...";
      setTimeout(() => {
        nextSequence();
      }, 500);
    }

    // Restart game
    function restartGame() {
      resetGame();
      startGame();
    }
    // Chatgpt suggested some modifications in the tile section and i used them
    // Enable/disable tiles
    function enableTiles(enabled) {
      tiles.forEach(tile => {
        tile.disabled = !enabled;
      });
    }

    // Tile Click Event
    tiles.forEach(tile => {
      tile.addEventListener("click", () => {
        if (!userTurn || !canClick || isShowingSequence) return;
        
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
          // if the user completed the sequence correctly
          userTurn = false;
          statusMessage.textContent = "Correct! Next level...";
          enableTiles(false);
          setTimeout(() => {
            nextSequence();
          }, 1200);
        } else {
          //if the user is still inputting the sequence
          statusMessage.textContent = `${userSequence.length}/${gameSequence.length} correct`;
        }
      } else {
        gameOver();
      }
    }
    // Chatgpt suggested some modifications in generating Next sequence section and i used them
    // Generate Next Sequence
    function nextSequence() {
      userSequence = [];
      level++;
      levelDisplay.textContent = `Level ${level}`;
      statusMessage.textContent = "Watch the sequence...";
      
      const randomColor = getRandomColor();
      gameSequence.push(randomColor);

      isShowingSequence = true;
      // Play the entire sequence with improved timing
      let i = 0;
      const interval = setInterval(() => {
        const currentTile = document.querySelector(`[data-color="${gameSequence[i]}"]`);
        playTile(currentTile);
        i++;
        
        if (i >= gameSequence.length) {
          clearInterval(interval);
          setTimeout(() => {
            isShowingSequence = false;
            userTurn = true;
            enableTiles(true);
            statusMessage.textContent = "Your turn! Repeat the sequence";
          }, 800);
        }
      }, 700); // Slightly longer delay for better visibility
    }

    // Get Random Color
    function getRandomColor() {
      const colors = ["green", "red", "yellow", "blue"];
      // chatgpt make it easy to get random color
      return colors[Math.floor(Math.random() * 4)];
    }

    // Play Sound with error handling
    function playSound(color) {
      try {
        const sound = audioCache[color].cloneNode();
        sound.volume = 0.3; // Lower volume
        sound.play().catch(e => console.log("Audio playback error:", e));
      } catch (e) {
        console.log("Audio error:", e);
      }
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
      levelDisplay.textContent = `Game Over!`;
      statusMessage.textContent = `You reached level ${level}`;
      userTurn = false;
      enableTiles(false);
      
      setTimeout(() => {
        document.body.classList.remove("game-over");
      }, 500);

      setTimeout(() => {
        resetGame();
      }, 2000);
    }

    // Reset Game
    function resetGame() {
      gameSequence = [];
      userSequence = [];
      level = 0;
      gameStarted = false;
      userTurn = false;
      isShowingSequence = false;
      canClick = true;
      startButton.textContent = "Start Game";
      levelDisplay.textContent = "Click Start to Begin";
      statusMessage.textContent = "";
      enableTiles(false);
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

    // Keyboard support for accessibility
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        modal.classList.add("hidden");
      }
    });

    // Initialize game state
    resetGame();


