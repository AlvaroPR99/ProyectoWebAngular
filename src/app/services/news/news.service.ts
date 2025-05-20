import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * @description Servicio para obtener noticias relacionadas con Apple desde la API de NewsAPI.
 * @export
 * @class NewsService
 */
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  /** 
   * @description Clave de acceso a la API de NewsAPI.
   * @private
   * @type {string} 
   */
  private apiKey = 'a994cdcdc821440c98d9b4e33ac47acc';

  /** 
   * @description URL base para realizar la solicitud a la API de noticias.
   * @private
   * @type {string} 
   */
  private baseUrl = 'http://localhost:8080/api/auth/login';

  /**
   * @description Constructor del servicio `NewsService`.
   * @param {HttpClient} http Cliente HTTP para realizar las solicitudes.
   */
  constructor(private http: HttpClient) {}

  /**
   * @description Obtiene los datos de noticias desde la API.
   * @returns {Observable<any>} Un observable con la respuesta de la API.
   */
  getData(): Observable<any> {
    const params = {
      access_key: this.apiKey,
    };

    return this.http.get(this.baseUrl, { params });
  }

   login(credentials:any){
    console.log('Login request:', credentials);
    }
}
