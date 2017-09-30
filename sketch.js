var matrix;
var restartButton;

function setup() {
  createCanvas(400, 600);
  matrix = new Matrix();
  matrix.init(600, 400);
}

function draw() {
  background(0);
  matrix.show();
  if (matrix.checkIfGameEnded()) {
    restartButton = createButton(PLAY_AGAIN);
    restartButton.position(width / 2 - (textWidth(PLAY_AGAIN) / 2), height - 30);
    restartButton.mousePressed(restart);
  }
}

function mousePressed() {
  matrix.clicked(mouseX, mouseY);
  matrix.checkWinner();
}

function restart() {
  matrix.init();
}