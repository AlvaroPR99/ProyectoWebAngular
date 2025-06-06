import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() imageUrl: string | null = null;
  @Output() closeModal = new EventEmitter<void>();

  cerrar(): void {
    this.closeModal.emit();
  }

  descargarQR(): void {
    if (this.imageUrl) {
      const link = document.createElement('a');
      link.href = this.imageUrl;
      link.download = 'codigo-qr.png';
      link.click();
    }
  }
}
