import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { SubHeaderComponent } from '../sub-header/sub-header.component';
import { UrlService } from '../../services/ShortUrl/geturl.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  urls: any[] = [];

  
  constructor(private urlService: UrlService) {}

  ngOnInit(): void {
  this.urlService.getUrls().subscribe({
    next: (data) => {
      this.urls = data.map(url => ({
        ...url,
        copiado: false
      }));
    },
    error: (err) => {
      console.error('Error cargando URLs', err);
    }
  });
}


  getShortCode(url: string): string {
    return url.split('/').pop() ?? '';
  }

  getShortUrlLink(url: string): string {
    return url;
  }

  goToOriginalUrl(url: string): void {
  window.open(url, '_blank'); 
}

copy = false;

copiarUrl(shortUrl: string, url: any) {
  const codigo = this.getShortUrlLink(shortUrl);
  navigator.clipboard.writeText(codigo).then(() => {
    // Oculta los demás mensajes
    this.urls.forEach(u => u.copiado = false);
    // Muestra solo en el actual
    url.copiado = true;
    
    setTimeout(() => {
      url.copiado = false;
    }, 2000);
  });
}



}
