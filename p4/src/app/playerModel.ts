export class Player {
  id: number;
  name: string;
  numberWin: number;
  numberGames: number;


  constructor(id: number, name: string, numberWin: number,
              numberGames: number) {
    this.id = id;
    this.name = name;
    this.numberWin = numberWin;
    this.numberGames= numberGames;

  }
}
