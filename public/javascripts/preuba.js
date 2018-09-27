document.addEventListener('DOMContentLoaded', () => {

  const params = (new URL(document.location)).searchParams;
  const latEnd = +params.get('lat')
  const lngEnd = +params.get('lng')

  let i = [];
  cars.forEach(car => {
    latCar = car.latitude
    lngCar = car.longitude
    id = car._id
    cost = car.cost
    i.push(car._id)
    calculateDistance(latCar, lngCar, latEnd, lngEnd, cost, id)
  })  

  function calculateDistance(latCar, lngCar, latEnd, lngEnd, cost, id) {
    var origin = {lat: latCar, lng: lngCar};
    var destination = {lat: latEnd, lng: lngEnd};
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
      }, callback);
      function callback(response, status) {
        console.log(id)
      if (status != google.maps.DistanceMatrixStatus.OK) {
          console.log(e)
      } else {
          var origin = response.originAddresses[0];
          var destination = response.destinationAddresses[0];
          if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
              console.log(error)
          } else {
              var distance = response.rows[0].elements[0].distance;
              var duration = response.rows[0].elements[0].duration;
              console.log(response.rows[0].elements[0].distance);
              var distance_in_kilo = distance.value / 1000; // the kilom
              $(`.km-${id}`).text((distance_in_kilo).toFixed(0));
              $(`.km-um-${id}`).text(cost);
              $(`.cost-${id}`).text((distance_in_kilo*cost).toFixed(0));
              var duration_text = duration.text;
              var duration_value = duration.value;
              return (distance_in_kilo, duration_text, duration_value)
          }
        }
      }
    }
    
  // // print results on submit the form
  // $('#distance_form').submit(function(e){
  //   e.preventDefault();
  // });

//   htmlLatlng = $('.latlng').text().split(' ')
//   latlng = []

//   htmlLatlng.forEach(e => {
//     latlng.push(e.split(","))
//   })

  
//   latlng.pop()
  
//   let distancias = [];
  
//   // let cal = calcDistance(+latlng[0][0],+latlng[0][1],latEnd,lngEnd)
//   let arr = []
// latlng.forEach(e => {
//     calcDistance(+e[0],+e[1],latEnd,lngEnd, arr)
// })

// console.log(arr)


  // calcDistance();
  // directionsDisplay

  // distancia = directionsDisplay.directions.routes[0].legs[0].distance
  

}, false);
