/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(size) {
  var solution; //fixme
  //create board of size n
  var board = new Board({n: size});
  //initialize array of illegal moves
  var illegalMoves = [];
  var count = 0;
  //inner function(board)
  var findValidMoves = function (board) {
    //loop through rows and columns
    for (var i = 0; i < board.rows().length; i++) {
      for (var j = 0; j < board.rows().length; j++) {
        //toggle piece
        if (count === size) {
          solution = board.rows().slice(); 
        } else if (!illegalMoves.includes(String([i, j]))) {
          board.togglePiece(i, j);
          count++;
          if (board.hasAnyRooksConflicts()) {
            board.togglePiece(i, j);
            count--;
          } 
          illegalMoves.push(String([i, j]));
          findValidMoves(board);
        }
      }
    }
  };
  findValidMoves(board);
  console.log('Single solution for ' + size + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 1;
  for (var i = 2; i <= n; i++) {
    solutionCount = solutionCount * i;
  }
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};




// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(rowSize) {
  //create board of size n
  var board = new Board({n: rowSize});
  var solution = board.rows();
  if (rowSize === 2 || rowSize === 3) {
    return solution;
  }
  //inner function(board)
  
  
  
  var findValidMoves = function(rowIndex) {
    if (rowIndex === rowSize) {
      solution = board.rows().slice();
      return;
    } else {
      var row = board.rows()[rowIndex];
      var numPieces = board.rows().reduce((totalSum, row) => {
        return row.reduce((rowSum, indexValue) => rowSum + indexValue);
      }, 0);
      
      for (var columnIndex = 0; columnIndex < row.length; columnIndex++) {
        board.togglePiece(rowIndex, columnIndex);
        if (!board.hasAnyQueensConflicts()) {
          findValidMoves(rowIndex + 1);
        } else {
          board.togglePiece(rowIndex, columnIndex);
        }
      }
      
      if (numPieces === 0) {
        return;
      }
    }
  };
  
  
  
  findValidMoves(0);  
  console.log('Single solution for ' + rowSize + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount;
  //no solutions when n < 4
  //

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
