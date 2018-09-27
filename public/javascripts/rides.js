//const axios = require('axios');


document.addEventListener('DOMContentLoaded', () => {

document.getElementById('reserve').onclick = function(){
  let id = car._id;
  let km = document.getElementById("km").textContent;
  let cost = document.getElementById("cost").textContent;
  console.log(km, cost)

  let newRide = {
    km : km,
    cost : cost
  }
  let url = 'http://' + window.location.host + `/private/reserve/${id}`
  axios.post(url, 
    newRide
  ).then(() => console.log('car send'))
    
}
}, false)
