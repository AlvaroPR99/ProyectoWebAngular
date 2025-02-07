import { Component } from '@angular/core';
import { MarcasService } from '../../services/marca/marcas.services';

@Component({
  selector: 'app-apple',
  imports: [],
  templateUrl: './apple.component.html',
  styleUrl: './apple.component.css'
})
export class AppleComponent {

  nombre="Iphone 16 Pro Max";
  descripcion = "El iPhone Pro Max con la mejor pantalla y cámara de Apple.";
  imagenURL = "";
  especificaciones = "Pantalla 6.7, 8GB RAM, 512GB almacenamiento, batería 4500mAh.";
}
