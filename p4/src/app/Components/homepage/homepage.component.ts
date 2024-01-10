import {Component} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Player} from "../../playerModel";

import {ConnexionService} from "../../Services/connexion.service";



@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent{

  constructor(private connexionService: ConnexionService) {}


  username:string = "";
  usermdp:string = "";
  player!:Player;






  loginClick() {
      this.player = new Player(this.username, this.usermdp);
      this.connexionService.loginPlayer(this.player).subscribe((player: Player) => {
        console.log('Login successful', player);
        // Handle login success
      });
    }




  }





