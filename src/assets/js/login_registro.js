window.addEventListener("load", iniciar);

    function iniciar(){
        document.getElementById("boton_iniciar_sesion").addEventListener("click", iniciarSesion);
        document.getElementById("boton_registrarse").addEventListener("click", generarNuevasAlertas); 
  
        
    }



    function agregarNuevaAlerta(clase, mensaje){


      let alertasDiv = document.getElementById("alerta");
        
        let alerta = document.createElement("DIV");
        alerta.innerHTML = mensaje
        + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">'
        + '<span aria-hidden="true">&times;</span>'
        + '</button>';
        alerta.classList.add('alert');
        alerta.classList.add(clase);
        alerta.classList.add('alert-dismissible');
        alerta.classList.add('fade');
        alerta.classList.add('show');
        alerta.setAttribute("role", "alert");
      
        alertasDiv.appendChild(alerta);
        
      
      }
      
  
      
      function generarNuevasAlertas(){
      
      /*Minimo 8 caracteres
      Maximo 15
      Al menos una letra mayúscula
      Al menos una letra minucula
      Al menos un número
      Sin espacios en blanco
      Al menos 1 caracter especial*/
      
          var regex_c = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
          var contrasena = document.getElementById("contrasena").value;
        
          var regex_e = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
          var email = document.getElementById("email").value;
      
          var regex_nom = /[^@$!%*?&-]/;
          var usuario = document.getElementById("usuario").value;
      
              
          if (regex_c.test(contrasena)){
              
      
          }else{
              agregarNuevaAlerta('alert-warning', '<strong>Contraseña no válida</strong> La contraseña debe tener lo siguiente:<ul><li>MIN 8 letras, MAX 15 letras.</li><li>una letra mayúscula y Una letra minúscula.</li><li>Un número y un caracter especial.</li></ul>');
              
         
          }
      
          if (regex_e.test(email)){
              
          
            }else{
                
                agregarNuevaAlerta('alert-warning', '<strong>Email no válido</strong> El email debería tener una estructura así: nombre@dominio.extensión<li>ejemplo: carlos@gmail.com</li>'); 
            }
      
      
          if (regex_nom.test(usuario)){
              
          
      }else{
          
          agregarNuevaAlerta('alert-warning', '<strong>Nombre de usuario no válido</strong> El nombre de usuario no puede contener caracteres especiales, sólo _'); 
      }
      
      
      if(regex_nom.test(usuario) && regex_c.test(contrasena) && regex_e.test(email)){  
       addUsuario();
        
       // setTimeout("window.close()", 500);
        
      }
      
      
      
      }



    function iniciarSesion(){
      
      
       var usuario_escrito = document.getElementById("usuario").value;
       var contrasenna_escrita = document.getElementById("contrasena").value;
       

       const usuario = this.usuarios.find(u => u.nombre === this.inputValue);
       if (usuario) {
         alert('El usuario ' + usuario.nombre + ' existe');
       } else {
         alert('El usuario ' + this.inputValue + ' no existe');
       }
          
    }



   