import { Injectable } from '@angular/core';

/**
 * @description Servicio que proporciona información sobre las marcas disponibles en la aplicación.
 * @export
 * @class MarcasService
 */
@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible en toda la aplicación
})
export class MarcasService {

  /** @description Nombre de la marca Apple */
  readonly apple = 'Apple';

  /** @description Nombre de la marca Samsung */
  readonly samsung = 'Samsung';

  /** @description Texto de la opción de reserva */
  readonly reserva = 'Reservar';

  /** @description Texto de la opción de inicio */
  readonly home = 'Home';

  /** @description Texto de la opción de noticias */
  readonly news = 'Noticias';

  /**
   * @description Constructor del servicio `MarcasService`.
   * @memberof MarcasService
   */
  constructor() {}
}
