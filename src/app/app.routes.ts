import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AppleComponent } from './components/apple/apple.component';
import { CatalogoAppleComponent } from './components/catalogo-apple/catalogo-apple.component';
import { CatalogoSamsungComponent } from './components/catalogo-samsung/catalogo-samsung.component';
import { ReservaComponent } from './components/reserva/reserva.component';

// Definir las rutas
export const routes: Routes = [
  { path: '', component: HomeComponent },  // Esto indica que la ruta raíz carga el componente Home
  { path: 'catalogo-apple', component: CatalogoAppleComponent }, // Ruta para el catálogo de Apple
  { path: 'home', component: HomeComponent},
  { path: 'catalogo-samsung', component: CatalogoSamsungComponent},
  { path: 'reserva', component: ReservaComponent },
  { path: '**', redirectTo: '' }// Redirige cualquier ruta desconocida a la raíz
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Configura las rutas
  exports: [RouterModule],  // Exporta el módulo RouterModule para que se pueda usar en el resto de la app
})
export class AppRoutingModule {}
