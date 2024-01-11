import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {HoleComponent} from "../hole/hole.component";
import {GridService} from "../../Services/grid.service";
import {response} from "express";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

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
                      [0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0]];
  @ViewChild('canvas')
  canvas!: HTMLCanvasElement;

  context!: CanvasRenderingContext2D | null;

  pointerX: number = 0;
  pointerY: number = 0;

  isYourTurn: boolean = true;
  constructor(private gridService: GridService, private cookie:CookieService, public router:Router) {}

  @ViewChild('myCanvas', { static: true }) myCanvas!: ElementRef<HTMLCanvasElement>;

  setGrid(tab: number[][]){
    this.tab = tab;
  }

  setTurn(turn: boolean){
    this.isYourTurn = turn;
  }

  makeMove(move: number) {
    this.setTurn(false);
    this.gridService.makeAMove(move).subscribe((updatedGrid: number[][]) => {
      console.log(updatedGrid);
      if (updatedGrid) {
        console.log("yo");
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


  victory(player: number){
    if (this.context){
      let color = "black";
      if(player === -1){
        color= "red";
      }else{
        color= "yellow";
      }
      this.context.clearRect(0,0,800,500)
      this.context.fillStyle = color;
      this.context.font = "48px serif";
      this.context.fillText(color + " win", 10, 50);
    }
  }

  async update() {
    this.isMyTurn();
    if (this.context) {
      this.context.clearRect(0,0,800,500)
      // Your drawing code using this.context
      this.context.fillStyle = 'blue';
      this.context.fillRect(0,0,800,500);

      if(Math.abs(this.tab[0][0]) === 2){
        this.victory(this.tab[0][0]/2)
      }else{
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
    }

    await new Promise(r => setTimeout(r, (1000)));
    requestAnimationFrame(() => this.update());
  }

  // ngOnInit() {
  //   this.gridService.isMyTurn().subscribe((grid: number[][] | null) => {
  //     if(grid){
  //       this.setGrid(grid);
  //     }
  //   });
  // }



  isMyTurn() {
    console.log("update");
    const sessionData = localStorage.getItem('session');
    if(sessionData){
      let session = JSON.parse(sessionData)
      const userid = session["userid"];
      localStorage.setItem('userid',userid );
      console.log(userid);
      // const idGame = session["idGame"]
      const idGame = "659eff1a970910aaf5e2c899";
      console.log(idGame);


      this.gridService.isMyTurn(idGame, userid).subscribe((updatedGrid: number[][] | null) => {
        console.log('Subscription triggered'); // Add this line
        if (updatedGrid) {
          console.log(updatedGrid);
          this.setGrid(updatedGrid);
          this.setTurn(true);
        } else {
          console.error('Invalid response format: "grid" property is missing.');
        }
      }, error => {
        console.error('Error making a move:', error);
      });
    }
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
