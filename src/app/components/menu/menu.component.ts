import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { SubHeaderComponent } from '../sub-header/sub-header.component';
import { UrlService } from '../../services/ShortUrl/geturl.service';
import { ModalComponent } from '../modal/modal.component';
import { QrService } from '../../services/ShortUrl/qrcode.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ModalComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  urls: any[] = [];

  
  constructor(private urlService: UrlService, private qrcodeService: QrService) {}

  ngOnInit(): void {
  this.urlService.getUrls().subscribe({
    next: (data) => {
      this.urls = data.map(url => ({
        ...url,
        copiado: false,
        showQR: false
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

qrImageUrl: string | null = null;

     // Método para abrir el modal y obtener el QR
  openQrModal(shortUrl: string): void {
    this.qrcodeService.generateQrCodeUrl(shortUrl).subscribe(
      (response: Blob) => {
        // Crear una URL de objeto para la imagen
        this.qrImageUrl = URL.createObjectURL(response);
        
      },
      (error) => {
        console.error('Error al generar el QR', error);
      }
    );
  }


closeModal(): void {
  this.qrImageUrl = null;
}



}
