/*
// Initialize and add the map
let map;

async function initMap() {
  // The location of Uluru
  const position = { lat: -25.344, lng: 131.031 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Uluru",
  });
}

initMap();
*/

/*
// Función para inicializar el mapa
function initMap() {
    // Las coordenadas para centrar el mapa
    const ubicacion = { lat: 39.46727, lng: -0.37441 };

    // Crear un nuevo mapa y configurarlo
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15, // Nivel de zoom
      center: ubicacion, // Centro del mapa
    });

    // Crear un marcador en la ubicación especificada
    const marker = new google.maps.Marker({
      position: ubicacion,
      map: map,
      title: "¡Estás aquí!",
    });
  }

  // Cargar el script de Google Maps con la clave API
  function loadScript() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAR5JAkxXNI_yyi8Q9hwYfUUwkqjIQ63wQ&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }

  // Llamar a la función para cargar el script
  loadScript();


// Inicializar el servicio de direcciones y el renderizador de rutas
directionsService = new google.maps.DirectionsService();
directionsRenderer = new google.maps.DirectionsRenderer();

// Asociar el renderizador de rutas con el mapa
directionsRenderer.setMap(map);

// Inicializar el geocodificador
geocoder = new google.maps.Geocoder();

// Función para buscar la ruta desde la dirección escrita
function buscarRuta() {
const direccion = document.getElementById("direccion").value;

// Validar si el campo está vacío
if (!direccion) {
  alert("Por favor, ingresa una dirección.");
  return;
}

// Convertir la dirección escrita a coordenadas geográficas usando el Geocoder
geocoder.geocode({ address: direccion }, function(results, status) {
  if (status === google.maps.GeocoderStatus.OK) {
    // Obtener las coordenadas de la dirección ingresada
    const origen = results[0].geometry.location;

    // Coordenadas del destino (por ejemplo, Torre Latinoamericana, CDMX)
    const destino = { lat: 19.427, lng: -99.127 };

    // Solicitar direcciones
    const request = {
      origin: origen,
      destination: destino,
      travelMode: google.maps.TravelMode.DRIVING, // Modo de transporte (puede ser DRIVING, WALKING, BICYCLING o TRANSIT)
    };

    // Calcular y renderizar la ruta en el mapa
    directionsService.route(request, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(response);
      } else {
        alert("No se pudo calcular la ruta: " + status);
      }
    });
  } else {
    alert("No se pudo encontrar la dirección: " + status);
  }
});
}

*/

let map;
        let directionsService;
        let directionsRenderer;
        let marker;

        // Coordenadas del marcador
        const destination = { lat: 39.46727, lng: -0.37441 };

        // Función de inicialización del mapa
        function initMap() {
            // Configuración del mapa
            map = new google.maps.Map(document.getElementById("map"), {
                center: destination,
                zoom: 13,
            });

            // Configuración del marcador
            marker = new google.maps.Marker({
                position: destination,
                map: map,
                title: "Destino",
            });

            // Configuración del servicio de direcciones
            directionsService = new google.maps.DirectionsService();
            directionsRenderer = new google.maps.DirectionsRenderer();
            directionsRenderer.setMap(map);
        }

        // Función para calcular la ruta
        function calculateRoute() {
            const address = document.getElementById("address").value;

            if (address) {
                const geocoder = new google.maps.Geocoder();

                // Convertir la dirección ingresada en coordenadas
                geocoder.geocode({ address: address }, (results, status) => {
                    if (status === "OK") {
                        const origin = results[0].geometry.location;

                        // Crear la solicitud para calcular la ruta
                        const request = {
                            origin: origin,
                            destination: destination,
                            travelMode: google.maps.TravelMode.DRIVING,
                        };

                        // Calcular y mostrar la ruta
                        directionsService.route(request, (response, status) => {
                            if (status === "OK") {
                                directionsRenderer.setDirections(response);
                            } else {
                                alert("No se pudo calcular la ruta: " + status);
                            }
                        });
                    } else {
                        alert("No se pudo geocodificar la dirección: " + status);
                    }
                });
            } else {
                alert("Por favor ingresa una dirección.");
            }
        }