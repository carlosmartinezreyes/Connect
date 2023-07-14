import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { FooterComponent } from './permanentes/footer/footer.component';
import { HeaderComponent } from './permanentes/header/header.component';
import { IniciarSesionComponent } from './pages/iniciar-sesion/iniciar-sesion.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { NuevaPublicacionComponent } from './pages/nueva-publicacion/nueva-publicacion.component';
import { CargarScriptsService } from './services/cargar-scripts.service';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';








@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    FooterComponent,
    HeaderComponent,
    IniciarSesionComponent,
    RegistroComponent,
    NuevaPublicacionComponent,
    RegistroComponent,
    PerfilComponent,
    ConfiguracionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule

  ],
  //Aquí se llevan los servicios
  providers: [
    CargarScriptsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
