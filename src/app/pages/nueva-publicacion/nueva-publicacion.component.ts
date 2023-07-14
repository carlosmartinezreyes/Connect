import { Component } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import { Publicaciones } from 'src/app/interfaces/info-pagina.interface'; 
import { InfoPaginaService } from 'src/app/services/info-pagina.service';

import { CargarScriptsService } from 'src/app/services/cargar-scripts.service';


@Component({
  selector: 'app-nueva-publicacion',
  templateUrl: './nueva-publicacion.component.html',
  styleUrls: ['./nueva-publicacion.component.css']
})
export class NuevaPublicacionComponent {


  nombre_usuario_localstorage = localStorage.getItem('usuario');
 
    PublicacionForm = new FormGroup({
    id_publicacion: new FormControl(''),
    multimedia: new FormControl(),
    fecha_de_publicacion: new FormControl(''),
    nombre_publicacion: new FormControl(''),
    descripcion: new FormControl(''),
    ubicacion: new FormControl(''),
    nombre_usuario: new FormControl('')

  });
 
  publicaciones: Publicaciones[] = [];
  id = '';
  constructor(private cargar_scripts: CargarScriptsService, public infopaginaservice:InfoPaginaService ) { 
    cargar_scripts.Carga(["nueva-publicacion"]);
  }

  ngOnInit(): void {
    this.getPublicaciones();
    //alert("");


    const fileInput = document.getElementById('uploadImage1') as HTMLInputElement;
fileInput.addEventListener('change', () => {
  previewImage(1);
});

    function previewImage(nb: number): void {
      const input = document.getElementById(`uploadImage${nb}`) as HTMLInputElement;
      const preview = document.getElementById(`uploadPreview${nb}`) as HTMLImageElement;
    
      if (input.files && input.files[0]) {
        const reader = new FileReader();
    
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target && e.target.result) {
            preview.src = e.target.result.toString();
          }
        };
    
        reader.readAsDataURL(input.files[0]);
      }
    }
    
  

  }

  getPublicaciones(): void {
    this.infopaginaservice.getPublicaciones().subscribe(response => {
    const { publicaciones } = response; 
    this.publicaciones = publicaciones; 
    });
  }
 

  addPublicacion(): void {
    const valores = this.PublicacionForm.value;
  
    // Agregar el valor del localstorage a PublicacionForm
    valores.nombre_usuario = this.nombre_usuario_localstorage;
  
    const fileInput = document.getElementById('uploadImage1') as HTMLInputElement;

    const botonEnvio = document.getElementById('boton_subir_foto') as HTMLButtonElement;


    botonEnvio.innerHTML = "Subiendo..."

    botonEnvio.disabled = true;
  
    // Check if a file is selected
    if (fileInput.files && fileInput.files[0]) {
      const imageFile = fileInput.files[0];
  
      // Create a new FileReader
      const reader = new FileReader();
  
      // Define the onload event handler
      reader.onload = (event) => {
        // Read the file content as a binary string
        const binaryString = reader.result as string;
  
        // Convert the binary string to base64
        const base64String = btoa(binaryString);
  
        // Set the base64 value to the 'multimedia' property
        valores.multimedia = base64String;
  
        this.savePublicacion(valores);
      };
  
      // Read the file as a binary string
      reader.readAsBinaryString(imageFile);
    } else {
      this.savePublicacion(valores);
    }
  }
  
  savePublicacion(valores: any): void {
    this.infopaginaservice.addPublicacion(valores).subscribe(
      () => {
        this.getPublicaciones();
        console.log(valores);

        const botonEnvio = document.getElementById('boton_subir_foto') as HTMLButtonElement;
        const divCondicion = document.getElementById('estado_envio_publicacion') as HTMLDivElement;

        botonEnvio.innerHTML = "Subir";

        botonEnvio.disabled = false;

        divCondicion.innerHTML = `<div class="d-flex bg-dark mx-auto justify-content-center align-items-center" style="width: 330px;
        padding: 15px; border-radius: 10px; margin-top: 20px; ">
        <svg style="color: greenyellow;
        xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-check-square-fill" viewBox="0 0 16 16">
          <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
        </svg>
        <h3 style="text-align: center;
        color: greenyellow;
        margin-left:10px;
        line-height: 113%;" class="">Publicación Subida</h3>
      </div>
    `;


    setTimeout(() => {
      divCondicion.innerHTML = '';
    }, 2500);
        this.PublicacionForm.reset();
      },
      error => {
        console.log('Ha ocurrido un error:', error);
        console.log(valores);
      }
    );
  }
  
}
