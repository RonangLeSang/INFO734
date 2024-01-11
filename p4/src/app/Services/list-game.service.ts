import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListGameService {
  private apiUrl = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }
  getListGame(): Observable<number[][]> {
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
    const url = `${this.apiUrl}listGameInWait`;
    const requestBody = {};
    return this.http.post(url, requestBody, options).pipe(
      map((data: any) => data)
    );
  }

  joinGame(idGame: string){
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

    const url = `${this.apiUrl}joinGame`;
    const requestBody = { idGame: idGame };
    return this.http.post(url, requestBody, { headers }).pipe(
      map((data: any) => data)
    );
  }

}
