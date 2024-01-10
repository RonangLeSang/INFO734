import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GridService {

  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  // getGrid(): Observable<number[][]> {
  //   const url = `${this.apiUrl}GetGrid`;
  //   return this.http.get(url).pipe(
  //     map((data: any) => data.grid)
  //   );
  // }

  makeAMove(pos: number): Observable<number[][]> {
    const url = `${this.apiUrl}makeAMove`;
    const requestBody = { position: pos };
    return this.http.post(url, requestBody).pipe(
      map((data: any) => data.grid)
    );
  }
}
