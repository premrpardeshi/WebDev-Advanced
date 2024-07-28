interface Game {
  id: string;
  whitePlayerName: string;
  blackPlayerName: string;
  moves: string[];
}

class GameManager {
  games: Game[];

  private static instance: GameManager;

  private constructor() {
    this.games = [];
  }

  static getInstance() {
    if (GameManager.instance) return GameManager.instance;
    else {
      GameManager.instance = new GameManager();
      return GameManager.instance;
    }
  }

  addGame(gameId: string) {
    this.games.push({
      id: gameId,
      blackPlayerName: "Alice",
      whitePlayerName: "Bob",
      moves: [],
    });
  }

  addMove(gameId: string, move: string) {
    const game = this.games.find((game) => game.id === gameId);

    game?.moves.push(move);
  }

  log() {
    console.log(this.games);
  }
}

export const gameManager = GameManager.getInstance();
