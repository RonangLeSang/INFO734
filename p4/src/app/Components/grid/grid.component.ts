import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
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
export class GridComponent implements AfterViewInit {

  tab: number[][] = [[0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0],
                    [0,0,0,0,0,2,0],
                    [0,0,0,0,0,0,0],
                    [0,0,2,0,1,0,0],
                    [0,1,1,1,2,0,0]];
  @ViewChild('canvas')
  canvas!: HTMLCanvasElement;

  context!: CanvasRenderingContext2D | null;


  constructor(){}

  @ViewChild('myCanvas', { static: true }) myCanvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    if (this.myCanvas) {

      const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
      const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
      this.canvas = canvas;
      this.context = context;


      if (context) {
        // Use beginPath and other Canvas API methods

        this.update().then(r => 0)
      } else {
        console.error('2D context is null');
      }
    }
  }

  setGrid(tab: number[][]){
    this.tab = tab;
  }

  async update() {
    if (this.context) {
      this.context.clearRect(0,0,800,500)
      // Your drawing code using this.context
      this.context.fillStyle = 'blue';
      this.context.fillRect(0,0,800,500);

      for(let i = 0; i < 6; i++){
        for(let j = 0; j < 7; j++){
          this.context.beginPath();
          switch(this.tab[i][j]){
            case 0:
              this.context.fillStyle = "grey";
              break;
            case 1:
              this.context.fillStyle = "yellow";
              break;
            case 2:
              this.context.fillStyle = "red";
              break;
          }
          this.context.arc(j*114+55, i*80+50, 35, 0, 2 * Math.PI);
          this.context.fill();
        }
      }
    }

    await new Promise(r => setTimeout(r, (1000/30)));
    requestAnimationFrame(() => this.update());
  }

}
