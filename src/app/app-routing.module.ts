import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component'; // Importar el componente Home
import { MenuComponent }  from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';

// Definir las rutas
export const routes: Routes = [
// Ruta para el catálogo de Apple
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'configuration', component: ConfigurationComponent},
  { path: 'menu', component: MenuComponent},
  { path: '', component: HomeComponent },  // Esto indica que la ruta raíz carga el componente Home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Configura las rutas
  exports: [RouterModule],  // Exporta el módulo RouterModule para que se pueda usar en el resto de la app
})
export class AppRoutingModule {}
