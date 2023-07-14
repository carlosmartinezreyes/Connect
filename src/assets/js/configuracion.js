
//js referente al botón deslizante
function toggleButtonRanking() {
    var button = document.getElementById("toggle-button");
    if (button.checked) {
      // El botón está encendido
      // Realizar acciones correspondientes al estado encendido
    } else {
      // El botón está apagado
      // Realizar acciones correspondientes al estado apagado
    }
  }
  
  //js referente al modal eliminar cuenta
  // Ventana modal
  var modal = document.getElementById("ventanaModal");
  
  // Botón que abre el modal
  var boton = document.getElementById("eliminar_cuenta");
  
  var cancelar = document.getElementById("cancelar");
  
  // Hace referencia al elemento <span> que tiene la X que cierra la ventana
  var span = document.getElementsByClassName("cerrar")[0];
  
  nombre_usuario_localstorage = localStorage.getItem('usuario');
  email_usuario_localstorage = localStorage.getItem('email_usuario');

  document.getElementById("cuenta_a_eliminar").innerHTML += nombre_usuario_localstorage;

  // Cuando el usuario hace click en el botón, se abre la ventana
  boton.addEventListener("click",function() {
    modal.style.display = "block";
  });
  
  // Si el usuario hace click en la x, la ventana se cierra
  span.addEventListener("click",function() {
    modal.style.display = "none";
  });
  
  // Si el usuario hace click en cancelar, la ventana se cierra
  cancelar.addEventListener("click",function() {
    modal.style.display = "none";
  });
  
  
  // Si el usuario hace click fuera de la ventana, se cierra.
  window.addEventListener("click",function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });

  //js referente a la info de configuración
document.getElementById("nombre_usuario").innerHTML += nombre_usuario_localstorage;  
document.getElementById("email_usuario").innerHTML += email_usuario_localstorage;