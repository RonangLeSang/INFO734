import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// @ts-ignore
import { Player } from './playerModel';
@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  //recup l'api



  constructor() { }
  // @ts-ignore
  getPlayerById(id: number): Observable<Player> {

    //retourne player id ,nom ,nombre win ,nombre game

  }
}
