import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import {Player} from "../playerModel";

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  private endpoints='http://localhost:3000/';

  constructor(private http: HttpClient) { }
  registerPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(`${this.endpoints}register`, player);




}

}
