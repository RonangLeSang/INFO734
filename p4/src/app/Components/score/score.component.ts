import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { PersonalscoreComponent} from './personalScore/personal-score/personalscore.component';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [CommonModule, HttpClientModule, PersonalscoreComponent],
  templateUrl: './score.component.html',
  styleUrl: './score.component.css'
})
export class ScoreComponent {
  requestApi='cheminApi'
  playerList: any[]=[];
  numberPlayers:any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(this.requestApi).subscribe((data: any) => {
      this.playerList = data.results;
      this.numberPlayers = this.playerList.length;

    });
    for (let i = 0; i < this.numberPlayers; i++) {

      this.playerList[i].id = i + 1;
    }
  }}




