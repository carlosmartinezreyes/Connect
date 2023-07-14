
const profilePic = document.getElementById('profilePic');
const uploadIcon = document.getElementById('uploadIcon');

if (localStorage.getItem("usuario") == null || localStorage.getItem("usuario") == ""){
    document.getElementById("titulo_nombre_usuario").innerHTML = "INVITADO";

}else{
    document.getElementById("titulo_nombre_usuario").innerHTML = localStorage.getItem("usuario");
}

var tiempo_mostrar_nombre;
var tiempo_ocultar_nombre;


  
  
  function mg() {
    const mg = document.getElementById("me_gusta");
    if (mg.style.color === "red") {
      mg.style.color = "black";
    } else {
      mg.style.color = "red";
    }
  }


//JS 

function mostrarInputNombre() {
    clearTimeout(tiempo_ocultar_nombre);
    tiempo_mostrar_nombre = setTimeout(function() {
        document.getElementById("cambiar_nombre_input").style.display = "flex";
        document.getElementById("boton_cambiar_nombre").style.display = "flex";
    }, 800);
}

function ocultarInputNombre() {
    clearTimeout(tiempo_mostrar_nombre);
    tiempo_ocultar_nombre = setTimeout(function() {
        document.getElementById("cambiar_nombre_input").style.display = "none";
        document.getElementById("boton_cambiar_nombre").style.display = "none";
    }, 10);
}



var tiempo_mostrar_email;
var tiempo_ocultar_email;

function mostrarInputEmail() {
    clearTimeout(tiempo_ocultar_email);
    tiempo_mostrar_email = setTimeout(function() {
        document.getElementById("cambiar_email_input").style.display = "flex";
        document.getElementById("boton_cambiar_email").style.display = "flex";
    }, 800);
}

function ocultarInputEmail() {
    clearTimeout(tiempo_mostrar_email);
    tiempo_ocultar_email = setTimeout(function() {
        document.getElementById("cambiar_email_input").style.display = "none";
        document.getElementById("boton_cambiar_email").style.display = "none";
    }, 10);
}



var tiempo_mostrar_contrasena;
var tiempo_ocultar_contrasena;

function mostrarInputContrasena() {
    clearTimeout(tiempo_ocultar_contrasena);
    tiempo_mostrar_contrasena = setTimeout(function() {
        document.getElementById("cambiar_contrasena_input").style.display = "flex";
        document.getElementById("boton_cambiar_contrasenna").style.display = "flex";
    }, 800);
}

function ocultarInputContrasena() {
    clearTimeout(tiempo_mostrar_contrasena);
    tiempo_ocultar_contrasena = setTimeout(function() {
        document.getElementById("cambiar_contrasena_input").style.display = "none";
        document.getElementById("boton_cambiar_contrasenna").style.display = "none";
    }, 10);
}


