import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'; // Importa RouterModule y Routes
import { HttpClientModule } from '@angular/common/http'; // Si usas HttpClient
import { MenuComponent } from './components/menu/menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ModalCreatelinkComponent } from './components/modal-createlink/modal-createlink.component';
import { LoginComponent } from './components/login/login.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Define las rutas
const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta por defecto para HomeComponent
  { path: '**', redirectTo: '' } // Ruta por defecto para cualquier otra ruta no definida
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    ModalCreatelinkComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent] 
})
export class AppModule {}
