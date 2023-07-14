import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//Para importar mi script
import { CargarScriptsService } from 'src/app/services/cargar-scripts.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/info-pagina.interface';
import { InfoPaginaService } from 'src/app/services/info-pagina.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

/*Aquí va todo lo relevante a la extracción de datos de los archivos php*/
export class RegistroComponent {
  
    UsuarioForm = new FormGroup({
    nombre_usuario: new FormControl(''),
    email: new FormControl(''),
    contrasenna: new FormControl('')
  });
 
  usuarios: Usuario[] = [];
  id = '';
  nombre_usuario_input: string = '';
  email_usuario_input: string = '';


  constructor(public infopaginaservice:InfoPaginaService, private router: Router ) { }

  ngOnInit(): void {
    
    if(localStorage.getItem("refresco")=="true"){
      this.router.navigate(['/dashboard']);
    }

    this.getUsuarios();
    //alert("");

    
  }

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

            localStorage.setItem("refresco", "true");
            this.UsuarioForm.reset();

            setTimeout(() => {
            location.reload()}, 2000);
            
        },
        error => {
            console.log('Ha ocurrido un error:', error);
        }
    );
}




validarRegistro() {
  const input = document.getElementById('usuario') as HTMLInputElement;
  const input2 = document.getElementById('email') as HTMLInputElement;

  const divCondicion = document.getElementById('condicion_registro') as HTMLDivElement;

  const botonCrearCuenta: HTMLButtonElement | null = document.getElementById('boton_registrarse') as HTMLButtonElement;
  const spanSpinner: HTMLSpanElement | null = document.querySelector('#boton_registrarse span') as HTMLSpanElement;

  


  this.nombre_usuario_input = input.value;
  this.email_usuario_input = input2.value;

  let validacion = false;

  // Agrega la propiedad 'disabled' al botón
  botonCrearCuenta.disabled = true;

  // Muestra el elemento <span>
  spanSpinner.style.display = 'inline-block';

   // Verificar si hay datos de usuarios disponibles
   if (!this.usuarios || this.usuarios.length === 0) {
    // Esperar y volver a llamar a la función hasta que los datos estén disponibles, así impedimos que el usuario se ponga nervioso al ver que sus credenciales son correctas
    //y aún así no le deja pasar
    setTimeout(() => {
      this.validarRegistro();
    }, 500);
    return;
  }



  for (let usuario of this.usuarios) {
    if (usuario.nombre_usuario != this.nombre_usuario_input) {
      validacion = true;
    }
  }
      

  // Quitarla propiedad 'disabled' al botón
  botonCrearCuenta.disabled = false;

  // Muestra el elemento <span>
  spanSpinner.style.display = 'none';


  if (validacion === false){


    divCondicion.innerHTML = `

    <svg style="color: red;
          margin-top: 20px;
          margin-bottom: 20px;" xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-x-square-fill" viewBox="0 0 16 16">
          <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
        </svg>
          
          <h3 style="text-align: center;
          color: red;
          border-radius: 10px;
          width: 300px;
          height: 70px;
          line-height: 113%;" class="bg-dark justify-content-center align-items-center">El nombre de usuario ya existe</h3>
        
      `;


  }else{
    
    localStorage.setItem("usuario", this.nombre_usuario_input);
  localStorage.setItem("email_usuario", this.email_usuario_input);

  divCondicion.innerHTML = `
  <svg style="color: greenyellow;
  margin-top: 20px;
  margin-bottom: 20px;" xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-check-square-fill" viewBox="0 0 16 16">
    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
  </svg>
  <h3 style="text-align: center;
  color: greenyellow;
  border-radius: 10px;
  width: 300px;
  height: 70px;
  padding: 16px;" class="bg-dark justify-content-center align-items-center">Registro completado</h3>

`;


this.addUsuario();
  }
      


     




/*document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 500); // esperar cinco segundos antes de navegar a la nueva página
  }
};*/




      
    

  // El nombre de usuario no está cogido

 
  
  


}





 /* deleteProduct(id: string): void {
    if(window.confirm("¿Estas seguro de querer eliminar?")){
       this.apiService.deleteProduct(id).subscribe(() => {   
         this.getProducts();
       },(error) => {
         console.error(error);
     })
    }        
  }
*/
/*getUsuario(id: string): void {
  this.infopaginaservice.getUsuario(id).subscribe(response => { 
     const { id, nombre_usuario, email, contrasenna} = response.data; 
     this.id = id;  
     this.UsuarioForm.setValue({nombre_usuario, email, contrasenna});
   },(error) => {
     console.error(error);
   })
}*/
/*
  updateProduct():void {
    const obj = this.productForm.value;
    obj.id = this.id;
    this.apiService.updateProduct(obj).subscribe(() => { 
      this.getProducts();
      this.productForm.reset('');
     },(error) => {
       console.error(error);
    })
  }*/
}
