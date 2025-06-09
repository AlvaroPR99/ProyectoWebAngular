import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/User/UserData.service'; 
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/Auth/Auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [HeaderComponent, FormsModule, CommonModule],
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  userName: string = '';
  email: string = '';
  isLoggedIn: boolean = false;
  showDeleteModal: boolean = false;  // <- NUEVO

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.userService.getUserData().subscribe({
      next: (data) => {
        this.userName = data.name;
        this.email = data.email;
      },
      error: (error) => {
        console.error('Error al cargar los datos del usuario', error);
      }
    });
  }

  // Mostrar la modal
  deleteAccount(): void {
    this.showDeleteModal = true;
  }

  // Confirmar eliminación
  confirmDelete(): void {
    this.userService.deleteUser().subscribe({
      next: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.authService.logout();
        this.isLoggedIn = false;
        this.redirectToLogin();
      },
      error: (err) => {
        console.error('Error al eliminar la cuenta', err);
      }
    });
    this.showDeleteModal = false;
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
  }

  redirectToLogin(): void {
    window.location.href = '/login';
  }
}
