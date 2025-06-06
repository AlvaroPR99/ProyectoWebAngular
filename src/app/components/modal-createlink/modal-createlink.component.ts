import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms'; 
import { UrlShortenService } from '../../services/ShortUrl/urlShorten.service'; // Asegúrate de importar el servicio

@Component({
  standalone: true,
  selector: 'app-modal-createlink',
  templateUrl: './modal-createlink.component.html',
  styleUrls: ['./modal-createlink.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class ModalCreatelinkComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() crearUrlEvent = new EventEmitter<{ originalUrl: string, tipo: string, shortUrl?: string }>();

  formulario: FormGroup;
  errorMessage: string = ''; // Variable para almacenar el mensaje de error
   successMessage: string = '';

  constructor(private urlService: UrlShortenService) {
    // Inicializar el formulario con validaciones
    this.formulario = new FormGroup({
  originalUrl: new FormControl('', [
    Validators.required,
    Validators.pattern(/^https?:\/\/([a-zA-Z0-9-._~%!$&'*+,;=]+@)?([a-zA-Z0-9-._~%]+\.[a-zA-Z]{2,})(?::[0-9]{1,5})?(?:\/[^\s]*)?$/i)
  ]),
  tipo: new FormControl('aleatorio'),
  shortUrl: new FormControl('', []),  // Solo se valida si el tipo es 'personalizado'
});


    // Actualizar la validación del shortUrl dependiendo del tipo
    this.formulario.get('tipo')?.valueChanges.subscribe(tipo => {
      const shortUrlControl = this.formulario.get('shortUrl');
      if (tipo === 'personalizado') {
        shortUrlControl?.setValidators([Validators.required]);
      } else {
        shortUrlControl?.clearValidators();
      }
      shortUrlControl?.updateValueAndValidity();
    });
  }

  cerrarModal(): void {
    this.closeModal.emit();
  }

  // Para emitir la creación de una URL
  crearUrl(): void {
    if (this.formulario.valid) {
      const { originalUrl, tipo, shortUrl } = this.formulario.value;
      this.errorMessage = ''; // Limpiar el mensaje de error antes de intentar crear la URL

      // Realizar la llamada al servicio dependiendo del tipo
      if (tipo === 'aleatorio') {
        this.urlService.acortarAleatorio(originalUrl).subscribe(
          (response) => {
            // Emitir la respuesta al componente padre
            this.crearUrlEvent.emit({
              originalUrl: originalUrl,  // Emitir la URL original
              tipo: tipo,                // Emitir el tipo de la URL
              shortUrl: response.shortUrl // Emitir la URL corta desde la respuesta
            });
            window.location.reload(); // Recargar la página para reflejar los cambios
             this.successMessage = '¡URL personalizada acortada con éxito!';
            this.cerrarModal(); // Cerrar el modal
          },
          (error) => {
            if (error.status === 400) {
              this.errorMessage = 'La URL ya está en uso o no es válida. Intenta con otra URL.'; // Mensaje de error
            } else {
              this.errorMessage = 'Ocurrió un problema al crear el enlace. Intenta nuevamente.'; // Mensaje para otros errores
            }
          }
        );
      } else if (tipo === 'personalizado') {
        this.urlService.acortarPersonalizado(originalUrl, shortUrl).subscribe(
          (response) => {
            // Emitir la respuesta al componente padre
            this.crearUrlEvent.emit({
              originalUrl: originalUrl,  // Emitir la URL original
              tipo: tipo,                // Emitir el tipo de la URL
              shortUrl: response.shortUrl // Emitir la URL corta desde la respuesta
            });
            window.location.reload(); // Recargar la página para reflejar los cambios
            this.successMessage = '¡URL personalizada acortada con éxito!';
            this.cerrarModal(); // Cerrar el modal
          },
          (error) => {
            if (error.status === 400) {
              this.errorMessage = 'La URL personalizada ya está en uso o no es válida. Intenta con otro alias.'; // Mensaje de error
            } else {
              this.errorMessage = 'Ocurrió un problema al crear el enlace. Intenta nuevamente.'; // Mensaje para otros errores
            }
          }
        );
      }
    }
  }

  togglePersonalizado(): void {
    // Limpiar el shortUrl si cambia a 'aleatorio'
    if (this.formulario.get('tipo')?.value === 'aleatorio') {
      this.formulario.get('shortUrl')?.setValue('');
    }
  }
}
