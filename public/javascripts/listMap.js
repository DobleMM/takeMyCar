
document.addEventListener('DOMContentLoaded', () => {



  let map = []

  cars.forEach((car, i) => {

    map[i] = new google.maps.Map(document.getElementById('map-' + (i + 1)), {
      zoom: 13,
      center: {lat: car.latitude, lng: car.longitude}
    });

    new google.maps.Marker({
      position: {
        lat: car.latitude,
        lng: car.longitude
      },
      map: map[i],
      title: car.model
    });
  
  });



}, false);