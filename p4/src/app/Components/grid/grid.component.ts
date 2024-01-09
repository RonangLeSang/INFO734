import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {HoleComponent} from "../hole/hole.component";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  standalone: true,
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements AfterViewInit {

  tab: number[][] = [[0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0],
                    [0,0,-1,0,1,0,0],
                    [0,1,1,1,-1,0,0]];
  @ViewChild('canvas')
  canvas!: HTMLCanvasElement;

  context!: CanvasRenderingContext2D | null;

  pointerX: number = 0;
  pointerY: number = 0;

  isYourTurn: boolean = true;
  isYellow: boolean = true;
  constructor(){}

  @ViewChild('myCanvas', { static: true }) myCanvas!: ElementRef<HTMLCanvasElement>;

  setGrid(tab: number[][]){
    this.tab = tab;
  }

  setTurn(turn: boolean){
    this.isYourTurn = turn;
  }

  detectMove(event: MouseEvent): void {
    // Récupérer les coordonnées de la souris par rapport au canvas
    const rect = this.canvas.getBoundingClientRect();
    this.pointerX = event.clientX - rect.left;
    this.pointerY = event.clientY - rect.top;
  }

  detectClick(event: MouseEvent): void {
    this.detectMove(event);
    if(this.isYourTurn){
      // this.isYourTurn = false;
      if(this.pointerX < 111){
        if(this.tab[0][0] == 0){
          console.log(0);
        }
      }else {if (this.pointerX < 222){
        if(this.tab[0][1] == 0){
          console.log(1);
        }
      }else {if (this.pointerX < 333){
        if(this.tab[0][2] == 0){
          console.log(2);
        }
      }else {if (this.pointerX < 444){
        if(this.tab[0][3] == 0){
          console.log(3);
        }
      }else {if (this.pointerX < 555){
        if(this.tab[0][4] == 0){
          console.log(4);
        }
      }else {if (this.pointerX < 666){
        if(this.tab[0][5] == 0){
          console.log(5);
        }
      }else {if (this.pointerX < 777){
        if(this.tab[0][6] == 0){
          console.log(6);
        }
    }}}}}}}}
  }

  victory(points: number[][]){
    if (this.context) {
      this.context.beginPath();
      for(let i = 0; i < 4; i++){
        this.context.strokeStyle = "black";
        this.context.lineTo(points[i][0]*114+55, points[i][1]*80+50);
      }
    }
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
            case -1:
              this.context.fillStyle = "red";
              break;
          }
          this.context.arc(j*114+55, i*80+50, 35, 0, 2 * Math.PI);
          this.context.fill();
        }
      }
    }
    this.victory([[1,2],[1,3],[1,4],[1,5]])

    await new Promise(r => setTimeout(r, (1000/30)));
    requestAnimationFrame(() => this.update());
  }

  ngAfterViewInit() {
    try {
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
    } catch (error) {
      console.error('Error in ngAfterViewInit:', error);
    }
  }

}
