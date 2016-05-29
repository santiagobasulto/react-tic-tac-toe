import _ from 'lodash';

class Board{
  constructor(player1='X', player2='O', board=null, nextPlayer=null){
    this.player1 = player1
    this.player2 = player2
    this.nextPlayer = nextPlayer || this.player1
    this.gameFinished = false
    this.board = board || [
      new Array(3).fill(null),
      new Array(3).fill(null),
      new Array(3).fill(null),
    ]
  }
  move(x, y){
    let validPositions = [0, 1, 2];
    let invalid = _.find([x, y], (pos) => {
      return !_.includes(validPositions, pos)
    })
    if(invalid){
      throw 'InvalidPosition';
    }
    let newBoard = _.map(this.board, (row) => {
      return row.slice();
    })
    newBoard[x][y] = this.nextPlayer;
    let nextPlayer = (this.nextPlayer == this.player1) ? this.player2 : this.player1;
    return new Board(this.player1, this.player2, newBoard, nextPlayer);
  }
  _getCols(){
    let getCol = (flatBoard, colNumber) => {

      let idxs = _.map([0, 3, 6], (idx) => {
        return colNumber + idx;
      })
      return _.map(idxs, (idx) => {
        return flatBoard[idx];
      });
    }
    return _.map(_.range(0, 3), (colNumber) => {
      return getCol(_.flatten(this.board), colNumber);
    });
  }
  _getDiagonals(){
    return _.map([0, 2], (mul) => {
      return _.map(_.range(0, 3), (idx) => {
        return this.board[idx][Math.abs(mul-idx)]
      })
    });
  }
  _winningCombination(row){
    return _.find([this.player1, this.player2], (player) => {
      return _.filter(row, (col) => {
        return col == player;
      }).length == 3;
    }) || null;
  }
  get winner(){
    let combinations = _.union(this.board, this._getCols(), this._getDiagonals());
    let winner = _.find(combinations, (row) => {
      return this._winningCombination(row);
    });
    return winner;
  }
}

export { Board }
export default Board
