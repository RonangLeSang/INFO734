export class Game {
  id1: string;
  id2: string;
  gray: number[][];
  countTurn: number;
  nextPlayer: string;
  winner: string;

  constructor(id1: string, id2: string, gray: number[][], countTurn: number, nextPlayer: string, winner: string) {
    this.id1 = id1;
    this.id2 = id2;
    this.gray = gray;
    this.countTurn = countTurn;
    this.nextPlayer = nextPlayer;
    this.winner = winner;
  }
}
