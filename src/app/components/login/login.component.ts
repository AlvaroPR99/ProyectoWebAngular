import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news/news.service';
import { RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
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
  imports: [RouterModule, CommonModule, ReactiveFormsModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent implements OnInit {
  

  loginForm: FormGroup;

  constructor(
    private marcasService: MarcasService, 
    private newsService: NewsService, 
    private formBuilder: FormBuilder
  ) {

       this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }


  ngOnInit(): void {
    
  }

    get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    if (this.loginForm.valid) {
      this.newsService.login(this.loginForm.value); // usa el servicio aquí
      this.loginForm.reset();
    } else {
      this.loginForm.markAllAsTouched();
    }
    
  }
}
