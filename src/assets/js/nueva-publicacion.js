document.getElementById("nombre_usuario").innerHTML = localStorage.getItem('usuario');

/* YA HAY UNA VERSION MEJOR DE ESTO EN TS
function previewImage(nb) {  
      
    var reader = new FileReader();         
    reader.readAsDataURL(document.getElementById('uploadImage'+nb).files[0]);         
    reader.onload = function (e) {             
        document.getElementById('uploadPreview'+nb).src = e.target.result;         
    };     
}
      */