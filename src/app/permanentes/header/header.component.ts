import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl} from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { Mensaje, Usuario } from 'src/app/interfaces/info-pagina.interface';
import { InfoPaginaService } from 'src/app/services/info-pagina.service';

//Para importar mi script
import { CargarScriptsService } from 'src/app/services/cargar-scripts.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  UsuarioForm = new FormGroup({
    nombre_usuario: new FormControl(''),
    email: new FormControl(''),
    contrasenna: new FormControl(''),
    id_usuario: new FormControl('')
  });

  trackById(index: number, item: any): number {
    return item.id_mensaje; // Reemplaza "id" con la propiedad que identifica de manera única a cada mensaje en tu lista.
  }

  nombre_usuario_localstorage = localStorage.getItem('usuario');
  

  MensajeForm = new FormGroup({
    fecha_envio: new FormControl(''),
    id_mensaje: new FormControl(''),
    mensaje: new FormControl(''),
    nombre_usuario_mensaje: new FormControl('')
  });
 
  usuarios: Usuario[] = [];
  mensajes: Mensaje[] = [];
  //id = '';
  constructor(private cargar_scripts: CargarScriptsService, public infopaginaservice:InfoPaginaService, private cdr: ChangeDetectorRef ){
    cargar_scripts.Carga(["header"]);
  }

  ngOnInit(): void {
// Obtener el valor del localStorage

    this.getUsuarios();
    this.getMensajes();
//alert("despertar a js");

  }

//Usuarios
  getUsuarios(): void {
    this.infopaginaservice.getUsuarios().subscribe(response => {
    const { usuarios } = response; 
    this.usuarios = usuarios; 
    });
  }
 

  addUsuario(): void { 
    
    this.infopaginaservice.addUsuario(this.UsuarioForm.value).subscribe(
        () => {
            this.getUsuarios();
            this.UsuarioForm.reset();
        },
        error => {
            console.log('Ha ocurrido un error:', error);
        }
    );
}

//Mensajes

  getMensajes(): void {
    const botonEnviarMensaje: HTMLButtonElement | null = document.getElementById('enviar_mensaje') as HTMLButtonElement;
    // Agrega la propiedad 'disabled' al botón
    botonEnviarMensaje.disabled = true;

    this.infopaginaservice.getMensajes().subscribe(response => {
    const { mensajes } = response; 
    this.mensajes = mensajes; 
    this.cdr.detectChanges(); // forzar detección de cambios

    //Cuando se procesan todos los datos se sobreentiende que ya no se necesita el skeleton
    const elements = document.querySelectorAll('.container-skeleton');
    elements.forEach(element => {
      element.remove();
    });
    // Quitar la propiedad 'disabled' al botón
    botonEnviarMensaje.disabled = false;
    botonEnviarMensaje.innerHTML = "Enviar";
    });
  }
 

  //obtengo el valor del formulario y lo paso como argumento

  addMensaje(): void { 

    const botonEnviarMensaje: HTMLButtonElement | null = document.getElementById('enviar_mensaje') as HTMLButtonElement;
    // Agrega la propiedad 'disabled' al botón
    botonEnviarMensaje.disabled = true;
    botonEnviarMensaje.innerHTML = "Enviando...";

    this.MensajeForm.patchValue({
      nombre_usuario_mensaje: this.nombre_usuario_localstorage
    });
    

    
    this.infopaginaservice.addMensaje(this.MensajeForm.value).subscribe(
        () => {
             
            this.getMensajes();
            this.MensajeForm.reset();
            this.cdr.detectChanges(); // Agrega esta línea
           
        },
        error => {
            console.log('Ha ocurrido un error:', error);
        }
    );
    
}


getStyle(nombreUsuario: string): any {
  const localStorageValue = localStorage.getItem('usuario');
  if (nombreUsuario === localStorageValue) {
    return {
      'float': 'right',
      'background-image': 'linear-gradient(to right, rgb(56, 20, 239), rgb(140, 14, 235))',
      'color': 'white'
    };
  } else {
    return {};
  }
}

}


