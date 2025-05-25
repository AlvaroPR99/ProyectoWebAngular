import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {}

  logout() {
    // Elimina token o datos del usuario
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // si guardaste algo más
    localStorage.setItem('isLoggedIn', 'false'); 

    // Redirige al login
    this.router.navigate(['/login']);
  }

 
}
