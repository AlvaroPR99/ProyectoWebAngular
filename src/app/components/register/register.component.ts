import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterService } from '../../services/Auth/register.service';
import { RegisterRequest } from '../../services/Auth/RegisterRequest';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, FormsModule, HeaderComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] // <- corrección aquí (era "styleUrl")
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  showPassword: boolean = false;
  emailError: string | null = null;

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

  ngOnInit(): void {}

  // Validador personalizado para que las contraseñas coincidan
  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  // Getters para el formulario
  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }

  register() {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;

      this.registerService.register(formValue as RegisterRequest).subscribe({
        next: (response: any) => {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('user', response.body.name);
          localStorage.setItem('token', response.body.access_token);
          this.registerForm.reset();
          this.emailError = null;
          this.redirectToMenu();
        },
        error: (error: any) => {
          if (error.status === 409) {
            this.emailError = 'El correo ya está registrado';
          } else {
            this.emailError = 'Error inesperado. Inténtalo de nuevo.';
          }
          console.error('Error en el registro', error);
        }
      });

    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  redirectToMenu() {
    window.location.href = '/menu';
  }
}
