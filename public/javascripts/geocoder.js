document.addEventListener('DOMContentLoaded', () => {

  const geocoder = new google.maps.Geocoder();

  getCoordinates = (( address, callback ) => {
    var coordinates;
    geocoder.geocode({ address: address }, function (results, status){
      lng = results[0].geometry.viewport.b.b;
      lat = results[0].geometry.viewport.f.b;
      coordinates = [lat, lng]
      callback(coordinates)
    })
  });

  getAddressText = (() => {
    return document.getElementById("end_address").value;
  });

  $('#basic-addon2').click(function() {
    getCoordinates(getAddressText(), function(coordinates) { window.location.href += `carlist/coords?lat=${coordinates[0]}&lng=${coordinates[1]}`}) ;
  });

  google.maps.event.addDomListener(window, 'load', function () {
    var end_address = new google.maps.places.Autocomplete(document.getElementById('end_address'));
  });


}, false);

