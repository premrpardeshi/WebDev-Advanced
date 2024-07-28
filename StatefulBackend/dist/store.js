"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameManager = void 0;
class GameManager {
    constructor() {
        this.games = [];
    }
    addGame(gameId) {
        this.games.push({
            id: gameId,
            blackPlayerName: "Alice",
            whitePlayerName: "Bob",
            moves: [],
        });
    }
    addMove(gameId, move) {
        const game = this.games.find((game) => game.id === gameId);
        game === null || game === void 0 ? void 0 : game.moves.push(move);
    }
    log() {
        console.log(this.games);
    }
}
exports.gameManager = new GameManager();
