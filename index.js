const N = 4;
const PUZZLE_SIZE = 500;
const HARD_SHUFFLE_MOVES = 100;
const EASY_SHUFFLE_MOVES = 5;
const shuffleButton = document.getElementById("shuffle-button");
const easyShuffleButton = document.getElementById("easy-shuffle-button");
const puzzle = document.getElementById("puzzle");
const moveSound = new Audio(
  "https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/move-self.mp3"
);
const winSound = new Audio(
  "https://notmaev-shop-assets.s3.amazonaws.com/win.mp3"
);
const movesCounter = document.getElementById("moves-counter");
const movesContainer = document.querySelector(".moves-container");
const puzzleImage = document.getElementById("puzzle-image");
const winningMovesSpan = document.getElementById("winning-moves");
const winContainer = document.querySelector(".win-container");
let moves = 0;
let isShuffling = false;

const arraysEqual = (a, b) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; ++i) {
    for (let j = 0; j < a[i].length; j++) {
      if (a[i][j] !== b[i][j]) return false;
    }
  }
  return true;
};

const playMoveSound = () => {
  moveSound.play();
};

const playWinSound = () => {
  winSound.play();
};

const createLayout = (n) => {
  let layout = [];
  let count = 0;
  for (let i = 0; i < n; i++) {
    let row = [];

    for (let j = 0; j < n; j++) {
      row.push(count);
      count++;
    }
    layout.push(row);
  }
  layout[n - 1][n - 1] = "empty";
  return layout;
};

const setPieceStyle = (piece, pieceIndex) => {
  if (pieceIndex == "empty") {
    piece.style.background = "transparent";
  } else {
    piece.style.backgroundImage = "url(/public/puzzle-image.jpg)";
    piece.style.backgroundPosition = `-${
      (pieceIndex % N) * (PUZZLE_SIZE / N)
    }px -${Math.floor(pieceIndex / N) * (PUZZLE_SIZE / N)}px`;
  }
};

const generatePuzzle = () => {
  for (let i = 0; i < layout.length; i++) {
    for (let j = 0; j < layout[i].length; j++) {
      let piece = document.getElementById(`piece-${i}-${j}`);
      let pieceIndex = layout[i][j];
      setPieceStyle(piece, pieceIndex);
    }
  }
};

// Animation end event listener to wait for animation end to regenerate puzzle
const handleAnimationEnd = (piece) => {
  piece.removeEventListener("animationend", handleAnimationEnd);
  piece.classList.remove("slide-right", "slide-left", "slide-up", "slide-down");
  generatePuzzle();
};

// Updates move counter when a succesful move is made
const updateMoveCounter = (moves) => {
  movesCounter.innerText = moves;
};

const handleWin = () => {
  puzzleImage.classList.add("win");
  puzzleImage.style.display = "block";
  playWinSound();
  award.style.display = "block";
  winningMovesSpan.innerHTML = moves;
  movesContainer.style.display = "none";
  winContainer.style.display = "flex";
};

// Moves piece is movement is possible
const movePiece = (piece) => {
  let row = Number(piece.id.split("-")[1]);
  let col = Number(piece.id.split("-")[2]);

  if (layout[row][col] === "empty") return;

  // RIGHT direction movement logic
  if (col < N - 1 && layout[row][col + 1] == "empty") {
    piece.classList.add("slide-right");
    layout[row][col + 1] = layout[row][col];
  }
  // LEFT direction movement logic
  else if (col > 0 && layout[row][col - 1] == "empty") {
    piece.classList.add("slide-left");
    layout[row][col - 1] = layout[row][col];
  }
  // UP direction movement logic
  else if (row < N - 1 && layout[row + 1][col] == "empty") {
    piece.classList.add("slide-up");
    layout[row + 1][col] = layout[row][col];
  }
  // LEFT direction movement logic
  else if (row > 0 && layout[row - 1][col] == "empty") {
    piece.classList.add("slide-down");
    layout[row - 1][col] = layout[row][col];
  } else {
    return;
  }
  layout[row][col] = "empty";
  piece.addEventListener("animationend", () => handleAnimationEnd(piece));
  moves++;
  updateMoveCounter(moves);
  playMoveSound();
  checkWinner();
  return;
};

// Function to shuffle the puzzle
// Should be able to provide a solvable puzzle, so it's based on making n random legal moves
const shufflePuzzle = (n) => {
  isShuffling = true;
  for (let k = 0; k < n; k++) {
    // Find the empty slot
    const emptySlot = findEmptySlot();

    const moveDirection = ["right", "left", "up", "down"];
    const selectedMove = moveDirection[Math.floor(Math.random() * 4)];

    switch (selectedMove) {
      case "right":
        if (emptySlot.col < N - 1)
          movePieceByCoordinates(emptySlot.row, emptySlot.col + 1);
        break;
      case "left":
        if (emptySlot.col > 0)
          movePieceByCoordinates(emptySlot.row, emptySlot.col - 1);
        break;
      case "up":
        if (emptySlot.row > 0)
          movePieceByCoordinates(emptySlot.row - 1, emptySlot.col);
        break;
      case "down":
        if (emptySlot.row < N - 1)
          movePieceByCoordinates(emptySlot.row + 1, emptySlot.col);
        break;
    }
  }
  isShuffling = false;
};

// Finds the coordinates of the empty slot and stores them in an object
const findEmptySlot = () => {
  for (let i = 0; i < layout.length; i++) {
    for (let j = 0; j < layout[i].length; j++) {
      if (layout[i][j] === "empty") {
        return { row: i, col: j };
      }
    }
  }
  return null;
};

// Moves selected piece
const movePieceByCoordinates = (row, col) => {
  const piece = document.getElementById(`piece-${row}-${col}`);
  if (piece) movePiece(piece);
};

// Checks if the current puzzle disposition corresponds to the original image
const checkWinner = () => {
  if (arraysEqual(layout, solution) && !isShuffling) {
    handleWin();
  }
};

const resetGameState = () => {
  moves = 0;
  updateMoveCounter(moves);
};

const resetUI = () => {
  layout = createLayout(N);
  puzzleImage.style.display = "none";
  puzzleImage.classList.remove("win");
  movesContainer.style.display = "flex";
  winContainer.style.display = "none";
};

const startGame = () => {
  generatePuzzle();
  shufflePuzzle(HARD_SHUFFLE_MOVES);
};

puzzle.addEventListener("click", (e) => {
  movePiece(e.target);
});

shuffleButton.addEventListener("click", (e) => {
  resetUI();
  shufflePuzzle(HARD_SHUFFLE_MOVES);
  resetGameState();
});

easyShuffleButton.addEventListener("click", (e) => {
  resetUI();
  shufflePuzzle(EASY_SHUFFLE_MOVES);
  resetGameState();
});

let layout = createLayout(N);
const solution = createLayout(N);
startGame();
