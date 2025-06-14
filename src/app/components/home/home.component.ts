import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UrlShortenService } from '../../services/ShortUrl/urlShorten.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
   standalone: true,
  templateUrl: './home.component.html',
  imports: [HeaderComponent, RouterModule, CommonModule, FormsModule],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  originalUrl: string = '';
  isLoggedIn: boolean = false;  
  userName: string | null = '';

  title = "Corta Todos Tus Enlaces"; 
  description = "Regístrate totalmente gratis. Guarda todos tus links acortados, ve estadísticas de uso y personalizalos.";
  bgithub = "Github";
  bshorten = "Cortar";
  blogin = "Iniciar Sesión";


  constructor(private route: ActivatedRoute, private shortenService: UrlShortenService) { }

  ngOnInit(): void {

     const storedUser = localStorage.getItem('user');
    this.userName = storedUser;
    this.isLoggedIn = !!storedUser;  

    this.route.params.subscribe(params => {
      if (params['title']) {
        this.title = params['title'];
      }
      if (params['description']) {
        this.description = params['description'];
      }
      if (params['github']) {
        this.bgithub = params['github'];
      }
      if (params['shorten']) {
        this.bshorten = params['shorten'];
      }
    });
  }

crearUrl() {
  const url = this.originalUrl.trim();

  const forbiddenSchemes = /^(javascript|data):/i;
  if (forbiddenSchemes.test(url)) {
    alert('Esta URL no está permitida.');
    return;
  }

  try {
    new URL(url); // Validación general
  } catch {
    alert('La URL introducida no es válida.');
    return;
  }

  this.shortenService.acortarAleatorio(url).subscribe({
    next: (res) => {
      this.shortenedUrl = res.shortUrl;
    },
    error: (err) => console.error(err)
  });
}



    getShortUrlLink(url: string): string {
    return url;
  }
  
shortenedUrl: string | null = null;
copySuccess = false;
showCopyButton = true;


copiarUrl(shortUrl: string) {
  navigator.clipboard.writeText(shortUrl).then(() => {
    this.copySuccess = true;
    this.showCopyButton = false;

    // Solo ocultamos el botón y el mensaje después de 2s
    setTimeout(() => {
      this.copySuccess = false;
      this.showCopyButton = true;
    }, 2000);
  });
}



}
