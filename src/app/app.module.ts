import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'; // Importa RouterModule y Routes
import { HttpClientModule } from '@angular/common/http'; // Si usas HttpClient

// Importa tus componentes
import { AppComponent } from './app.component';
import { AppleComponent } from './components/apple/apple.component';
import { SamsungComponent } from './components/samsung/samsung.component';
import { HomeComponent } from './components/home/home.component';
import { CatalogoAppleComponent } from './components/catalogo-apple/catalogo-apple.component';
import { CatalogoSamsungComponent } from './components/catalogo-samsung/catalogo-samsung.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { CommonModule } from '@angular/common';

// Define las rutas
const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta por defecto para HomeComponent
  { path: '**', redirectTo: '' } // Ruta por defecto para cualquier otra ruta no definida
];

@NgModule({
  declarations: [
    AppComponent,
    AppleComponent,
    SamsungComponent,
    HomeComponent,
    CatalogoAppleComponent,
    CatalogoSamsungComponent,
    ReservaComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes), // Configura las rutas
    HttpClientModule // Si usas HttpClient
  ],
  providers: [],
  bootstrap: [AppComponent] // Componente raíz
})
export class AppModule {}
