import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/Auth/login.service';
import { RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginRequest } from '../../services/Auth/LoginRequest';
import { HeaderComponent } from '../header/header.component';

/**
 * @description Componente que representa el catálogo de productos Apple.
 * @export
 * @class NewsComponent
 * @implements {OnInit}
 */

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, HeaderComponent], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent implements OnInit {
  

  loginForm: FormGroup;

  showPassword: boolean = false;

  constructor(
    private loginService: LoginService, 
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
      this.loginService.login(this.loginForm.value as LoginRequest);
      this.loginForm.reset();
      this.redirectToMenu();
    } else {
      this.loginForm.markAllAsTouched();
    }
    
  }

  redirectToMenu() {
    // Redirige a la página de inicio después de un registro exitoso
    window.location.href = '/menu';
  }
}
