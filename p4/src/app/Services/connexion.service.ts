import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';

import {Player} from "../playerModel";

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  apiUrl='http://localhost:3000/';
  currentUser = {};


  constructor(private http: HttpClient, public router: Router) {}


  loginPlayer(player:Player) Observable<number[][]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const url = `${this.apiUrl}makeAMove`;
    const requestBody = { move: pos };
    return this.http.post(url, requestBody, { headers }).pipe(
      map((data: any) => data.grid)
    );
  }

}
