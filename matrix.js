var Matrix = function() {
  const SPACE_WIDTH = 90;
  this.VALUE_X = 'X';
  this.VALUE_O = 'O';
  this.message = '';

  let spaces = [[],[],[]];
  let yPos = 600/2;
  let xPos = 400/2;
  let leftPadding = xPos - (SPACE_WIDTH * (spaces.length / 2));
  let upPadding = yPos - (SPACE_WIDTH * (spaces.length / 2));
  let nextValue = this.VALUE_O;
  let hasWinner = false;

  this.init = function(canvasHeight, canvasWidth) {
    spaces = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    nextValue = this.VALUE_O;
    this.message = '';
    hasWinner = false;
    yPos = canvasHeight && !isNaN(canvasHeight) ? canvasHeight / 2 : yPos;
    xPos = canvasHeight && !isNaN(canvasWidth) ? canvasWidth / 2 : xPos;
  }

  this.show = function() {
    spaces.map((row, rowIndex) => {
      row.map((col, colIndex) => {
        const newX =  leftPadding + (colIndex * SPACE_WIDTH);
        const newY = upPadding + (rowIndex * SPACE_WIDTH);
        const value = spaces[rowIndex][colIndex] || ''
        switch (value) {
          case this.VALUE_X: fill(196, 35, 112); break;
          case this.VALUE_O: fill(35, 148, 196); break;
          default: fill(200); break;
        }
        rect(
          newX,
          newY,
          SPACE_WIDTH,
          SPACE_WIDTH
        );
        textSize(SPACE_WIDTH / 2);
        fill(255);
        text(
          spaces[rowIndex][colIndex] || '',
          newX + (SPACE_WIDTH / 2) - (textWidth('X') / 2),
          newY + (SPACE_WIDTH / 1.5)
        );
      })
    });
    textSize(SPACE_WIDTH / 5);
    fill(255);
    text(
      this.message,
      xPos - (textWidth(this.message) / 2),
      upPadding + (4 * SPACE_WIDTH)
    );
  }

  this.clicked = function(mouseX, mouseY) {
    if (isNaN(mouseX) || isNaN(mouseY)) {
      throw new Error('Invalid types for parameters mouseX or mouseY.')
    }
    const row = Math.floor((mouseY - upPadding) / SPACE_WIDTH);
    const col = Math.floor((mouseX - leftPadding) / SPACE_WIDTH);
    if (row >= 0 && row <= 2 && col >= 0 && col <= 2 && !hasWinner) {
      if (!spaces[row][col]) {
        console.log(`matrix.clicked(${mouseX}, ${mouseY}); // ${row},${col} - ${nextValue}`);
        spaces[row][col] = nextValue;
        nextValue = nextValue === this.VALUE_O ? this.VALUE_X : this.VALUE_O;
        this.message = '';
      } else {
        this.message = SPACE_TAKEN;
      }
    }
    return false;
  }

  this.checkWinner = function() {
    let winner = [0,1,2].reduce((winner, value, i) => {
      if (!winner.isWinner) {
        // Horizontal
        winner = getWinner(spaces, i, true);
        if (!winner.isWinner) {
          // Vertical
          winner = getWinner(spaces, i, false);
          if (!winner.isWinner) {
            winner = getDiagonalWinner(spaces);
          }
        }
      }
      return winner;
    }, { isWinner: false });

    this.message = winner.isWinner ? `${winner.value}${WINNER}` : '';
    hasWinner = winner.isWinner;
    return winner;
  }

  this.checkIfGameEnded = function() {
    const fullMatrix = spaces.reduce((isFull, rows) => {
      return isFull &&
        rows[0] !== null &&
        rows[1] !== null &&
        rows[2] !== null;
    }, true);

    this.message = !hasWinner && fullMatrix && this.message === '' ? NO_WINNER : this.message;
    return hasWinner || fullMatrix;
  }
}

function getWinner(spaces, index, isRow){
  const isWinner = spaces[isRow ? index : 0][isRow ? 0 : index] &&
      spaces[isRow ? index : 0][isRow ? 0 : index] === spaces[isRow ? index : 1][isRow ? 1 : index] &&
      spaces[isRow ? index : 0][isRow ? 0 : index] === spaces[isRow ? index : 2][isRow ? 2 : index];

  return {
    isWinner: isWinner || false,
    value: isWinner ? spaces[isRow ? index : 0][isRow ? 0 : index] : ''
  }
}

function getDiagonalWinner(spaces){
  const isWinner = spaces[1][1] && (
    (spaces[0][0] === spaces[1][1] && spaces[0][0] === spaces[2][2]) ||
    (spaces[0][2] === spaces[1][1] && spaces[1][1] === spaces[2][0])
  );
  return {
    isWinner: isWinner || false,
    value: isWinner ? spaces[1][1] : ''
  }
}
