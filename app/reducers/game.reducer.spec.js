import { expect } from 'chai';
import gameReducer from './game.reducer.js'
import deepFreeze from 'deep-freeze'


describe('reducers', () => {
  describe('as initial state', () => {
    it('should provide an empty board', () => {
      expect(gameReducer(undefined, {}).board).to.deep.equal([
        new Array(3).fill(null),
        new Array(3).fill(null),
        new Array(3).fill(null),
      ]);
    })
    it('should provide no winner', () => {
      expect(gameReducer(undefined, {}).winner).to.be.null;
    })
    it('should say game finished is false', () => {
      expect(gameReducer(undefined, {}).gameFinished).to.be.false;
    })
    it('should provide player1 and player 2', () => {
      let state = gameReducer(undefined, {})
      expect(state.player1).to.equal('X');
      expect(state.player2).to.equal('O');
    })
  })
  describe("movement actions", () => {
    it("should return a new board with movement", () => {
      let initial = gameReducer(undefined, {})
      deepFreeze(initial)

      expect(gameReducer(initial, {
        type: 'MOVE',
        player: 'X',
        position: [0, 0]
      })).to.deep.equal({
        board: [
          ['X', null, null],
          [null, null, null],
          [null, null, null],
        ],
        nextPlayer: 'O',
        gameFinished: false,
        winner: null,
        player1: 'X',
        player2: 'O'
      })
    })
    it("should switch players with multiple movements", () => {
      let initial = gameReducer(undefined, {})
      deepFreeze(initial)

      var state = gameReducer(initial, {
        type: 'MOVE',
        player: 'X',
        position: [0, 0]
      });
      deepFreeze(state)
      state = gameReducer(state, {
        type: 'MOVE',
        player: 'O',
        position: [1, 1]
      })
      expect(state).to.deep.equal({
        board: [
          ['X', null, null],
          [null, 'O', null],
          [null, null, null],
        ],
        nextPlayer: 'X',
        gameFinished: false,
        winner: null,
        player1: 'X',
        player2: 'O'
      })
    })
  })
  describe("check winners", () => {
    it("should return false if game uncomplete and no winner", () => {
      let initial = gameReducer(undefined, {})
      deepFreeze(initial)
      let state = gameReducer(initial, {
        type: 'MOVE',
        player: 'X',
        position: [0, 0]
      })
      expect(state.winner).to.be.null;
      expect(state.gameFinished).to.be.false;
    });
    it("should return false if game complete and no winner", () => {
      let initial = Object.assign({}, gameReducer(undefined, {}), {
        board: [
          [null, 'O', 'X'],
          ['X', 'O', 'X'],
          ['O', 'X', 'O'],
        ]
      })
      deepFreeze(initial)

      let state = gameReducer(initial, {
        type: 'MOVE',
        player: 'X',
        position: [0, 0]
      })
      expect(state.winner).to.be.null;
      expect(state.gameFinished).to.be.true;
    });
    it("should return true if winner in row", () => {
      let initial = Object.assign({}, gameReducer(undefined, {}), {
        board: [
          ['X', 'X', null],
          ['O', 'O', null],
          [null, null, null],
        ]
      })
      deepFreeze(initial)

      let state = gameReducer(initial, {
        type: 'MOVE',
        player: 'X',
        position: [0, 2]
      });
      expect(state.winner).to.equal('X');
      expect(state.gameFinished).to.be.true;
    });
    it("should return true if winner in column", () => {
      let initial = Object.assign({}, gameReducer(undefined, {}), {
        board: [
          ['X', 'X', 'O'],
          ['X', 'O', null],
          [null, null, null],
        ]
      })
      deepFreeze(initial)

      expect(gameReducer(initial, {
        type: 'MOVE',
        player: 'X',
        position: [2, 0]
      }).winner).to.equal('X');
    });
    it("should return true if winner in first diagonal", () => {
      let initial = Object.assign({}, gameReducer(undefined, {}), {
        board: [
          ['X', 'X', 'O'],
          ['X', 'X', null],
          ['O', null, null],
        ]
      })
      deepFreeze(initial)

      expect(gameReducer(initial, {
        type: 'MOVE',
        player: 'X',
        position: [2, 2]
      }).winner).to.equal('X');
    });
    it("should return true if winner in second diagonal", () => {
      let initial = Object.assign({}, gameReducer(undefined, {}), {
        board: [
          ['X', 'X', 'O'],
          ['X', null, null],
          ['O', null, null],
        ]
      })
      deepFreeze(initial)

      expect(gameReducer(initial, {
        type: 'MOVE',
        player: 'O',
        position: [1, 1]
      }).winner).to.equal('O');
    });
  });
})
