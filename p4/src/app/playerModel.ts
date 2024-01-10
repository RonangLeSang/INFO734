export class Player {
  get login(): string {
    return this._login;
  }

  set login(value: string) {
    this._login = value;
  }
  get mdp(): string {
    return this._mdp;
  }

  set mdp(value: string) {
    this._mdp = value;
  }
  private _login: string;
  private _mdp: string;



  constructor(login: string, mdp: string) {
    this._login = login;
    this._mdp = mdp;


  }
}
