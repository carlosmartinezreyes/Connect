window.addEventListener("load", iniciar);

function iniciar(){
  h = 0;
  m = 0;
  s = -1;

  confirm("Esta página web utiliza cookies de propias para mejorar la navegación del usuario, así como cookies de Google. Si sigue navegando se entiende que las acepta")
  
alert("Para buscar un elemento en el buscador debes copiar y pegar el título de la foto EXACTAMENTE IGUAL, si no no encontrará resultados")
 
    var contador = 0;
    localStorage.setItem("contador", contador);
    document.getElementById("voz_reconocimiento").addEventListener("click", reconocimientoVoz);
    
   //document.getElementById("identificarse").addEventListener("click", iniciarS_Registrarse);
   //document.getElementById("cajon_cerrar_sesion").addEventListener("click", resetearLogin);
}




function reconocimientoVoz(){
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var recognition = new SpeechRecognition();


var speechRecognitionList = new SpeechGrammarList();
// speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;


recognition.continuous = true;
recognition.lang = 'es-ES';
recognition.interimResults = true;
recognition.maxAlternatives = 1;


//Evento para iniciar reconocimiento de voz  
recognition.start();




recognition.onspeechend = function() {
recognition.stop();
}

recognition.onresult = function(event) {
var mensaje = event.results[0][0].transcript;
var confianza = event.results[0][0].confidence;
document.getElementById("busqueda").value = mensaje;

}
}

