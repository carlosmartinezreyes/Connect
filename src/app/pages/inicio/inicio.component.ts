import { Component } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import { Publicaciones } from 'src/app/interfaces/info-pagina.interface'; 
import { InfoPaginaService } from 'src/app/services/info-pagina.service';






import { CargarScriptsService } from 'src/app/services/cargar-scripts.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  PublicacionForm = new FormGroup({
    id_publicacion: new FormControl(''),
    multimedia: new FormControl(''),
    fecha_de_publicacion: new FormControl(''),
    nombre_publicacion: new FormControl(''),
    descripcion: new FormControl(''),
    ubicacion: new FormControl('')

  });
 
  publicaciones: Publicaciones[] = [];
  id = '';
  constructor(private cargar_scripts: CargarScriptsService, public infopaginaservice:InfoPaginaService ) {
    cargar_scripts.Carga(["inicio"]);
   }

  ngOnInit(): void {
    localStorage.setItem("refresco", "false");
    this.getPublicaciones();
    
    //alert("");
  }

  getPublicaciones(): void {
    this.infopaginaservice.getPublicaciones().subscribe(response => {
      const { publicaciones } = response;
      this.publicaciones = publicaciones;
  
      // Remove skeleton elements
      const elements = document.querySelectorAll('.card.skeleton-card');
      elements.forEach(element => {
        element.remove();
      });

      console.log(this.publicaciones)
  
      // Decode the "multimedia" property in each publication and display as an image
      this.publicaciones.forEach(publicacion => {
        if (publicacion.multimedia) {
          const decodedMultimedia = atob(publicacion.multimedia);
          publicacion.multimedia = 'data:image/png;base64,' + decodedMultimedia;
        }
      });
    });
  }

  addPublicacion(): void { 
    this.infopaginaservice.addPublicacion(this.PublicacionForm.value).subscribe(
        () => {
            this.getPublicaciones();
            this.PublicacionForm.reset();
        },
        error => {
            console.log('Ha ocurrido un error:', error);
        }
    );
}
}
