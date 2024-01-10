import {Component,  OnInit} from '@angular/core';

import { CommonModule } from '@angular/common';
import {Player} from "../../playerModel";

import {ConnexionService} from "../../Services/connexion.service";



@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit{
  constructor(private connexionService: ConnexionService) {}
  player:Player = { login: '', mdp: '' };


  ngOnInit() {}

  loginClick() {
    this.connexionService.loginPlayer(this.player).subscribe((player: Player) => {
      console.log('Login successful', player);
      // Handle login success
    });

  }




}
