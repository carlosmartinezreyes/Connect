import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioComponent } from './pages/inicio/inicio.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { IniciarSesionComponent } from './pages/iniciar-sesion/iniciar-sesion.component';
import { NuevaPublicacionComponent } from './pages/nueva-publicacion/nueva-publicacion.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';

const routes: Routes = [
  {path: '', component: InicioComponent} ,


  //Resto de rutas
  {path: 'registro', component: RegistroComponent},
  {path: 'iniciar-sesión', component: IniciarSesionComponent},
  {path: 'nueva-publicación', component: NuevaPublicacionComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'configuración', component: ConfiguracionComponent},
   //Ruta de excepción
   {path: '**', pathMatch: 'full', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


