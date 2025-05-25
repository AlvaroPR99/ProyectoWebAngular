import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterRequest } from './RegisterRequest'; // o el path correcto



/**
 * @description Servicio para obtener noticias relacionadas con Apple desde la API de NewsAPI.
 * @export
 * @class NewsService
 */
@Injectable({
  providedIn: 'root'
})
export class RegisterService {


  /** 
   * @description URL base para realizar la solicitud a la API de noticias.
   * @private
   * @type {string} 
   */
  private API_URL = 'http://localhost:8080/api/auth/register';

  /**
   * @description Constructor del servicio `NewsService`.
   * @param {HttpClient} http Cliente HTTP para realizar las solicitudes.
   */
  constructor(private http: HttpClient) {}


register(request: RegisterRequest): Observable<any> {
  return this.http.post(this.API_URL, request);
}

}
