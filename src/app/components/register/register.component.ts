import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterService } from '../../services/Auth/register.service';
import { RegisterRequest } from '../../services/Auth/RegisterRequest';
import { HeaderComponent } from '../header/header.component';
import { AbstractControl, ValidationErrors, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [RouterModule, CommonModule, ReactiveFormsModule, HeaderComponent, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  
  registerForm: FormGroup;

   showPassword: boolean = false;

   isLoggedIn: boolean = false;

  constructor(
  
    private registerService: RegisterService,
    private formBuilder: FormBuilder
  ) {

       this.registerForm = this.formBuilder.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatchValidator });

  }


  ngOnInit(): void {
    
    
  }

  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;

  // Comprueba si son iguales las contraseñas
  return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  get confirmPassword() {
  return this.registerForm.get('confirmPassword');
}



   get name() {
    return this.registerForm.get('name');
  }

    get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

register() {
  if (this.registerForm.valid) {
    const formValue = this.registerForm.value;

    this.registerService.register(formValue as RegisterRequest).subscribe({
      next: (response: any) => {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', formValue.name);
        this.registerForm.reset();
        this.redirectToMenu();
      },
      error: (error: any) => {
        console.error('Error en el registro', error);
        // Puedes mostrar un mensaje si el correo ya existe
      }
    });

  } else {
    this.registerForm.markAllAsTouched();
  }
}


  redirectToMenu() {
    // Redirige a la página de inicio después de un registro exitoso
    window.location.href = '/menu';
  }
}
