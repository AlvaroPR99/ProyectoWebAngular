import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarcasService } from '../../services/marca/marcas.services';


@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent {
  apple: string;
  samsung: string;
  reserva: string;

  constructor(private marcasService: MarcasService) {
    // Accede a los valores del servicio
    this.apple = this.marcasService.apple;
    this.samsung = this.marcasService.samsung;
    this.reserva = this.marcasService.reserva;
  }
}