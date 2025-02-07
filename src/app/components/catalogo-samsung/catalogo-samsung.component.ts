import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MarcasService } from '../../services/marca/marcas.services';

@Component({
  selector: 'app-catalogo-samsung',
  imports: [RouterModule],
  templateUrl: './catalogo-samsung.component.html',
  styleUrl: './catalogo-samsung.component.css'
})
export class CatalogoSamsungComponent {

    apple: string;
    samsung: string;
    reserva: string;
    home: string;
  
    constructor(private marcasService: MarcasService) {
      // Accede a los valores del servicio
      this.apple = this.marcasService.apple;
      this.samsung = this.marcasService.samsung;
      this.reserva = this.marcasService.reserva;
      this.home = this.marcasService.home;
    }
}
