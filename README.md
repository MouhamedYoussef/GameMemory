# Memory Match Game 

A memory game where players match increasing color patterns. The game starts with one colored card flashing, and each level adds one more step to the sequence. Can you beat your high score?

---

##  Features

-  Single-player memory pattern matching game  
-  Increasing difficulty with each level  
-  Visual and audio feedback for user interaction  
-  Responsive design for mobile and desktop  
-  "How to Play" modal for easy onboarding  
-  Game-over detection and restart functionality  
-  Optional sound effects for each tile press  

---

##  How to Play

1. Click or tap the **Start** button to begin.
2. Watch the sequence of flashing tiles.
3. Repeat the exact order by clicking the corresponding tiles.
4. Each level adds one more tile to the sequence.
5. If you make a mistake, it’s game over!

---

##  Technologies Used

- HTML5 – Semantic structure and accessibility
- CSS3 – Responsive layout and animations
- JavaScript – Game logic and interactivity

---

##  Installation

To run this project locally:

1. Clone my repository:

---


# Functional Testing

## Feature Tests

| Feature                  | Test Scenario                           | Method     | Expected Result                            | Notes                |
|--------------------------|------------------------------------------|------------|---------------------------------------------|----------------------|
| Game Initialization      | Load page, game components are visible   | Manual     | Header, tiles, start button visible         | -                    |
| Start Button Functionality | Click start button                     | Automated  | Level changes from 0 to 1                   | Tested via script    |
| Game Sequence Generation | Click start, game shows color flash     | Manual     | Colors flash in sequence                    | Visually confirmed   |
| Game Over Trigger        | Click wrong tile                        | Manual     | "Game Over" message appears, background changes | -                |
| Modal Open/Close         | Open and close instructions modal       | Automated  | Modal shows/hides correctly                 | Tested via script    |
| Restart Button           | Click start again after game over       | Manual     | Game resets and restarts                    | -                    |

---

## Automated Tests (JavaScript)

| Test Case                      | Notes                                    |
|--------------------------------|------------------------------------------|
| Start button updates level     | Confirmed with DOM inspection after delay |
| Modal opens and closes properly | Class toggled as expected                |

---

# Usability Testing

| Area                | Criteria                                | Results                                      |
|---------------------|------------------------------------------|----------------------------------------------|
| UI Clarity          | Are buttons and labels understandable?   | Clear and simple instructions                |
| Feedback            | Visual/audio feedback for interaction?   | Button lights + sound on press               |
| Error Handling      | What happens on wrong input?             | Game shows “Game Over” and flashes background|
| Modal Accessibility | Can the instructions be easily opened/closed? | Modal works via button and background click |
| Game Pace           | Is there enough time to see the pattern? | Timed well (~600ms between colors)           |
| Instructions        | Are instructions sufficient for first-time user? | Step-by-step listed in modal            |

---

# Bugs & Issues

1. No visual indicator for player turn  
2. No keyboard accessibility  
3. No high score or progress tracking  



---


## Sources

1. https://www.youtube.com/watch?v=41i0LS9Xy-o&list=PLDoPjvoNmBAzSymugTQZDuEOG5I64uhyU
2. https://www.youtube.com/watch?v=8JDiaYIgqTk
3. Deepseek & chatgpt to edit javascript file

---

## Link to the porject hosted on github pages 
- https://mouhamedyoussef.github.io/GameMemory/HTML/Index.html
