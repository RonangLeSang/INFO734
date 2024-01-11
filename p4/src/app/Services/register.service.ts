import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map,Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }
  register(username: string, password: string): Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const url = `${this.apiUrl}register`;
    const requestBody = { 'username': username, 'password': password };
    return this.http.post(url, requestBody, { headers }).pipe(
      map((data: any) => {
        // Assuming the response contains the session information, adjust accordingly
        const sessionData = data.session;

        // Store the session information in localStorage


        return data; // You might want to return a specific value from the login response
      })
    );

  }
}
