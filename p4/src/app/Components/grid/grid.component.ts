import { Component } from '@angular/core';
import {HoleComponent} from "../hole/hole.component";

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [
    HoleComponent
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent {

  tab: number[][] = [[0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0]];

  public get_color(nb : number){
    let color;
    switch(nb) {
      case 0: {
        color = "red"
        break;
      }
      case 1: {
        color = "red"
        break;
      }
      case 2: {
        color = "yellow"
        break;
      }
    }
    return color;
    };

}
