
function changeColor(event) {
  const svgElement = event.currentTarget.querySelector('svg');
  svgElement.classList.toggle('active');
}

function toggleCardDetails(i) {
  var cardDetails = document.getElementById("card-details" + i);
  
  if (cardDetails.style.display === "" || cardDetails.style.display === "none") {
    cardDetails.style.display = "block";
  } else {
    cardDetails.style.display = "none";
  }
}

function buscarCiudad(i) {
  var ciudadElement = document.getElementById('ubicacion' + i);
  var ciudad = ciudadElement.textContent;
  var url = 'https://nominatim.openstreetmap.org/search?format=json&q=' + ciudad;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        var lat = data[0].lat;
        var lon = data[0].lon;

        var iframe = document.getElementById('map' + i);
        iframe.src = 'https://www.openstreetmap.org/export/embed.html?bbox=' + (parseFloat(lon) - 0.02) + '%2C' + (parseFloat(lat) - 0.01) + '%2C' + (parseFloat(lon) + 0.02) + '%2C' + (parseFloat(lat) + 0.01) + '&amp;layer=mapnik&amp;marker=' + lat + '%2C' + lon;
      } else {
        alert('Ciudad no encontrada.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Se produjo un error al buscar la ciudad.');
    });
}

document.addEventListener('click', function(event) {
  if (event.target && event.target.id.startsWith('ubicacion')) {
    var index = event.target.id.substring('ubicacion'.length);
    toggleCardDetails(index);
    buscarCiudad(index);
  }
});







  

// Función para activar el modo oscuro

/*
function activarModoOscuro() {
  document.getElementById("body_inicio").classList.add("dark-mode");
  localStorage.setItem("modo_oscuro", "true");
}

// Función para desactivar el modo oscuro
function desactivarModoOscuro() {
  document.getElementById("body_inicio").classList.remove("dark-mode");
  localStorage.setItem("modo_oscuro", "false");
}


document.addEventListener('DOMContentLoaded', function() {
  if (localStorage.getItem("modo_oscuro") === "true") {
    activarModoOscuro();
  } else {
    desactivarModoOscuro();
  }
});*/


