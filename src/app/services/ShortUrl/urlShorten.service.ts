import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

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
    return this.http
      .post<{ shortUrl: string }>(`${this.apiUrl}/shorten`, { url: originalUrl });
  }

  acortarPersonalizado(originalUrl: string, customAlias: string): Observable<UrlResponse> {
    return this.http
      .post<{ shortUrl: string }>(`${this.apiUrl}/shorten/${customAlias}`, { url: originalUrl });
  }
}
