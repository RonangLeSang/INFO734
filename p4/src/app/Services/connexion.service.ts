import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map,Observable } from 'rxjs'
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient, private cookie:CookieService) { }

  login(username: string, password: string): Observable<string> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // Ajoutez les cookies de session à la requête
    const sessionCookie = this.cookie.get('cookie');
    if (sessionCookie) {
      headers = headers.append('Cookie', sessionCookie);
    }

    const url = `${this.apiUrl}login`;
    const requestBody = { 'username': username, 'password': password };

    return this.http.post(url, requestBody, { headers }).pipe(
      map((data: any) => data)
    );
  }
}
