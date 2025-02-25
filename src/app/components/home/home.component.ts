import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarcasService } from '../../services/marca/marcas.services';

/**
 * @description Componente que representa el catálogo de productos Apple.
 * @export
 * @class HomeComponent
 * @implements {OnInit}
 */

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent {

   /**Nombre de Home */
  home: string;

  /**Nombre de Apple */
  apple: string;

  /**Nombre de Samsung */
  samsung: string;

  /**Nombre de Reservar */
  reserva: string;

  /**Nombre de Noticias */
  news: string;

  /**
   * @description Constructor del componente.
   * @param {MarcasService} marcasService Servicio que gestiona los nombres de la cabecera.
   */
  constructor(private marcasService: MarcasService) {
    // Accede a los valores del servicio
    this.home = this.marcasService.home;
    this.apple = this.marcasService.apple;
    this.samsung = this.marcasService.samsung;
    this.reserva = this.marcasService.reserva;
    this.news = this.marcasService.news;
  }
}