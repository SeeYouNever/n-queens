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
  var complete = false;
  //create board of size n
  var board = new Board({n: size});

  //inner function(board)
  var findValidMoves = function (rowIndex) {
    //loop through rows and columns
    if (rowIndex === size) {
      solution = board.rows().map(el => el.map(el => el));
      complete = true;
      return;
    }
    
    for (var i = 0; i < size; i++) {
      if (!complete) {
        board.togglePiece(rowIndex,i);
        if (!board.hasColConflictAt(i)){
          findValidMoves(rowIndex + 1);
        }
        board.togglePiece(rowIndex,i);
      }
    }
  };
  findValidMoves(0);
  console.log('Single solution for ' + size + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  
  var solutionCount = 0;
  var board = new Board({n: n});
  var occCol = [];
  
  var countSolutions = function(rowIndex) {
    
    
    if (rowIndex === n) {
      solutionCount++;
      return;
    }
    
    for (var i = 0; i < n; i++) {
      if (!occCol.includes(i)){
        board.togglePiece(rowIndex,i);
        if (!board.hasColConflictAt(i)){
          occCol.push(i)
          countSolutions(rowIndex + 1);
        }
        board.togglePiece(rowIndex,i);
        occCol.pop();
      }
    } 
    
  }

  countSolutions(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};




// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(rowSize) {
  //create board of size n
  var board = new Board({n: rowSize});
  var solution = board.rows();
  var complete = false;

  //inner function(board)  
  var findValidMoves = function(rowIndex) {
    //"optimization"    
    if (complete) return;
    
    //create row
    var row = board.rows()[rowIndex];
    
    //base case
    if (rowIndex === rowSize) {
      solution = board.rows().map(el => el.map(el => el));
      complete = true;
      return;
    }
    
    //find valid row
    for (var columnIndex = 0; columnIndex < row.length; columnIndex++) {
      board.togglePiece(rowIndex, columnIndex);
      if (!board.hasAnyQueensConflicts()) {
        findValidMoves(rowIndex + 1);
      }
      board.togglePiece(rowIndex, columnIndex);
    }
    
    //if no valid row, return to previous row
    var rowPieces = row.reduce((rowSum, indexValue) => rowSum + indexValue);
    if (rowPieces === 0) {
      return;
    }
  };
  
  //start at first row
  findValidMoves(0);  
  console.log('Single solution for ' + rowSize + ' queens:', JSON.stringify(solution));
  return solution;
};




// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(rowSize) {
  var solutionCount = 0;
  
  if (rowSize === 2 || rowSize === 3) return 0;
    //create board of size n
  var board = new Board({n: rowSize});

  //inner function(board)  
  var findValidMoves = function(rowIndex) {
    //create row
    var row = board.rows()[rowIndex];
    
    //base case
    if (rowIndex === rowSize) {
      solutionCount++;
      return;
    }
    
    //find valid row
    for (var columnIndex = 0; columnIndex < row.length; columnIndex++) {
      board.togglePiece(rowIndex, columnIndex);
      if (!(board.hasColConflictAt(columnIndex) || board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts())) {
        findValidMoves(rowIndex + 1);
      }
      board.togglePiece(rowIndex, columnIndex);
    }
  };
  
  
  findValidMoves(0); 
  console.log('Number of solutions for ' + rowSize + ' queens:', solutionCount);
  return solutionCount;
};
