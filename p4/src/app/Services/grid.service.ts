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

  isMyTurn(): Observable<number[][]> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const sessionDataString = localStorage.getItem('session');
    console.log('Session Data:', sessionDataString);

    const sessionData = sessionDataString ? JSON.parse(sessionDataString) : null;

    if (sessionData) {
      headers = headers.set('session', sessionData.cookie);
    }

    const options = { headers, withCredentials: true };

    const url = `${this.apiUrl}isMyTurn`;
    console.log('Request URL:', url);
    console.log('Request Headers:', headers);

    return this.http.get(url, options).pipe(
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
