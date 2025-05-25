import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
   standalone: true,
  templateUrl: './home.component.html',
  imports: [HeaderComponent, RouterModule, CommonModule],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn: boolean = false;  
  userName: string | null = '';

  title = "Corta Todos Tus Enlaces"; 
  description = "Regístrate totalmente gratis. Guarda todos tus links acortados, ve estadísticas de uso y personaliza tus links.";
  bgithub = "Github";
  bshorten = "Cortar";
  blogin = "Iniciar Sesión";


  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

     const storedUser = localStorage.getItem('user');
    this.userName = storedUser;
    this.isLoggedIn = !!storedUser;  

    this.route.params.subscribe(params => {
      if (params['title']) {
        this.title = params['title'];
      }
      if (params['description']) {
        this.description = params['description'];
      }
      if (params['github']) {
        this.bgithub = params['github'];
      }
      if (params['shorten']) {
        this.bshorten = params['shorten'];
      }
    });
  }

}
