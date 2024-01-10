import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {GridComponent} from "./Components/grid/grid.component";
import {HomepageComponent} from "./Components/homepage/homepage.component";
import {ListgameComponent} from "./Components/listgame/listgame.component";
import {CookieService} from "ngx-cookie-service";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink,RouterLinkActive,RouterOutlet,GridComponent,ListgameComponent],
  providers:[CookieService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'p4';



}
