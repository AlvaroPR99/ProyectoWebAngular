import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


/**
 * @description Servicio para obtener noticias relacionadas con Apple desde la API de NewsAPI.
 * @export
 * @class NewsService
 */
@Injectable({
  providedIn: 'root'
})
export class LoginService {


  /** 
   * @description URL base para realizar la solicitud a la API de noticias.
   * @private
   * @type {string} 
   */
  private API_URL = 'http://localhost:8080/api/auth/login';

  /**
   * @description Constructor del servicio `NewsService`.
   * @param {HttpClient} http Cliente HTTP para realizar las solicitudes.
   */
  constructor(private http: HttpClient) {}


login(credentials: any) {
  this.http.post(this.API_URL, credentials).subscribe({
    next: (userData: any) => {
      console.log('Login successful', userData);
    },
    error: (errorData: any) => {
      console.error('Login failed', errorData);
    },
    complete: () => {
      console.log('Login request completed');
    }
  });
}
}
