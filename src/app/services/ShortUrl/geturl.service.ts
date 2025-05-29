import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private apiUrl = 'http://localhost:8080/Shears/get-users'; 

  constructor(private http: HttpClient) {}

  getUrls(): Observable<any[]> {
    const token = localStorage.getItem('token');


    if (!token) {
      console.error('No token found in localStorage');
      return throwError(() => new Error('No token found'));
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any[]>(this.apiUrl, { headers });
  }

}
