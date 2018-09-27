//const axios = require('axios');


document.addEventListener('DOMContentLoaded', () => {

document.getElementById('reserve').onclick = function(){
  let id = car._id;
  let km = parseInt(document.getElementById("km").textContent);
  let cost = parseInt(document.getElementById("cost").textContent);
  
  let newRide = {
    km : km,
    cost : cost
  }
  let url = 'http://' + window.location.host + `/private/reserve/${id}`
  axios.post(url, 
    newRide
  ).then(() => window.location.href = 'http://' + window.location.host + `/private/profile` )
    
}
}, false)
