const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Weekly Sales',
      data: [18, 12, 6, 9, 12, 3, 9],
      backgroundColor: [
        'rgba(255, 26, 104, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(0, 0, 0, 0.2)'
      ],
      borderColor: [
        'rgba(255, 26, 104, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(0, 0, 0, 1)'
      ],
      borderWidth: 1
    }]
  };


  const scaleChart = {
    id: 'scaleChart',
    beforeDatasetsDraw(chart, args, plugins) {
        const {ctx } = chart;

        ctx.save();

        if(!chart.priginalOuterRadius) {
            chart.originalOuterRaidus = chart.getdatasetMeta(0).data[0].outerRadius;
        }

        const scaleFactor = plugins.scaleFactor || 1;
        console.log(chart.originalOuterRadius * scaleFactor);
        chart.getDatasetMeta(0).data.forEach((dataPoint, index) => {
            dataPoint.outerRadius = chart.originalOuterRadius * scaleFactor;
        });
  },
}


  // config 
  const config = {
    type: 'pie',
    data,
    options: {
        plugins: {
            scaleChart: {
                scaleFactor: 0
            }
        },
    },
    plugins: {scaleChart}
  };

  // render init block
  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );

  // Instantly assign Chart.js version
  const chartVersion = document.getElementById('chartVersion');
  chartVersion.innerText = Chart.version;