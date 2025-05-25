import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sub-header',
  imports: [SearchbarComponent, FormsModule, CommonModule],
  templateUrl: './sub-header.component.html',
  styleUrl: './sub-header.component.css'
})
export class SubHeaderComponent {

  colors: string[] = ["Blanco", "Amarillo", "Azul"];
  selectedColor: string = "Blanco";

  constructor() { 
    
  }

  onColorChanged() {
    console.log('Color seleccionado', this.selectedColor);
    // Aquí puedes hacer algo con la selección, como actualizar una búsqueda o filtrar datos
  }
}
