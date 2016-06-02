import _ from 'lodash';

export function move(board, player, row, column){
  let validPositions = [0, 1, 2];
  let invalid = _.find([row, column], (pos) => {
    return !_.includes(validPositions, pos)
  })
  if(invalid){
    throw 'InvalidPosition';
  }
  let newBoard = _.map(board, (row) => {
    return row.slice();
  })
  newBoard[row][column] = player;
  return newBoard;
}

export function nextPlayer(currentPlayer, player1, player2){
  return (currentPlayer== player1) ? player2 : player1
}

function getCols(board){
  let getCol = (flatBoard, colNumber) => {

    let idxs = _.map([0, 3, 6], (idx) => {
      return colNumber + idx;
    })
    return _.map(idxs, (idx) => {
      return flatBoard[idx];
    });
  }
  return _.map(_.range(0, 3), (colNumber) => {
    return getCol(_.flatten(board), colNumber);
  });
}

function getDiagonals(board){
  return _.map([0, 2], (mul) => {
    return _.map(_.range(0, 3), (idx) => {
      return board[idx][Math.abs(mul-idx)]
    })
  });
}

function winningCombination(row, player1, player2){
  return _.find([player1, player2], (player) => {
    return _.filter(row, (col) => {
      return col == player;
    }).length == 3;
  }) || null;
}

function checkWinner(board, player1, player2){
  let combinations = _.union(board, getCols(board), getDiagonals(board));
  let winner = _.find(combinations, (row) => {
    return winningCombination(row, player1, player2);
  });
  return (winner && winner[0]) || null;
}
function isGameFinished(board){
  return _.find(_.flatten(board), (elem) => {
    return elem == null;
  }) === undefined;
}
export function checkGameFinished(board, player1, player2){
  let winner = checkWinner(board, player1, player2)
  if(winner){
    return [true, winner];
  }
  return [isGameFinished(board), winner];
}
