// import expect from 'expect';
import { expect } from 'chai';
import Board from './Board.js'
import deepFreeze from 'deep-freeze'

describe("A Board", () => {
  describe("when it's created with no parameters", () => {
    let board;
    beforeEach(() => {
      board = new Board();
      deepFreeze(board);
    })
    it("should be empty", () => {
      expect(board.board).to.deep.equal([
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ])
    });
    it("should have player1 and player 2", () => {
      expect(board.player1).to.exist
      expect(board.player2).to.exist
    })
    it("should be the default players", () => {
      expect(board.player1).to.equal('X')
      expect(board.player2).to.equal('O')
    })
    it("player1 should be the next player", () => {
      expect(board.nextPlayer).to.exist
      expect(board.nextPlayer).to.equal(board.player1)
    })
  });
  describe("when it's created with custom players", () => {
    let board;
    beforeEach(() => {
      board = new Board('P1', 'P2');
      deepFreeze(board);
    })

    it("player1 and player 2 should exist", () => {
      expect(board.player1).to.exist
      expect(board.player2).to.exist
    })
    it("should be the one passed at construction time", () => {
      expect(board.player1).to.equal('P1')
      expect(board.player2).to.equal('P2')
    });
    it("player1 should be the next player", () => {
      expect(board.nextPlayer).to.exist
      expect(board.nextPlayer).to.equal(board.player1)
    })
  });
  describe("move()", () => {
    let board;
    beforeEach(() => {
      board = new Board();
      deepFreeze(board.board)
    })
    it("should move the next player in position", () => {
      let nextPlayer = board.nextPlayer
      var newBoard = board.move(0, 0)
      expect(newBoard.board[0][0]).to.equal(nextPlayer);
      expect(newBoard.nextPlayer).to.equal('O')
    });
    it("should be immutable", () => {
      let nextPlayer = board.nextPlayer
      var newBoard = board.move(0, 0)
      expect(newBoard.board[0][0]).to.equal(nextPlayer);
      expect(newBoard.nextPlayer).to.equal('O')

      expect(board.board[0][0]).to.equal(null);
      expect(board.nextPlayer).to.equal('X')
    });
    it("should support multiple moves", () => {
      var newBoard = board.move(0, 0)
      expect(newBoard.board[0][0]).to.equal('X');

      newBoard = newBoard.move(1, 1)
      expect(newBoard.board[0][0]).to.equal('X');
      expect(newBoard.board[1][1]).to.equal('O');

      newBoard = newBoard.move(2, 1)
      expect(newBoard.board[0][0]).to.equal('X');
      expect(newBoard.board[1][1]).to.equal('O');
      expect(newBoard.board[2][1]).to.equal('X');

      expect(newBoard.board).to.deep.equal([
        ['X', null, null],
        [null, 'O', null],
        [null, 'X', null]
      ]);
    });
    describe("An invalid move", () => {
      it("should raise an exception if the first parameter is invald", () => {
        let nextPlayer = board.nextPlayer
        expect(() => {
            board.move(-1, 0)
        }).to.throw('InvalidPosition');
        expect(board.nextPlayer).to.equal(nextPlayer)
      });
      it("should raise an exception if the second parameter is invald", () => {
        let nextPlayer = board.nextPlayer
        expect(() => {
            board.move(0, -1)
        }).to.throw('InvalidPosition');
        expect(board.nextPlayer).to.equal(nextPlayer)
      });
      it("should raise an exception if both parameters are invald", () => {
        let nextPlayer = board.nextPlayer
        expect(() => {
            board.move('a', -1)
        }).to.throw('InvalidPosition');
        expect(board.nextPlayer).to.equal(nextPlayer)
      });
    })

  });
  describe("getCols method", () => {
    it("should return the correct columns", () => {
      var board = new Board();
      deepFreeze(board);
      // X - X
      // - O -
      // - - O
      board = board.move(0,0);
      board = board.move(1,1);
      board = board.move(0,2);
      board = board.move(2,2);

      expect(board.board).to.deep.equal([
        ['X', null, 'X'],
        [null, 'O', null],
        [null, null, 'O']
      ]);
      expect(board._getCols()).to.deep.equal([
        ['X', null, null],
        [null, 'O', null],
        ['X', null, 'O']
      ]);

    })
  })
  describe("getDiagonals", () => {
    it("should return both diagonals", () => {
      let board = new Board('X', 'O', [
        ['O', null, 'X'],
        [null, 'O', 'X'],
        ['X', null, 'O']
      ]);
      deepFreeze(board);
      expect(board._getDiagonals()).to.deep.equal([
        ['O', 'O', 'O'],
        ['X', 'O', 'X']
      ])
    });
  })
  describe('checkWinner method', () => {
    it("should return false for an empty board", () => {
      let board = new Board();
      deepFreeze(board);
      expect(board.winner).to.not.be.ok;
    })
    it("should return false if no winning combination", () => {
      let _board = [
        ['X', null, null],
        [null, 'O', null],
        ['X', null, 'O']
      ]
      let board = new Board('X', 'O', _board);
      deepFreeze(board);
      expect(board.winner).to.not.be.ok;
    })
    it("should return true if a winning row", () => {
      let _board = [
        ['X', 'X', 'X'],
        [null, 'O', null],
        [null, null, 'O']
      ]
      let board = new Board('X', 'O', _board);
      deepFreeze(board);
      expect(board.winner).to.be.ok;
    })
    it("should return true if a winning column", () => {
      const _board = [
        ['X', null, null],
        ['X', 'O', null],
        ['X', null, 'O']
      ]
      let board = new Board('X', 'O', _board);
      deepFreeze(board);
      expect(board.winner).to.be.ok;
    })
    it("should return true if a winning in first diagonal", () => {
      const _board = [
        ['O', null, 'X'],
        [null, 'O', 'X'],
        ['X', null, 'O']
      ]
      let board = new Board('X', 'O', _board);
      deepFreeze(board);
      expect(board.winner).to.be.ok;
    })
    it("should return true if a winning in second diagonal", () => {
      const _board = [
        ['O', null, 'X'],
        [null, 'X', null],
        ['X', null, 'O']
      ]
      let board = new Board('X', 'O', _board);
      deepFreeze(board);
      expect(board.winner).to.be.ok;
    })
  })
})
