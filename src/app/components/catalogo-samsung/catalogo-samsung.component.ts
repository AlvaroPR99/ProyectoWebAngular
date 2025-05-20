import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MarcasService } from '../../services/marca/marcas.services';
import { HostListener } from '@angular/core';

/**
 * @description Componente que representa el catálogo de productos Samsung.
 * @export
 * @class CatalogoSamsungComponent
 * @implements {OnInit}
 */

@Component({
  selector: 'app-catalogo-samsung',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './catalogo-samsung.component.html',
  styleUrls: ['./catalogo-samsung.component.css']
})
export class CatalogoSamsungComponent implements OnInit {

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
   * @memberof CatalogoSamsungComponent
   */
    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
      this.hideHeaderOnScroll();
    }
  
    /**
   * @description Método que maneja el comportamiento de la cabecera.
   * @memberof CatalogoSamsungComponent
   */
    hideHeaderOnScroll() {
      let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      const header = document.querySelector('.cabecera') as HTMLElement;
  
      if (currentScroll > this.lastScrollTop) {
        header.classList.add('hide');
      } else {
        header.classList.remove('hide');
      }
      
      this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; 
    }
  
     /**
   * 
   * @description Método para obtener el nombre del modelo seleccionado.
   * @returns 
   * @memberof CatalogoSamsungComponent
   */
   getNumMoviles(): number {
    return this.modelosCombinados.length;
  }

  /**
   * 
   * @param modeloCombinado Método para obtener la imagen del modelo seleccionado.
   * @returns 
   * @memberof CatalogoSamsungComponent
   */
  getImageForModel(modeloCombinado: string): string {
    const nombreModelo = this.getNombreModelo(modeloCombinado);
    const modelo = this.modelos.find(m => m.name === nombreModelo); 
    if (modelo) {
      const colorSeleccionado = this.getColor(modeloCombinado); 
      const colorIndex = modelo.colors.indexOf(colorSeleccionado); 
      console.log('Modelo:', nombreModelo, '| Color:', colorSeleccionado, '| Índice:', colorIndex);
      return modelo.image[colorIndex] || ''; 
    }
    console.log('Modelo no encontrado para imagen:', modeloCombinado);
    return '';
  }
  
  /**
   * 
   * @param modeloCombinado Método para obtener el color del modelo seleccionado.
   * @returns 
   * @memberof CatalogoSamsungComponent
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
   * @memberof CatalogoSamsungComponent
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
   * @memberof CatalogoSamsungComponent
   */
  private getNombreModelo(modeloCombinado: string): string {
    // Busca el modelo base en la lista de nombres de modelos
    const modelo = this.modelos.find(m => modeloCombinado.startsWith(m.name));
    return modelo ? modelo.name : ''; // Devuelve el nombre del modelo si se encuentra
  }
  

   /**
   * 
   * @param modeloCombinado Método para obtener el precio del modelo seleccionado.
   * @returns 
   * @memberof CatalogoSamsungComponent
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
   * @memberof CatalogoSamsungComponent
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
