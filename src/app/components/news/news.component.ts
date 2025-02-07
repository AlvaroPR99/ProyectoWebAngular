import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news/news.service';
import { RouterModule } from '@angular/router';
import { MarcasService } from '../../services/marca/marcas.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [RouterModule, CommonModule], // Si el componente es standalone, debes importar RouterModule aquí.
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'] // Cambiado de styleUrl a styleUrls
})
export class NewsComponent implements OnInit {
  // Variables provenientes del servicio MarcasService
  home: string;
  apple: string;
  samsung: string;
  reserva: string;
  news: string;

  // Almacena las noticias
  noticias: any[] = [];

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

  ngOnInit(): void {
    this.cargarNoticias(); // Cargar noticias al inicializar el componente
  }

  cargarNoticias(): void {
    this.newsService.getData().subscribe({
      next: (response) => {
        console.log('Noticias cargadas:', response);
        this.noticias = response.articles;  // Confirma que la estructura del JSON es correcta.
      },
      error: (error) => console.error('Error al cargar noticias:', error)
    });
  }
}
