import { Component, HostListener, ElementRef, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { AuthService } from '../../services/Auth/Auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName: string | null = '';
  isLoggedIn: boolean = false;  

  // Variables para el contenido de la página
  logo = "Shears";
  github = "Home";
  login = "Regístrate";
  colorBack = "Tablero";
  modeDark = "Modo Oscuro";

  home = "Home";
  dashboard = "Tablero";
  settings = "Configuración";
  logOut = "Cerrar Sesión";
  report = "Reportar bug"
  contact = "Contacto";

  isMenuVisible = false;

  constructor(private route: ActivatedRoute, private elRef: ElementRef, private authService: AuthService) { }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    this.userName = storedUser;
    this.isLoggedIn = !!storedUser; 

    this.route.params.subscribe(params => {
      if (params['logo']) {
        this.logo = params['logo'];
      }
      if (params['github']) {
        this.github = params['github'];
      }
      if (params['login']) {
        this.login = params['login'];
      }
      if (params['modeDark']) {
        this.modeDark = params['modeDark'];
      }
      if (params['colorBack']) {
        this.colorBack = params['colorBack'];
      }
    });
  }

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.isMenuVisible = false;
    }
  }

  logout() {
    console.log('Usuario ha cerrado sesión');
    this.authService.logout();
    localStorage.removeItem('user'); 
    this.isLoggedIn = false;  
  }
}
