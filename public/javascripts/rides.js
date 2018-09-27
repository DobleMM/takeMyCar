//const axios = require('axios');


document.addEventListener('DOMContentLoaded', () => {

document.getElementById('reserve').onclick = function(){
  let id = car._id;
  let km = document.getElementById("km").textContent;
  let cost = document.getElementById("cost").textContent;
  
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
