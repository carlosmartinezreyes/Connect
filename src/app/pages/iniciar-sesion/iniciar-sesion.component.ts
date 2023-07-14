import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/info-pagina.interface';
import { InfoPaginaService } from 'src/app/services/info-pagina.service';

//Para importar mi script
import { CargarScriptsService } from 'src/app/services/cargar-scripts.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit{

  UsuarioForm = new FormGroup({
    nombre_usuario: new FormControl(''),
    email: new FormControl(''),
    contrasenna: new FormControl('')
  });
  usuarios: Usuario[] = [];
  nombreUsuarioInput: string = '';
  contrasenaUsuarioInput: string = ''; 
 
  //id = '';
  constructor(private cargar_scripts: CargarScriptsService, public infopaginaservice:InfoPaginaService,
    private router: Router ){
  cargar_scripts.Carga(["login_registro"]);
  }

  ngOnInit(): void {
    this.getUsuarios();
    
    //alert("hh")
    if(localStorage.getItem("refresco")=="true"){
    this.router.navigate(['/dashboard']);
  }
  }

  

  getUsuarios(): void {
    this.infopaginaservice.getUsuarios().subscribe(response => {
    const { usuarios } = response; 
    this.usuarios = usuarios; 
    });
  }
 

  addUsuario(): void { 
    this.infopaginaservice.addUsuario(this.UsuarioForm.value).subscribe(() => {
      this.getUsuarios();
      this.UsuarioForm.reset();
    })
  }




  iniciarSesion() {
    const input = document.getElementById('usuario_escrito') as HTMLInputElement;
    const input2 = document.getElementById('contrasena_escrita') as HTMLInputElement;
    this.nombreUsuarioInput = input.value;
    this.contrasenaUsuarioInput = input2.value;


    const botonIniciarSesion: HTMLButtonElement | null = document.getElementById('boton_iniciar_sesion') as HTMLButtonElement;
    const spanSpinner: HTMLSpanElement | null = document.querySelector('#boton_iniciar_sesion span') as HTMLSpanElement;
    
    // Agrega la propiedad 'disabled' al botón
botonIniciarSesion.disabled = true;

// Muestra el elemento <span>
spanSpinner.style.display = 'inline-block';
  
    // Verificar si hay datos de usuarios disponibles
    if (!this.usuarios || this.usuarios.length === 0) {
      // Esperar y volver a llamar a la función hasta que los datos estén disponibles, así impedimos que el usuario se ponga nervioso al ver que sus credenciales son correctas
      //y aún así no le deja pasar
      setTimeout(() => {
        this.iniciarSesion();
      }, 500);
      return;
    }
  

    // Agrega la propiedad 'disabled' al botón
botonIniciarSesion.disabled = false;

// Muestra el elemento <span>
spanSpinner.style.display = 'none';


    for (let usuario of this.usuarios) {
      if (usuario.nombre_usuario === this.nombreUsuarioInput && usuario.contrasenna === this.contrasenaUsuarioInput) {
        // El inicio de sesión es correcto, hacer algo aquí
        const divCondicion = document.getElementById('condicion_inicio_sesion') as HTMLDivElement;

        localStorage.setItem("usuario", this.nombreUsuarioInput);

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
    line-height: 113%;" class="bg-dark justify-content-center align-items-center">Inicio de Sesión correcto</h3>
  
`;



  
  localStorage.setItem("refresco", "true");
  setTimeout(() => {
    location.reload()}, 2000);

  /*document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 500); // esperar cinco segundos antes de navegar a la nueva página
    }
  };*/




        return;
      }
    }
  
    // Si llegamos aquí, el inicio de sesión es incorrecto, hacer algo aquí
    const divCondicion = document.getElementById('condicion_inicio_sesion') as HTMLDivElement;
    localStorage.setItem("usuario", "");

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
        line-height: 113%;" class="bg-dark justify-content-center align-items-center">Inicio de Sesión incorrecto</h3>
      
    `;
    
  }


  /*iniciarSesion(): void {
    const usuarioEscrito = this.UsuarioForm.get('nombre_usuario').value;
    const contrasennaEscrita = this.UsuarioForm.get('contrasenna').value;
    this.usuarios.forEach(usuario => {
      if (usuario.nombre_usuario === usuarioEscrito && usuario.contrasenna === contrasennaEscrita) {
        alert('Inicio de sesión exitoso!');
      }
    });
  }*/




 /* deleteProduct(id: string): void {
    if(window.confirm("¿Estas seguro de querer eliminar?")){
       this.apiService.deleteProduct(id).subscribe(() => {   
         this.getProducts();
       },(error) => {
         console.error(error);
     })
    }        
  }

  getProduct(id: string): void {
    this.apiService.getProduct(id).subscribe(response => { 
       const { id, name, price, quantity } = response.data; 
       this.id = id;  
       this.productForm.setValue({name, price, quantity});
     },(error) => {
       console.error(error);
     })
  }

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

