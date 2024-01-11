import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class GridService {

  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient, private cookie:CookieService) {}

  isMyTurn(idGame: string, userid: string): Observable<any> {
    const url = `${this.apiUrl}isMyTurn?idGame=${idGame}&userid=${userid}`;
    return this.http.get(url).pipe(
      map((data: any) => data.grid)
    );
  }

  makeAMove(pos: number): Observable<number[][]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    // Include the 'withCredentials' option to enable sending and receiving cookies
    const options = { headers, withCredentials: true };

    const url = `${this.apiUrl}makeAMove`;
    const requestBody = { move: pos };

    return this.http.post(url, requestBody, options).pipe(
      map((data: any) => data.grid)
    );
  }
}
