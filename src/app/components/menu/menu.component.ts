import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { SubHeaderComponent } from '../sub-header/sub-header.component';
import { UrlService } from '../../services/ShortUrl/geturl.service';
import { ModalComponent } from '../modal/modal.component';
import { QrService } from '../../services/ShortUrl/qrcode.service';
import { UrlShortenService } from '../../services/ShortUrl/urlShorten.service';
import { ModalCreatelinkComponent } from '../modal-createlink/modal-createlink.component';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ModalComponent, ModalCreatelinkComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  urls: any[] = [];


  
  constructor(private urlService: UrlService, private qrcodeService: QrService, private urlShortenService: UrlShortenService ) {}

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



urlAEliminar: string | null = null;
mostrarConfirmacion: boolean = false;

pedirConfirmacionEliminacion(shortUrl: string) {
  this.urlAEliminar = shortUrl;
  this.mostrarConfirmacion = true;
}

confirmarEliminacion() {
  if (!this.urlAEliminar) return;

  this.urlShortenService.eliminarUrl(this.urlAEliminar).subscribe({
    next: () => {
      console.log('URL eliminada');
      // Actualiza el array `urls` tras la eliminación
      this.urls = this.urls.filter(url => this.getShortCode(url.shortUrl) !== this.urlAEliminar);
      this.urlAEliminar = null;
      this.mostrarConfirmacion = false;
    },
    error: (err) => {
      console.error('Error al eliminar la URL:', err);
      this.urlAEliminar = null;
      this.mostrarConfirmacion = false;
    }
  });
}

cerrarQrModal() {
  this.qrImageUrl = null;
}


cancelarEliminacion() {
  this.mostrarConfirmacion = false;
  this.urlAEliminar = null;
}

esUrlValida(url: string): boolean {
  // Expresión regular para validar si la URL empieza con http:// o https://
  return /^https?:\/\/.+/.test(url);
}


 crearUrl(event: { originalUrl: string, tipo: string, shortUrl?: string }) {
    this.urls.push(event); // Aquí puedes actualizar la lista o hacer más cosas
    console.log('URL creada:', event);
  }

mostrarModal = false;

abrirModal(): void {
  this.mostrarModal = true;
}


cerrarModal(): void {
  this.mostrarModal = false;
}


}

