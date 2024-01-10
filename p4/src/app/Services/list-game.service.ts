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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const url = `${this.apiUrl}listGameInWait`;
    const requestBody = {};
    return this.http.post(url, requestBody, { headers }).pipe(
      map((data: any) => data)
    );
  }
}
