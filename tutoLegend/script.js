    const start = {
      labels: ['coffee', 'Tea'],
      datasets: [{
        label: 'Weekly Sales',
        data: [18, 12],
        backgroundColor: [
          'rgba(255, 26, 104, 1)',
          'rgba(54, 162, 235, 1)',

        ],
        borderColor: [
          'rgba(255, 26, 104, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1
      }]
    };

    const coffee = {
      labels: ['Brazil', 'Vietnam'],
      datasets: [{
        label: 'Coffee Sales',
        data: [16, 14],
        backgroundColor: [
          'rgba(255, 26, 104, 1)',
          'rgba(255, 26, 104, 1)',

        ],
        borderColor: [
          'rgba(255, 26, 104, 1)',
          'rgba(255, 26, 104, 1)',
        ],
        borderWidth: 1
      }]
    };

    const tea = {
      labels: ['China', 'Sri Lanka'],
      datasets: [{
        label: 'Tea Sales',
        data: [18, 10],
        backgroundColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(54, 162, 235, 1)',

        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1
      }]
    };


    const data = start;

    const pages = [
        { page: 1, data: start },
        { page: 2, data: coffee },
        { page: 3, data: tea }
    ];
    let currentPageIndex = 0;

    let colorLeft = 'black';
    let colorRight = 'black';

    const resetButton = {
        id: 'resetButton',
        afterDatasetsDraw(chart, args, options) {
            const {ctx, chartArea: {top, right}} = chart;

            ctx.save();

            ctx.beginPath();
            ctx.fillStyle = colorLeft;
            ctx.moveTo(right -50, top - 15);
            ctx.lineTo(right - 40, top - 5);
            ctx.lineTo(right - 40, top - 25);
            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            ctx.fillStyle = colorRight;
            ctx.moveTo(right, top - 15);
            ctx.lineTo(right - 10, top - 5);
            ctx.lineTo(right - 10, top - 25);
            ctx.closePath();
            ctx.fill();

            ctx.font = 'bold 12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillStyle = 'black';
            ctx.fillText(page, right - 25, top - 15);
        }, 

        afterEvent(chart, args, options) {
            
            const x = args.event.x;
            const y = args.event.y;

            if (x > right - 50 && x < right - 40 && y > top - 25 && y < top - 5) {
                colorLeft = 'red';
                args.event.native.target.style.cursor = 'pointer';
                if (args.event.type === 'click' && currentPageIndex > 0) {
                    currentPageIndex--;  
                    chart.data = pageData[currentPageIndex].data; 
                    chart.update();                }
            } else {
                colorLeft = 'black';
                args.event.native.target.style.cursor = 'default';
            }

            if (x > right - 10 && x < right && y > top - 25 && y < top - 5) {
                colorRight = 'red';
                args.event.native.target.style.cursor = 'pointer';
                if (args.event.type === 'click' && currentPageIndex < pages.length - 1) {
                    currentPageIndex++;
                    page = pages[currentPageIndex];
                }
            } else {
                colorRight = 'black';
                args.event.native.target.style.cursor = 'default';
            }
            chart.update();
        }
    }

    const config = {
      type: 'bar',                                        
      data,
      options: {
        onHover: (event, ChartElements) => {
            event.native.target.style.cursor = ChartElements[0] ? 'pointer' : 'default';
        },
        onClick: (event, ChartElements) => {        
            if (ChartElements.length) {
                console.log(ChartElements);
                const dataset = ChartElements[0].dataIndex;
                const dataPoint = ChartElements[0].index;

                const labelItem = event.chart.data.labels[dataPoint];

                if (labelItem === 'coffee') {
                    event.chart.data = coffee;
                    page = 2;
                }
                if (labelItem === 'Tea') {
                    event.chart.data = tea;
                    page = 3;
                }
                if (labelItem === 'Weekly Sales') {
                    event.chart.data = start;
                    page = 1;
                }
                event.chart.update();
            }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
      plugins: [resetButton]
    };

    // render init block
    const myChart = new Chart(
      document.getElementById('myChart'),
      config
    );

    // Instantly assign Chart.js version
    const chartVersion = document.getElementById('chartVersion');
    chartVersion.innerText = Chart.version;
