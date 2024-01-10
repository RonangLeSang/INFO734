import { Component } from '@angular/core';
import {ListGameService} from "../../Services/list-game.service";
import {Game} from "./game"
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-listgame',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './listgame.component.html',
  styleUrl: './listgame.component.css'
})
export class ListgameComponent {
  games: Game[] | undefined;
  constructor(private listGameService: ListGameService) {}

  ngOnInit(): void {
    this.listGameService.getListGame()
      .subscribe(( data: any) => {
        this.games = data;
      }, error => {
        console.error('Failed to get games:', error);
      });
  }

  joinGame(idGame: any) {

  }
}
