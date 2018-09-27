
document.addEventListener('DOMContentLoaded', () => {

  const params = (new URL(document.location)).searchParams;
  const latEnd = +params.get('lat')
  const lngEnd = +params.get('lng')

  links = document.getElementsByClassName('reserve')
  endRef = "/coords?lat="+latEnd+"&lng="+lngEnd
  console.log(endRef)

  
  for (let i = 0; i < links.length; i++) {
    let href = links.item(i).href
    (`a[href='/${href}'`).attr('href', `/${href}/${endRef}`)
  }

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