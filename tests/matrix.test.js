var matrix = new Matrix();

function compare (obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

QUnit.test( "Game shouldn't end after init", function( assert ) {
  matrix.init(600, 400);
  assert.ok( matrix.checkIfGameEnded() === false, "Passed!" );
});

QUnit.test( "Game shouldn't have a winner after init", function( assert ) {
  const expected = { isWinner: false, value: '' };
  matrix.init(600, 400);
  const result = matrix.checkWinner();
  assert.ok( compare(result, expected), "Passed!" );
});

QUnit.test( "Game shouldn't end after first click", function( assert ) {
  matrix.init(600, 400);
  matrix.clicked(111, 210);
  assert.ok( matrix.checkIfGameEnded() === false, "Passed!" );
});

QUnit.test( "'O' should be the winner with horizontal row", function( assert ) {
  const expected = { isWinner: true, value: matrix.VALUE_O };
  matrix.init(600, 400);
  matrix.clicked(111, 211); // 0,0 - O
  matrix.clicked(111, 299); // 1,0 - X
  matrix.clicked(198, 209); // 0,1 - O
  matrix.clicked(204, 302); // 1,1 - X
  matrix.clicked(290, 209); // 0,2 - O
  const result = matrix.checkWinner();
  assert.ok( compare(result, expected), "Passed!" );
});

QUnit.test( "'X' should be the winner with vertical row", function( assert ) {
  const expected = { isWinner: true, value: matrix.VALUE_X };
  matrix.init(600, 400);
  matrix.clicked(293, 209); // 0,2 - O
  matrix.clicked(119, 217); // 0,0 - X
  matrix.clicked(200, 217); // 0,1 - O
  matrix.clicked(116, 300); // 1,0 - X
  matrix.clicked(202, 302); // 1,1 - O
  matrix.clicked(109, 392); // 2,0 - X
  const result = matrix.checkWinner();
  assert.ok( compare(result, expected), "Passed!" );
});

QUnit.test( "'O' should be the winner with diagonal row", function( assert ) {
  const expected = { isWinner: true, value: matrix.VALUE_O };
  matrix.init(600, 400);
  matrix.clicked(122, 215); // 0,0 - O
  matrix.clicked(118, 303); // 1,0 - X
  matrix.clicked(205, 301); // 1,1 - O
  matrix.clicked(204, 376); // 2,1 - X
  matrix.clicked(297, 389); // 2,2 - O
  const result = matrix.checkWinner();
  assert.ok( compare(result, expected), "Passed!" );
});

QUnit.test( "Game should end with no winner when matrix is full", function( assert ) {
  matrix.init(600, 400);
  matrix.clicked(116, 220); // 0,0 - O
  matrix.clicked(107, 283); // 1,0 - X
  matrix.clicked(176, 219); // 0,1 - O
  matrix.clicked(196, 310); // 1,1 - X
  matrix.clicked(297, 312); // 1,2 - O
  matrix.clicked(285, 225); // 0,2 - X
  matrix.clicked(130, 409); // 2,0 - O
  matrix.clicked(195, 404); // 2,1 - X
  matrix.clicked(297, 401); // 2,2 - O
  assert.ok( matrix.checkIfGameEnded() === true, "Passed!" );
});

QUnit.test( "Game throw an error when clicked with invalid parameters", function( assert ) {
  matrix.init(600, 400);
  assert.throws( matrix.clicked, new Error('Invalid types for parameters mouseX or mouseY.'), "Passed!" );
});

QUnit.test( "Matrix should work when not initialized with canvas height or width", function( assert ) {
  const expected = { isWinner: true, value: matrix.VALUE_O };
  matrix.init();
  matrix.clicked(111, 211); // 0,0 - O
  matrix.clicked(111, 299); // 1,0 - X
  matrix.clicked(198, 209); // 0,1 - O
  matrix.clicked(204, 302); // 1,1 - X
  matrix.clicked(290, 209); // 0,2 - O
  const result = matrix.checkWinner();
  assert.ok( compare(result, expected), "Passed!" );
});

QUnit.test( "Should have the correct message when there is a winner", function( assert ) {
  const expected = `${matrix.VALUE_O}${WINNER}`;
  matrix.init();
  matrix.clicked(111, 211); // 0,0 - O
  matrix.clicked(111, 299); // 1,0 - X
  matrix.clicked(198, 209); // 0,1 - O
  matrix.clicked(204, 302); // 1,1 - X
  matrix.clicked(290, 209); // 0,2 - O
  matrix.checkWinner();
  assert.ok( matrix.message === expected, "Passed!" );
});

QUnit.test( "Should have the correct message when matrix is full and there is no winner", function( assert ) {
  matrix.init(600, 400);
  matrix.clicked(116, 220); // 0,0 - O
  matrix.clicked(107, 283); // 1,0 - X
  matrix.clicked(176, 219); // 0,1 - O
  matrix.clicked(196, 310); // 1,1 - X
  matrix.clicked(297, 312); // 1,2 - O
  matrix.clicked(285, 225); // 0,2 - X
  matrix.clicked(130, 409); // 2,0 - O
  matrix.clicked(195, 404); // 2,1 - X
  matrix.clicked(297, 401); // 2,2 - O
  matrix.checkIfGameEnded();
  assert.ok( matrix.message === NO_WINNER, "Passed!" );
});

QUnit.test( "Should have the correct message when clicked over the same space twice or more", function( assert ) {
  matrix.init(600, 400);
  matrix.clicked(116, 220); // 0,0 - O
  matrix.clicked(116, 220); // 0,0 - X
  matrix.clicked(116, 220); // 0,0 - X
  assert.ok( matrix.message === SPACE_TAKEN, "Passed!" );
});
