export class Game {
  idGame: String;
  id1: string;
  id2: string;
  gray: number[][];
  countTurn: number;
  nextPlayer: string;
  winner: string;

  constructor(idGame : string ,id1: string, id2: string, gray: number[][], countTurn: number, nextPlayer: string, winner: string) {
    this.idGame=idGame;
    this.id1 = id1;
    this.id2 = id2;
    this.gray = gray;
    this.countTurn = countTurn;
    this.nextPlayer = nextPlayer;
    this.winner = winner;
  }
}
