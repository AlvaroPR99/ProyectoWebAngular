import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';
import { SubHeaderComponent } from '../sub-header/sub-header.component';

@Component({
  selector: 'app-menu',
  imports: [HeaderComponent, RouterModule, SubHeaderComponent],
  templateUrl: './menu.component.html',
  standalone: true,
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  
}
