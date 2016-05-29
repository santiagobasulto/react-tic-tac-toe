import React from 'react';
import _ from 'lodash';
import {Board as BoardModel} from '../models/Board'

class BoardCell extends React.Component{
  constructor(){
    super();
    this.clicked = this.clicked.bind(this);
  }
  clicked(){
    this.props.onclickcb(this.props.row, this.props.column)
  }
  render(){
    if(this.props.cellValue == null){
        return <td><button onClick={this.clicked}></button></td>
    }else{
      return <td>{this.props.cellValue}</td>
    }

  }
}


class Board extends React.Component {
  constructor(){
    super();
    this.state = {
      board: new BoardModel(),
      gameFinished: false
    }
    this.cellClicked = this.cellClicked.bind(this);
  }
  cellClicked(row, column){
    let board = this.state.board;
    board.move(row, column)
    var gameFinished = board.winner ? true : false;
    this.setState({board, gameFinished});
  }
  getBoard(){
    let rowCounter = 0;
    let lines = [];
    for (var row of this.state.board.board) {
      let line = [];
      let cellCounter = 0;
      for (var cell of row) {
        line.push(
          <BoardCell key={cellCounter} cellValue={cell} row={rowCounter} column={cellCounter} onclickcb={this.cellClicked}/>
        );
        cellCounter++;
      }
      lines.push(<tr key={rowCounter}>{line}</tr>)
      rowCounter++;
    }
    return lines;
  }
  render() {
    if (this.state.gameFinished) {
      return <div>Game finished! {this.state.board.winner} wins!</div>
    }
    let lines = this.getBoard();
    return <table><tbody>
      {lines}
      </tbody>
    </table>;
  }
}

export default Board;
