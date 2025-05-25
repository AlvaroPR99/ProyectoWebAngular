import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  imports: [RouterModule, FormsModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent {
  searchQuery: string = ''; // Variable para almacenar la búsqueda

  onSearch() {
    console.log('Búsqueda:', this.searchQuery);
    // Aquí puedes implementar la lógica de búsqueda
  }

  clearSearch() {
    this.searchQuery = ''; // Limpia el campo de búsqueda
  }
}
