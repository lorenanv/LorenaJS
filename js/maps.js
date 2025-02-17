let map;
let directionsService;
let directionsRenderer;
let marker;

// Coordenadas del marcador
const destination = {
    lat: 39.46727, lng: -0.37441
};

// Función para inicializar el mapa + configuración del mapa, marcador y servicio de direcciones
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: destination,
        zoom: 13,
    });

    marker = new google.maps.Marker({
        position: destination,
        map: map,
        title: "Destino",
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
}

// Función para calcular la ruta
function calculateRoute() {
    const address = document.getElementById("address").value;

    if (address) {
        const geocoder = new google.maps.Geocoder();

        // Convertir dirección ingresada en coordenadas
        geocoder.geocode({ address: address }, (results, status) => {
            if (status == "OK") {
                const origin = results[0].geometry.location;

                // Solicitud para calcular la ruta
                const request = {
                    origin: origin,
                    destination: destination,
                    travelMode: google.maps.TravelMode.DRIVING,
                };

                // Calcular y mostrar la ruta al usuario
                directionsService.route(request, (response, status) => {
                    if (status == "OK") {
                        directionsRenderer.setDirections(response);
                    } else {
                        alert("No se pudo calcular la ruta: " + status);
                    }
                });
            } else {
                alert("No se pudo geocodificar la dirección " + status);
            }
        });
    } else {
        alert("Por favor, ingrese una dirección.");
    }
}