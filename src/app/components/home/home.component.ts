import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [HeaderComponent, RouterModule],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

// Variables para el contenido de la página

  title = "Corta Todos Tus Enlaces"; 
  description = "Regístrate totalmente gratis. Guarda todos tus links acortados, ve estadísticas de uso y personaliza tus links.";
  bgithub = "Github";
  bshorten = "Cortar";
  blogin = "Iniciar Sesión";


  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
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
