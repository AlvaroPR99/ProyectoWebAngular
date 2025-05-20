import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'; // Importa RouterModule y Routes
import { HttpClientModule } from '@angular/common/http'; // Si usas HttpClient


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CatalogoAppleComponent } from './components/catalogo-apple/catalogo-apple.component';
import { CatalogoSamsungComponent } from './components/catalogo-samsung/catalogo-samsung.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { LoginComponent } from './components/login/login.component';
import { CommonModule } from '@angular/common';

// Define las rutas
const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta por defecto para HomeComponent
  { path: '**', redirectTo: '' } // Ruta por defecto para cualquier otra ruta no definida
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CatalogoAppleComponent,
    CatalogoSamsungComponent,
    ReservaComponent, 
    LoginComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent] 
})
export class AppModule {}
