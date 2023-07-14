import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InfoPaginaService } from 'src/app/services/info-pagina.service';
import { Usuario } from 'src/app/interfaces/info-pagina.interface';

import { FormGroup, FormControl} from '@angular/forms';

//Para importar mi script
import { CargarScriptsService } from 'src/app/services/cargar-scripts.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent {

  nombre_usuario_localstorage = localStorage.getItem('usuario');

  UsuarioForm = new FormGroup({
    nombre_usuario: new FormControl('')
  });


  usuarios: Usuario[] = [];

  

  constructor(private cargar_scripts: CargarScriptsService, public infopaginaservice:InfoPaginaService,
    private router: Router ){
  cargar_scripts.Carga(["configuracion"]);
  }



  deleteUsuario(): void {

    this.UsuarioForm.patchValue({
      nombre_usuario: this.nombre_usuario_localstorage
    });

    this.infopaginaservice.deleteUsuario(this.UsuarioForm.value).subscribe(
      () => {
        console.log(this.UsuarioForm.value)
          this.UsuarioForm.reset();
      },
      error => {
          console.log('Ha ocurrido un error:', error);
      }
  );

}

}
