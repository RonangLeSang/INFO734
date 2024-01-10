import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {HoleComponent} from "../hole/hole.component";
import {GridService} from "../../Services/grid.service";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  standalone: true,
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements AfterViewInit {

  tab: number[][] = [[0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,1,0,0,0],
    [0,0,0,-1,0,0,0],
    [0,1,-1,-1,0,0,0],
    [1,2,-1,-1,0,0,0]];
  @ViewChild('canvas')
  canvas!: HTMLCanvasElement;

  context!: CanvasRenderingContext2D | null;

  pointerX: number = 0;
  pointerY: number = 0;

  isYourTurn: boolean = true;
  isYellow: boolean = true;
  constructor(private gridService: GridService) {}

  @ViewChild('myCanvas', { static: true }) myCanvas!: ElementRef<HTMLCanvasElement>;

  setGrid(tab: number[][]){
    this.tab = tab;
  }

  setTurn(turn: boolean){
    this.isYourTurn = turn;
  }

  makeMove(move: number) {
    this.gridService.makeAMove(move).subscribe((updatedGrid: number[][]) => {
      console.log(updatedGrid);
      if (updatedGrid) {
        this.setGrid(updatedGrid);
      } else {
        console.error('Invalid response format: "grid" property is missing.');
      }
    }, error => {
      console.error('Error making a move:', error);
    });
  }

  detectMove(event: MouseEvent): void {
    // Récupérer les coordonnées de la souris par rapport au canvas
    const rect = this.canvas.getBoundingClientRect();
    this.pointerX = event.clientX - rect.left;
    this.pointerY = event.clientY - rect.top;
  }

  detectClick(event: MouseEvent): void {
    this.detectMove(event);

    if (this.isYourTurn) {
      const column = Math.floor(this.pointerX / 111);

      if (column >= 0 && column < this.tab[0].length && this.tab[0][column] === 0) {
        console.log(column);
        this.makeMove(column);
      }
    }
  }


  // victory(points: number[][]){
  //   if (this.context) {
  //     this.context.beginPath();
  //     for(let i = 0; i < 4; i++){
  //       this.context.strokeStyle = "black";
  //       this.context.lineTo(points[i][0]*114+55, points[i][1]*80+50);
  //     }
  //   }
  // }

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
    // this.victory([[1,2],[1,3],[1,4],[1,5]])

    await new Promise(r => setTimeout(r, (1000/10)));
    requestAnimationFrame(() => this.update());
  }

  ngOnInit() {
    this.gridService.getGrid().subscribe((grid: number[][]) => {
      this.setGrid(grid);
    });
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
