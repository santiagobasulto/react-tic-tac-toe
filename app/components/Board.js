import React from 'react';
import { connect } from 'react-redux'


class BoardCell extends React.Component{
  constructor(){
    super();
    this.clicked = this.clicked.bind(this);
  }
  clicked(){
    this.props.onclickcb(this.props.row, this.props.column);
  }
  render(){
    if(this.props.cellValue == null){
      return <td><button onClick={this.clicked}></button></td>;
    }else{
      return <td>{this.props.cellValue}</td>;
    }

  }
}


class Board extends React.Component {
  constructor(){
    super();
    this.cellClicked = this.cellClicked.bind(this);
  }
  cellClicked(row, column){
    let board = this.props.board;
    let dispatch = this.props.dispatch;
    dispatch({
      type: 'MOVE',
      player: board.nextPlayer,
      position: [row, column]
    });
  }
  getBoard(){
    let rowCounter = 0;
    let lines = [];
    for (var row of this.props.board.board) {
      let line = [];
      let cellCounter = 0;
      for (var cell of row) {
        line.push(
          <BoardCell key={cellCounter} cellValue={cell} row={rowCounter} column={cellCounter} onclickcb={this.cellClicked}/>
        );
        cellCounter++;
      }
      lines.push(<tr key={rowCounter}>{line}</tr>);
      rowCounter++;
    }
    return lines;
  }
  render() {
    let board = this.props.board;
    if (board.gameFinished) {
      return <div>Game finished! {board.winner} wins!</div>;
    }
    let lines = this.getBoard();
    return <table><tbody>
      {lines}
      </tbody>
    </table>;
  }
}


const mapStateToProps = (state) => {
  return {
    board: state.gameReducer
  }
}

export default connect(mapStateToProps)(Board);
