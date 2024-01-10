import { Component } from '@angular/core';
import {JoinGameService} from "../../Services/join-game.service";

@Component({
  selector: 'app-join-page',
  standalone: true,
  imports: [],
  templateUrl: './join-page.component.html',
  styleUrl: './join-page.component.css'
})
export class JoinPageComponent {
  constructor(private joingameservice:JoinGameService) {
  }


  playClick() {
    this.joingameservice.joinGame()

  }
}
