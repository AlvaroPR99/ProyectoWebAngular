import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MarcasService } from '../../services/marca/marcas.services';
import { HostListener } from '@angular/core';

/**
 * @description Componente que representa el catálogo de productos Apple.
 * @export
 * @class CatalogoAppleComponent
 * @implements {OnInit}
 */

@Component({
  selector: 'app-catalogo-apple',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './catalogo-apple.component.html',
  styleUrls: ['./catalogo-apple.component.css']
})
export class CatalogoAppleComponent implements OnInit {

  /**Nombre de Apple */
  apple: string;
  
  /**Nombre de Samsung */
  samsung: string;

  /**Nombre de Reservar */
  reserva: string;

  /**Nombre de Home */
  home: string; 

  /**Nombre de noticias */
  news: string;

  /**Modelos JSON de los móviles */
  modelos = [
    {
      id: '1',
      name: 'iPhone 16',
      image: ['assets/image/iPhone/iphone16-rosa.jpg', 'assets/image/iPhone/iphone16-negro.jpg','assets/image/iPhone/iphone16-blanco.jpg'
        ,'assets/image/iPhone/iphone16-verde.jpg','assets/image/iPhone/iphone16-azul.jpg'
      ],
      colors: ['Rosa', 'Negro', 'Blanco', 'Verde', 'Azul'],
      capacities: ['128GB', '256GB', '512GB', '1TB'],
      operating_system: 'iOS',
      chip: 'A18 Bionic',
      price: ['899€', '999€', '1099€', '1299€']
    },
    {
      id: '2',
      name: 'iPhone 16 Pro',
      image: ['assets/image/iPhone/iphone16-pro-natural.jpg', 'assets/image/iPhone/iphone16-pro-blanco.jpg',
        'assets/image/iPhone/iphone16-pro-desierto.jpg', 'assets/image/iPhone/iphone16-pro-negro.jpg'
      ],
      colors: ['Natural', 'Blanco', 'Desierto', 'Negro'],
      capacities: ['128GB', '256GB', '512GB', '1TB'],
      operating_system: 'iOS',
      chip: 'A18 Pro',
      price: ['1199€', '1299€', '1499€', '1699€']
    },
    {
      id: '3',
      name: 'iPhone 16 Pro Max',
      image: ['assets/image/iPhone/iphone16-pro-natural.jpg', 'assets/image/iPhone/iphone16-pro-blanco.jpg',
        'assets/image/iPhone/iphone16-pro-desierto.jpg', 'assets/image/iPhone/iphone16-pro-negro.jpg'
      ],
      colors: ['Natural', 'Blanco', 'Desierto', 'Negro'],
      capacities: ['256GB', '512GB', '1TB'],
      operating_system: 'iOS',
      chip: 'A18 Pro',
      price: ['1399€', '1599€', '1899€']
    }
  ];

  modelosCombinados: string[] = [];

    /**
   * @description Constructor del componente.
   * @param {MarcasService} marcasService Servicio que gestiona los nombres de la cabecera.
   */

  constructor(private marcasService: MarcasService) {
    this.apple = this.marcasService.apple;
    this.samsung = this.marcasService.samsung;
    this.reserva = this.marcasService.reserva;
    this.home = this.marcasService.home;
    this.news = this.marcasService.news;
  }

  lastScrollTop: number = 0;
  
  ngOnInit(): void {

    this.hideHeaderOnScroll();

    this.modelos.forEach(modelo => {
      modelo.colors.forEach(color => {
        modelo.capacities.forEach(capacidad => {
          this.modelosCombinados.push(`${modelo.name} ${color} ${capacidad}`);
        });
      });
    });
  }

/**
   * @description Método para detectar el scroll y ocultar/mostrar la cabecera.
   * @memberof CatalogoAppleComponent
   */

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.hideHeaderOnScroll();
  }

  /**
   * @description Método que maneja el comportamiento de la cabecera.
   * @memberof CatalogoAppleComponent
   */
  hideHeaderOnScroll() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const header = document.querySelector('.cabecera') as HTMLElement;

    if (currentScroll > this.lastScrollTop) {
      header.classList.add('hide');
    } else {
      header.classList.remove('hide');
    }
    
    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Para evitar valores negativos
  }
  

  /**
   * 
   * @description Método para obtener el nombre del modelo seleccionado.
   * @returns 
   * @memberof CatalogoAppleComponent
   */
   getNumMoviles(): number {
    return this.modelosCombinados.length;
  }

  /**
   * 
   * @param modeloCombinado Método para obtener la imagen del modelo seleccionado.
   * @returns 
   * @memberof CatalogoAppleComponent
   */
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
  
  /**
   * 
   * @param modeloCombinado Método para obtener el color del modelo seleccionado.
   * @returns 
   * @memberof CatalogoAppleComponent
   */
  getColor(modeloCombinado: string): string {
    const nombreModelo = this.getNombreModelo(modeloCombinado);
    const modelo = this.modelos.find(m => m.name === nombreModelo); 
    if (modelo) {
      const colorSeleccionado = modeloCombinado.split(' ').slice(-2, -1)[0]; 
      const colorIndex = modelo.colors.indexOf(colorSeleccionado); 
      console.log('Modelo:', nombreModelo, '| Color Seleccionado:', colorSeleccionado, '| Índice:', colorIndex);
      return modelo.colors[colorIndex] || ''; 
    }
    console.log('Modelo no encontrado para color:', modeloCombinado);
    return '';
  }
  
  
  /**
   * 
   * @param modeloCombinado Método para obtener el chip del modelo seleccionado.
   * @returns 
   * @memberof CatalogoAppleComponent
   */
  getChip(modeloCombinado: string): string {
    const nombreModelo = this.getNombreModelo(modeloCombinado);
    const modelo = this.modelos.find(m => m.name === nombreModelo);
    console.log('Modelo:', nombreModelo, '| Chip:', modelo?.chip || 'No encontrado');
    return modelo ? modelo.chip : '';
  }

  /**
   * 
   * @param modeloCombinado Método para obtener el sistema operativo del modelo seleccionado.
   * @returns 
   * @memberof CatalogoAppleComponent
   */
  private getNombreModelo(modeloCombinado: string): string {
    return modeloCombinado.includes('Pro Max')
      ? 'iPhone 16 Pro Max'
      : modeloCombinado.includes('Pro')
      ? 'iPhone 16 Pro'
      : 'iPhone 16';
  }

  /**
   * 
   * @param modeloCombinado Método para obtener el precio del modelo seleccionado.
   * @returns 
   * @memberof CatalogoAppleComponent
   */
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

  /**
   * 
   * @param modeloCombinado Método para obtener la capacidad del modelo seleccionado.
   * @returns 
   * @memberof CatalogoAppleComponent
   */
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
