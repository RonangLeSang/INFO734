import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getGrid(): Observable<number[][]> {
    const url = `${this.apiUrl}GetGrid`;
    return this.http.get(url).pipe(
      map((data: any) => data.grid)
    );
  }

  makeAMove(pos: number): Observable<number[][]> {
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
