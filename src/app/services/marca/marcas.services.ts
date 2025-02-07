import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible en toda la aplicación
})
export class MarcasService {
  // Nombres de las marcas
  readonly apple = 'Apple';
  readonly samsung = 'Samsung';
  readonly reserva = 'Reserva';
  readonly home = 'Home';

  constructor() {}
}
