import { MOVE } from '../constants/actionTypes'
import { move, nextPlayer, checkGameFinished } from './utils'

const initialState = {
  board: [
    new Array(3).fill(null),
    new Array(3).fill(null),
    new Array(3).fill(null),
  ],
  nextPlayer: 'X',
  winner: null,
  gameFinished: false,
  player1: 'X',
  player2: 'O'
}

export default function gameReducer(state=initialState, action){
  switch (action.type) {
    case MOVE:
      let board = move(state.board, action.player, ...action.position);
      let [gameFinished, winner] = checkGameFinished(board, state.player1, state.player2);
      return Object.assign({}, state, {
        board: board,
        nextPlayer: nextPlayer(state.nextPlayer, state.player1, state.player2),
        winner: winner,
        gameFinished: gameFinished
      });
    default:
      return state;
  }
}
