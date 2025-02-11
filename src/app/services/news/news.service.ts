import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiKey = 'a994cdcdc821440c98d9b4e33ac47acc';
  private baseUrl = 'https://newsapi.org/v2/everything?q=apple&from=2025-02-10&to=2025-02-10&sortBy=popularity&apiKey=a994cdcdc821440c98d9b4e33ac47acc';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    const params = {
      access_key: this.apiKey,
    };

    return this.http.get(this.baseUrl, { params });
  }
}
