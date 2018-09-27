
  let stockLabels = window.rides.map( element => element.createdAt);
  let stockPrice = window.rides.map( element => element.cost);
  let ctx = document.getElementById('rider').getContext('2d');
  let chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: stockLabels,
      datasets: [{
        label: "Stock Chart",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: stockPrice,
      }]
    }
  });
