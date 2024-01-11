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
    const options = { headers, withCredentials: true };

    const user = localStorage.getItem(`userid`);



    const url = `${this.apiUrl}listGameInWait`;
    const requestBody = {'username':user};
    return this.http.post(url, requestBody, options).pipe(
      map((data: any) => data)
    );
  }

  joinGame(idGame: string){
    let headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

    const options = { headers, withCredentials: true };
    const user = localStorage.getItem(`userid`);

    const url = `${this.apiUrl}joinGame`;
    const requestBody = { idGame: idGame,username: user };
    console.log(requestBody);
    return this.http.post(url, requestBody, { headers }).pipe(
      map((data: any) => {
        const sessionData = data.session;

        // Store the session information in localStorage
        localStorage.setItem('session', JSON.stringify(sessionData));

        return data;
      })
    );
  }

}
