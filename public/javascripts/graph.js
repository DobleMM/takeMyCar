
  let ridesLabels= window.rides.map( element => element.createdAt);
  let ridesPrice = window.rides.map( element => element.cost);
  let ctx = document.getElementById('rider').getContext('2d');
  let chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ridesLabels,
      datasets: [{
        label: "Rides Chart",
        backgroundColor: 'rgb(88, 214, 141)',
        borderColor: 'rgb(88, 214, 141 )',
        data: ridesPrice,
      }]
    }
  });


  let drivesLabels = window.drives.map( element => element.createdAt);
  let drivesPrice = window.drives.map( element => element.cost);
  let ctxTwo = document.getElementById('driver').getContext('2d');
  let chartTwo = new Chart (ctxTwo, {
    type: 'line',
    data: {
      labels: drivesLabels,
      datasets: [{
        label: "Drives Chart",
        backgroundColor: 'rgb(93, 173, 226)',
        borderColor: 'rgb(93, 173, 226)',
        data: drivesPrice,
      }]
    }
  });
