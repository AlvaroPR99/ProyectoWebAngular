import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news/news.service';
import { RouterModule } from '@angular/router';
import { MarcasService } from '../../services/marca/marcas.services';
import { CommonModule } from '@angular/common';
import { HostListener } from '@angular/core';

/**
 * @description Componente que representa el catálogo de productos Apple.
 * @export
 * @class NewsComponent
 * @implements {OnInit}
 */

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [RouterModule, CommonModule], 
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'] 
})
export class NewsComponent implements OnInit {
  
  /**Nombre de Home */
  home: string;

  /**Nombre de Apple */
  apple: string;

  /**Nombre de Samsung */
  samsung: string;

  /**Nombre de Reservar */
  reserva: string;

  /**Nombre de Apple */
  news: string;

  /**Modelos JSON de los móviles */
  noticias: any[] = [];

  /**
   * @description Constructor del componente.
   * @param {MarcasService} marcasService Servicio que gestiona los nombres de la cabecera.
   */

  constructor(
    private marcasService: MarcasService, // Servicio para las marcas
    private newsService: NewsService // Servicio para las noticias
  ) {

    this.home = this.marcasService.home;
    this.apple = this.marcasService.apple;
    this.samsung = this.marcasService.samsung;
    this.reserva = this.marcasService.reserva;
    this.news = this.marcasService.news;
  }

  lastScrollTop: number = 0;

  ngOnInit(): void {
    this.cargarNoticias(); // Cargar noticias al inicializar el componente
    this.hideHeaderOnScroll(); // Ocultar el header al hacer scroll
  }

  /**
   * @description Método que mcarga todas las noticias de la API.
   * @memberof NewsComponent
   */

  cargarNoticias(): void {
    this.newsService.getData().subscribe({
      next: (response) => {
        console.log('Noticias cargadas:', response);
        this.noticias = response.articles;  // Confirma que la estructura del JSON es correcta.
      },
      error: (error) => console.error('Error al cargar noticias:', error)
    });
  }
  /**
   * @description Método para detectar el scroll y ocultar/mostrar la cabecera.
   * @memberof NewsComponent
   */

    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
      this.hideHeaderOnScroll();
    }
    
     /**
   * @description Método que maneja el comportamiento de la cabecera.
   * @memberof NewsComponent
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
}
