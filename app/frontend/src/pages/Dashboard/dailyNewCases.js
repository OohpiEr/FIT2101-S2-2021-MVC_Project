
export const basicOptions = {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    responsive: true,
  };

  
  export let barChartOptions = {
    ...basicOptions,
    tooltips: {
      backgroundColor: '#f5f5f5',
      titleFontColor: '#333',
      bodyFontColor: '#666',
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest",
          // callbacks: {
        //     // title: function(tooltipItem, data) {
        //     //  return "Login History";

        //     // }, // This returns the hour range for the tool tip, and - Now for the current hour
        //     title: function (tooltipItem, data) {
        //         if (tooltipItem.index == 23) {
        //             return data.labels[tooltipItem.index] + " - Now";
        //         } else {
        //             return data.labels[tooltipItem.index] + " - " + data.labels[(tooltipItem.index) + 1];
        //         }
        //     },
        //     // // This sets the label for the tool tip for the number of either successfully logged on users
        //     // // or failed users
        //     // label: function(tooltipItem, data) {
        //     //   var successCount = data.datasets[0].data[tooltipItem.index];
        //     //   var failCount = data.datasets[1].data[tooltipItem.index];
        //     //   return "Success: " + successCount + "\n Distinct: " + failCount;
        //     // }
        // }
    },
    scales: {
      yAxes: [{
  
        gridLines: {
          drawBorder: false,
          color: 'rgba(29,140,248,0.1)',
          zeroLineColor: "transparent",
        },
        ticks: {
          suggestedMin: 60,
          suggestedMax: 120,
          padding: 20,
          fontColor: "white",
          fontSize: 15
        }
      }],
      xAxes: [{
  
        gridLines: {
          drawBorder: false,
          color: 'rgba(29,140,248,0.1)',
          zeroLineColor: "transparent",
        },
        ticks: {
          padding: 20,
          fontColor: "white",
          fontSize: 15
        }
      }]
    }
  
  }
  