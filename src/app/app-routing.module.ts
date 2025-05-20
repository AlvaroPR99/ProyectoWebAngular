import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CatalogoAppleComponent } from './components/catalogo-apple/catalogo-apple.component';
import { CatalogoSamsungComponent } from './components/catalogo-samsung/catalogo-samsung.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { LoginComponent } from './components/login/login.component';

// Definir las rutas
export const routes: Routes = [
  { path: 'catalogo-apple', component: CatalogoAppleComponent }, // Ruta para el catálogo de Apple
  { path: 'home', component: HomeComponent},
  { path: 'catalogo-samsung', component: CatalogoSamsungComponent},
  { path: 'reserva', component: ReservaComponent },
  { path: 'login', component: LoginComponent},
  { path: '', component: HomeComponent },  // Esto indica que la ruta raíz carga el componente Home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Configura las rutas
  exports: [RouterModule],  // Exporta el módulo RouterModule para que se pueda usar en el resto de la app
})
export class AppRoutingModule {}
