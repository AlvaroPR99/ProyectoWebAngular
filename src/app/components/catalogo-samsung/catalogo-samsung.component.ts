import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MarcasService } from '../../services/marca/marcas.services';

@Component({
  selector: 'app-catalogo-samsung',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './catalogo-samsung.component.html',
  styleUrls: ['./catalogo-samsung.component.css']
})
export class CatalogoSamsungComponent implements OnInit {
  apple: string;
  samsung: string;
  reserva: string;
  home: string; 
  news: string;

  modelos = [
    {
      id: '1',
      name: 'Samsung Galaxy S25 ultra',
      image: ['https://images.samsung.com/es/smartphones/galaxy-s25-ultra/buy/04_Color-Selection/04_1_Basic-Color/Color-Selection_Titanium-Silverblue_PC.png?imbypass=true', 'https://images.samsung.com/es/smartphones/galaxy-s25-ultra/buy/04_Color-Selection/04_1_Basic-Color/Color-Selection_Titanium-Black_PC.png?imbypass=true'
        ,'https://images.samsung.com/es/smartphones/galaxy-s25-ultra/buy/04_Color-Selection/04_1_Basic-Color/Color-Selection_Titanium-Whitesilver_PC.png?imbypass=true','https://images.samsung.com/es/smartphones/galaxy-s25-ultra/buy/04_Color-Selection/04_1_Basic-Color/Color-Selection_Titanium-Gray_PC.png?imbypass=true'
      ],
      colors: ['Azul', 'Negro', 'Plata', 'Gris'],
      capacities: ['256GB', '512GB', '1TB'],
      operating_system: 'Android',
      chip: 'Exynos 2400',
      price: ['1250€', '1350€', '1650€']
    }
  ];

  modelosCombinados: string[] = [];

  constructor(private marcasService: MarcasService) {
    this.apple = this.marcasService.apple;
    this.samsung = this.marcasService.samsung;
    this.reserva = this.marcasService.reserva;
    this.home = this.marcasService.home;
    this.news = this.marcasService.news;
  }

  ngOnInit(): void {
    this.modelos.forEach(modelo => {
      modelo.colors.forEach(color => {
        modelo.capacities.forEach(capacidad => {
          this.modelosCombinados.push(`${modelo.name} ${color} ${capacidad}`);
        });
      });
    });
  }
  
   // Contamos el número de modelos combinados
   getNumMoviles(): number {
    return this.modelosCombinados.length;
  }

  getImageForModel(modeloCombinado: string): string {
    const nombreModelo = this.getNombreModelo(modeloCombinado); // Obtener el nombre del modelo (iPhone 16, iPhone 16 Pro, etc.)
    const modelo = this.modelos.find(m => m.name === nombreModelo); // Buscar el modelo correspondiente en el array
    if (modelo) {
      const colorSeleccionado = this.getColor(modeloCombinado); // Obtener el color seleccionado
      const colorIndex = modelo.colors.indexOf(colorSeleccionado); // Obtener el índice del color seleccionado
      console.log('Modelo:', nombreModelo, '| Color:', colorSeleccionado, '| Índice:', colorIndex);
      return modelo.image[colorIndex] || ''; // Devolver la imagen correspondiente al índice
    }
    console.log('Modelo no encontrado para imagen:', modeloCombinado);
    return '';
  }
  
  
  getColor(modeloCombinado: string): string {
    const nombreModelo = this.getNombreModelo(modeloCombinado); // Obtener el nombre del modelo
    const modelo = this.modelos.find(m => m.name === nombreModelo); // Buscar el modelo correspondiente
    if (modelo) {
      const colorSeleccionado = modeloCombinado.split(' ').slice(-2, -1)[0]; // Extraer el color del modelo combinado
      const colorIndex = modelo.colors.indexOf(colorSeleccionado); // Buscar el índice del color
      console.log('Modelo:', nombreModelo, '| Color Seleccionado:', colorSeleccionado, '| Índice:', colorIndex);
      return modelo.colors[colorIndex] || ''; // Retornar el color correspondiente
    }
    console.log('Modelo no encontrado para color:', modeloCombinado);
    return '';
  }
  
  
  

  getChip(modeloCombinado: string): string {
    const nombreModelo = this.getNombreModelo(modeloCombinado);
    const modelo = this.modelos.find(m => m.name === nombreModelo);
    console.log('Modelo:', nombreModelo, '| Chip:', modelo?.chip || 'No encontrado');
    return modelo ? modelo.chip : '';
  }

  private getNombreModelo(modeloCombinado: string): string {
    // Busca el modelo base en la lista de nombres de modelos
    const modelo = this.modelos.find(m => modeloCombinado.startsWith(m.name));
    return modelo ? modelo.name : ''; // Devuelve el nombre del modelo si se encuentra
  }
  

  getPrice(modeloCombinado: string): string {
    const nombreModelo = this.getNombreModelo(modeloCombinado);
    const modelo = this.modelos.find(m => m.name === nombreModelo);
    if (modelo) {
      const capacidadSeleccionada = this.getCapacity(modeloCombinado);
      const capacidadIndex = modelo.capacities.indexOf(capacidadSeleccionada);
      console.log('Modelo:', nombreModelo, '| Capacidad:', capacidadSeleccionada, '| Índice:', capacidadIndex);
      return modelo.price[capacidadIndex] || '';
    }
    console.log('Modelo no encontrado para precio:', modeloCombinado);
    return '';
  }

  getCapacity(modeloCombinado: string): string {
    const nombreModelo = this.getNombreModelo(modeloCombinado);
    const modelo = this.modelos.find(m => m.name === nombreModelo);
    if (modelo) {
      const capacidadSeleccionada = modelo.capacities.find(cap => modeloCombinado.includes(cap));
      console.log('Modelo:', nombreModelo, '| Capacidad seleccionada:', capacidadSeleccionada || 'No encontrada');
      return capacidadSeleccionada || '';
    }
    console.log('Modelo no encontrado para capacidad:', modeloCombinado);
    return '';
  }
}
