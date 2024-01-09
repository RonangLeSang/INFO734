import {Component, NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {Player} from "../../playerModel";
import {response} from "express";
import {ConnexionService} from "../../Services/connexion.service";
@NgModule({
  imports: [
    HttpClientModule
  ]
})
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  constructor(private connexionService: ConnexionService) {}
  player:Player = { login: '', mdp: '' };
  registerClick() {
    this.connexionService.registerPlayer(this.player).subscribe(
      (response: any) => {
        console.log('Inscription réussie', response);
        // Gérez la suite (redirection, messages, etc.)
      }
    );
  }

}
