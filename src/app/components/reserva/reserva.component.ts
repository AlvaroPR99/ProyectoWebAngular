import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MarcasService } from '../../services/marca/marcas.services';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

/**
 * @description Componente que representa el catálogo de productos Apple.
 * @export
 * @class ReservaComponent
 * @implements {OnInit}
 */

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent {

  /**Nombre de Home */
  home: string;

  /**Nombre de Apple */
  apple: string;

  /**Nombre de Samsung */
  samsung: string;

  /**Nombre de Reservar */
  reserva: string;

  /**Nombre de Noticias */
  news: string;

  /**Formulario de reserva */
  formulario: FormGroup;

  modelos = ['iPhone 16', 'iPhone 16 Pro', 'iPhone 16 Pro Max', 'Samsung S25 Ultra'];
  capacidadesDisponibles: string[] = [];
  capacidadesCon128 = ['128GB', '256GB', '512GB', '1TB'];
  capacidadesSin128 = ['256GB', '512GB', '1TB'];

  /**
   * @description Constructor del componente.
   * @param {MarcasService} marcasService Servicio que gestiona los nombres de la cabecera.
   */

  constructor(
    private marcasService: MarcasService,
    private fb: FormBuilder
  ) {
    this.home = this.marcasService.home;
    this.apple = this.marcasService.apple;
    this.samsung = this.marcasService.samsung;
    this.reserva = this.marcasService.reserva;
    this.news = this.marcasService.news;

    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      number: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      movil: ['', Validators.required],
      capacidad: [{ value: '', disabled: true }, Validators.required], // Capacidad deshabilitada inicialmente
      comentarios: ['']
    });

    
    this.formulario.get('movil')?.valueChanges.subscribe(() => {
      this.actualizarCapacidades();
    });
  }

    /**
   * @description Método que actualiza las capacidades según modelo.
   * @memberof ReservaComponent
   */
  actualizarCapacidades() {
    const modeloSeleccionado = this.formulario.get('movil')?.value;

    if (modeloSeleccionado === 'iPhone 16' || modeloSeleccionado === 'iPhone 16 Pro') {
      this.capacidadesDisponibles = this.capacidadesCon128;
    } else if (modeloSeleccionado === 'iPhone 16 Pro Max' || modeloSeleccionado === 'Samsung S25 Ultra') {
      this.capacidadesDisponibles = this.capacidadesSin128;
    } else {
      this.capacidadesDisponibles = []; // Si no hay modelo seleccionado, no mostrar capacidades
    }

    // Habilitar el campo de capacidad si hay capacidades disponibles
    if (this.capacidadesDisponibles.length > 0) {
      this.formulario.get('capacidad')?.enable();
    } else {
      this.formulario.get('capacidad')?.disable();
    }

    this.formulario.get('capacidad')?.setValue('');
  }

   /**
   * @description Método que envía el formulario.
   * @memberof ReservaComponent
   */
  enviarFormulario() {
    if (this.formulario.valid) {
      console.log('Formulario enviado:', this.formulario.value);
      alert('Reserva realizada con éxito');
    } else {
      alert('Por favor, complete todos los campos obligatorios.');
    }
  }
}