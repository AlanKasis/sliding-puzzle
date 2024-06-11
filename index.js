const N = 4;
const pieces = document.querySelectorAll(".puzzle__piece");

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

const generatePuzzle = () => {
  for (let i = 0; i < layout.length; i++) {
    for (let j = 0; j < layout[i].length; j++) {
      let piece = document.getElementById(`piece-${i}-${j}`);
      let pieceIndex = layout[i][j];
      if (pieceIndex == "empty") {
        piece.style.background = "#555555";
      } else {
        piece.style.backgroundImage = "url(/public/puzzle-image.jpg)";
        piece.style.backgroundPosition = `-${(pieceIndex % N) * 125}px -${
          Math.floor(pieceIndex / N) * 125
        }px`;
      }
    }
  }
};

const layout = createLayout(N);
generatePuzzle();

window.addEventListener("click", (e) => {
  let piece = e.target;
  let row = Number(piece.id.split("-")[1]);
  let col = Number(piece.id.split("-")[2]);
  if (layout[row][col] === "empty") {
    return;
  }

  // Transition end event listener to wait for animation end to regenerate puzzle
  const handleAnimationEnd = (event) => {
    piece.removeEventListener("animationend", handleAnimationEnd);
    piece.classList.remove(
      "slide-right",
      "slide-left",
      "slide-up",
      "slide-down"
    );
    generatePuzzle();
  };

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
  piece.addEventListener("animationend", handleAnimationEnd);
  return;
});
