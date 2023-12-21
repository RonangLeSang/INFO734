import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-hole',
  standalone: true,
  imports: [],
  templateUrl: './hole.component.html',
  styleUrl: './hole.component.css'
})
export class HoleComponent {

  colorClass : string = "gray";
  @Input() colorNumber!: number;

  public set_color(){
    switch(this.colorNumber) {
      case 0: {
        this.colorClass = "gray";
        break;
      }
      case 1: {
        this.colorClass = "red";
        break;
      }
      case 2: {
        this.colorClass = "yellow";
        break;
      }
    }
  };

}
