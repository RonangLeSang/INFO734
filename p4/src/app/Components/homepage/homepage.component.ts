import {Component, NgModule, signal} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {Player} from "../../playerModel";
import {response} from "express";
import {ConnexionService} from "../../Services/connexion.service";
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [FormsModule,
    HttpClientModule
  ]
})
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  constructor(private connexionService: ConnexionService) {}
  player:Player = { login: '', mdp: '' };




  loginClick() {
    this.connexionService.loginPlayer(this.player).subscribe(
      (response: any) => {
        console.log('Inscription réussie', response);
        // Gérez la suite (redirection, messages, etc.)
      }
    );

  }

  RegisterClick() {
    this.connexionService.registerPlayer(this.player).subscribe(
      (response: any) => {
        console.log('Inscription réussie', response);
        // Gérez la suite (redirection, messages, etc.)
      }
    );

  }
}
