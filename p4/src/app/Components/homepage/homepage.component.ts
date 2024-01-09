import {Component, NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { connexionService } from 'p4/src/app/Services/connexion.service';
import {Player} from "../../playerModel";
import {response} from "express";
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
  constructor(private connexionService: connexionService) {}
  player:Player = { login: '', mdp: '' };
  registerClick() {
    this.connexionService.registerUser(this.player).subscribe(
      (response: any) => {
        console.log('Inscription réussie', response);
        // Gérez la suite (redirection, messages, etc.)
      }
    );
  }

}
