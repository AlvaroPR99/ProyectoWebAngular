import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';

export interface UrlResponse {
  shortUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class UrlShortenService {
  private apiUrl = 'http://localhost:8080/Shears';

  constructor(private http: HttpClient) {}

  acortarAleatorio(originalUrl: string): Observable<UrlResponse> {
    const token = localStorage.getItem('token');
    const headers = token
      ? new HttpHeaders().set('Authorization', `Bearer ${token}`)
      : undefined;

    return this.http.post<UrlResponse>(
      `${this.apiUrl}/shorten`, 
      { url: originalUrl },
      { headers: headers || new HttpHeaders() }
    );
  }

  acortarPersonalizado(originalUrl: string, customAlias: string): Observable<UrlResponse> {
    const token = localStorage.getItem('token');
    const headers = token
      ? new HttpHeaders().set('Authorization', `Bearer ${token}`)
      : undefined;

    return this.http.post<UrlResponse>(
      `${this.apiUrl}/shorten/${customAlias}`, 
      { url: originalUrl },
      { headers: headers || new HttpHeaders() }
    );
  }

  eliminarUrl(shortUrl: string): Observable<any> {
  const token = localStorage.getItem('token');

  const headers = token
    ? new HttpHeaders({ Authorization: `Bearer ${token}` })
    : new HttpHeaders(); // cabeceras vacías si no hay token

  return this.http.delete(`${this.apiUrl}/delete-url/${shortUrl}`, { headers });
}



}
