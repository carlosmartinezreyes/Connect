import { Component } from '@angular/core';
import { CargarScriptsService } from 'src/app/services/cargar-scripts.service';

import { FormGroup, FormControl } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/info-pagina.interface';
import { InfoPaginaService } from 'src/app/services/info-pagina.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  nombre_usuario_localstorage = localStorage.getItem('usuario');


  FotoUsuarioForm = new FormGroup({
    nombre_usuario: new FormControl(''),
    foto_perfil: new FormControl('')
  });
 

  EmailUsuarioForm = new FormGroup({
    nombre_usuario: new FormControl(''),
    email: new FormControl('')
  });

  ContrasennaUsuarioForm = new FormGroup({
    nombre_usuario: new FormControl(''),
    contrasenna: new FormControl('')
  });

  

  NombreUsuarioForm = new FormGroup({
    nombre_usuario: new FormControl(''),
    nombre_usuario_input: new FormControl('')
  });



  usuarios: Usuario[] = [];
  

  constructor(private cargar_scripts: CargarScriptsService, public infopaginaservice:InfoPaginaService){
    cargar_scripts.Carga(["perfil"]);

  

  }



ngOnInit(): void {
  

    const profilePic = document.getElementById('profilePic') as HTMLImageElement;
    const prueba = document.getElementById('prueba') as HTMLDivElement;

    for (let usuario of this.usuarios) {
     
      prueba.innerHTML += usuario.foto_perfil;
      if (usuario.nombre_usuario === this.nombre_usuario_localstorage) {
        profilePic.src = usuario.foto_perfil;
        break;
      }
    }
 
}

getUsuarios(): void {
  this.infopaginaservice.getUsuarios().subscribe(response => {
  const { usuarios } = response; 
  this.usuarios = usuarios; 
  });
}


updateEmail(): void {
  const valores = this.EmailUsuarioForm.value;

  const emailUsuarioInputValue = valores.email?.toString() ?? '';

   // Actualizar el valor de nombre_usuario en updatedUsuario
   valores.nombre_usuario = this.nombre_usuario_localstorage;

  this.infopaginaservice.updateEmail(valores).subscribe(
    () => {
      this.getUsuarios();
      //Actualizo el localstorage
      localStorage.setItem('email_usuario', emailUsuarioInputValue);
      this.EmailUsuarioForm.reset();

    },
    error => {
      console.log('Ha ocurrido un error:', error);
    }
  );
}

updateContrasenna(): void {
  const updatedUsuario = this.ContrasennaUsuarioForm.value;

  // Actualizar el valor de nombre_usuario en updatedUsuario
  updatedUsuario.nombre_usuario = this.nombre_usuario_localstorage;

  this.infopaginaservice.updateContrasenna(updatedUsuario).subscribe(
    () => {
      this.getUsuarios();
      this.ContrasennaUsuarioForm.reset();
    },
    error => {
      console.log('Ha ocurrido un error:', error);
    }
  );
}
updateNombreUsuario(): void{

  const valores = this.NombreUsuarioForm.value;
  
  const tituloNombreUsuario = document.getElementById("titulo_nombre_usuario") as HTMLElement | null;


  // Obtener el valor de nombre_usuario_input como cadena de texto (manejo de valores nulos o indefinidos)
  const nombreUsuarioInputValue = valores.nombre_usuario_input?.toString() ?? '';



   // Actualizar el valor de nombre_usuario en nombreUsuarioInput
   valores.nombre_usuario = this.nombre_usuario_localstorage;



  this.infopaginaservice.updateNombreUsuario(valores).subscribe(
    () => {
      
      this.getUsuarios();

      //Actualizo el localstorage
      localStorage.setItem('usuario', nombreUsuarioInputValue);

      if (tituloNombreUsuario !== null) {
        tituloNombreUsuario.innerHTML = nombreUsuarioInputValue;
      }
      
      this.NombreUsuarioForm.reset();

    },
    error => {
      console.log('Ha ocurrido un error al actualizar el nombre del usuario:', error);
    }
  );

}

updateFoto(): void {
  const updatedFoto = this.FotoUsuarioForm.value;
  
  // Esto solo vale para una función individual, si lo pongo en varias funciones no tira
  this.FotoUsuarioForm.patchValue({
    nombre_usuario: this.nombre_usuario_localstorage
  });

  this.infopaginaservice.updateFoto(updatedFoto).subscribe(
    () => {
      this.getUsuarios();
      
      this.FotoUsuarioForm.reset();

    },
    error => {
      console.log('Ha ocurrido un error:', error);
    }
  );
}


cambiarFotoPerfil() {

  const uploadIcon = document.getElementById('uploadIcon') as HTMLButtonElement;
  const profilePic = document.getElementById('profilePic') as HTMLImageElement;
  
  const newImageURL = prompt('Introduce la URL de la nueva imagen: ');
  if (newImageURL) {
    profilePic.src = newImageURL;

    this.FotoUsuarioForm.patchValue({
      foto_perfil: newImageURL
    });
   this.updateFoto();
  }
}



/*


*/

}
