import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from './RegisterRequest';
import { Observable } from 'rxjs';
import { LoginRequest } from './LoginRequest';


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


login(request: LoginRequest): Observable<any> {
  return this.http.post(this.API_URL, request);

}
}
