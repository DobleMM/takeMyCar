document.addEventListener('DOMContentLoaded', () => {

  const directionsDisplay = new google.maps.DirectionsRenderer();
  const directionsService = new google.maps.DirectionsService();

  const params = (new URL(document.location)).searchParams;
  const latEnd = +params.get('lat')
  const lngEnd = +params.get('lng')

  latCar = car.latitude
  lngCar = car.longitude
 
  let map;

  var mapOptions = {
    zoom: 10, 
    center: {lat: latCar, lng: lngCar}
  }

  map = new google.maps.Map(document.getElementById("map"), mapOptions);

  directionsDisplay.setMap(map);

  function calculateRoute(latCar, lngCar, latEnd, lngEnd) {
    var request = {
      origin: {lat: latCar, lng: lngCar},
      destination: {lat: latEnd, lng: lngEnd},
      travelMode: "DRIVING"
    }
    directionsService.route(request, (result, status) => {

      if (status == "OK") {
        directionsDisplay.setDirections(result)
      }
    })
  }

  calculateRoute(latCar, lngCar, latEnd, lngEnd)

}, false);