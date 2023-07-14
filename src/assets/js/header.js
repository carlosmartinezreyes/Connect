    const contenedorFotoPerfil = document.getElementById('contenedor_foto_perfil');
    const listaItems = contenedorFotoPerfil.getElementsByTagName('li');

        // Obtener todos los elementos "a" dentro del elemento con id "contenedor_foto_perfil"
const enlaces = document.querySelectorAll("#contenedor_foto_perfil a");


    document.getElementById("enviar_mensaje").addEventListener("click", obtenerFecha);
    document.getElementById("identificarse").addEventListener("click", cerrarSesion);

    if(localStorage.getItem("usuario") == null || localStorage.getItem("usuario") == ""){
        
    /*var elemento = document.getElementById("identificarse");
    elemento.style.backgroundImage = "linear-gradient(to right, rgb(56, 20, 239), rgb(140, 14, 235))";
    document.getElementById("identificarse").innerHTML = "Identifícate";*/

    //Desactivar todos los elementos del desplegable de la foto de perfil hasta que se haya iniciado sesión, salvo el botón
    for (let i = 0; i < listaItems.length - 1; i++) {
      listaItems[i].classList.add('disabled');
      enlaces[i].style.color = "gray";
  
    }




    }else{
    document.getElementById("identificarse").style.background = "red";
    document.getElementById("identificarse").innerHTML = "Cerrar sesión";

    for (let i = 0; i < listaItems.length - 1; i++) {
      listaItems[i].classList.remove('disabled');
      enlaces[i].style.color = "aliceblue";
      
    }

    
}

function obtenerFecha(){

    // crea un nuevo objeto `Date`
var today = new Date();
 
// obtener la fecha y la hora
var now = today.toLocaleString();
console.log(now);
    document.getElementsByClassName("time").innerHTML = now;
    
}


function cerrarSesion(){
    if(document.getElementById("identificarse").innerHTML == "Cerrar sesión"){
        localStorage.setItem("usuario", "");
        var elemento = document.getElementById("identificarse");
        elemento.style.backgroundImage = "linear-gradient(to right, rgb(56, 20, 239), rgb(140, 14, 235))";
        document.getElementById("identificarse").innerHTML = "Identifícate";

        
    //Desactivar todos los elementos del desplegable de la foto de perfil hasta que se haya iniciado sesión, salvo el botón
    for (let i = 0; i < listaItems.length - 1; i++) {
      listaItems[i].classList.add('disabled');
      enlaces[i].style.color = "gray";
  
    }
    
    }else if (document.getElementById("identificarse").innerHTML == "Identifícate"){
        
        //SI HEMOS LLEGADO HASTA AQUÍ, ES QUE LA SESIÓN HA SIDO CERRADA

    

    }


    
}


/*

// Verificar si el modo oscuro está activado en localStorage
var modoOscuroActivado = localStorage.getItem("modo_oscuro") === "true";

// Aplicar el modo oscuro si está activado
if (modoOscuroActivado) {
  activarModoOscuro();
}

// Función para activar el modo oscuro
function activarModoOscuro() {
  document.body.classList.add("dark-mode");
  localStorage.setItem("modo_oscuro", "true");
}

// Función para desactivar el modo oscuro
function desactivarModoOscuro() {
  document.body.classList.remove("dark-mode");
  localStorage.setItem("modo_oscuro", "false");
}

// Cambiar entre activar y desactivar el modo oscuro al hacer clic en el botón
document.getElementById("modo_oscuro").addEventListener("click", function () {
  if (document.body.classList.contains("dark-mode")) {
    desactivarModoOscuro();
  } else {
    activarModoOscuro();
  }
});
*/