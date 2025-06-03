import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrService {

  private apiUrl = 'http://localhost:8080/Shears/qr'; // URL para generar el código QR

  constructor(private http: HttpClient) {}

  // Método para generar la URL del código QR
  generateQrCodeUrl(shortUrl: string): Observable<Blob> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return throwError(() => new Error('No token found'));
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const shortCode = this.getShortCode(shortUrl);
    const qrUrl = `${this.apiUrl}/${shortCode}`;

    // Especificamos que esperamos una respuesta en formato Blob (imagen)
    return this.http.get<Blob>(qrUrl, { headers, responseType: 'blob' as 'json' });
  }

  // Método auxiliar para extraer el código corto
  private getShortCode(url: string): string {
  // Verifica que la URL esté bien estructurada antes de extraer el código


  const parts = url.split('/');
  const shortCode = parts[parts.length - 1]; // Debería ser la última parte de la URL


  return shortCode ?? ''; // Retorna el shortCode, o una cadena vacía si no existe
}


}
