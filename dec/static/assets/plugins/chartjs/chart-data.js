$(function() {
	'use strict';
	/*let chartBar1;
	const ctx1 = document.getElementById('chartBar1').getContext('2d');

	const chartDataSets = {
	  Weekly: {
	    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
	    data: [1, 3, 2, 3, 4]
	  },
	  Monthly: {
	    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
	    data: [2, 7, 4.5, 6, 12, 10]
	  },
	  Quarterly: {
	    labels: ['Q1', 'Q2'],
	    data: [8, 15, 30, 45, 60]
	  }
	};

	function createChart(labels, data) {
	  return new Chart(ctx1, {
	    type: 'bar',
	    data: {
	      labels: labels,
	      datasets: [{
	        label: 'Sales',
	        data: data,
	        backgroundColor: '#ff9b44'
	      }]
	    },
	    options: {
	      maintainAspectRatio: false,
	      responsive: true,
	      plugins: {
	        legend: {
	          display: false
	        }
	      },
	      scales: {
	        y: {
	          beginAtZero: true,
	          ticks: {
	            font: {
	              size: 10
	            },
	            max: 100
	          }
	        },
	        x: {
	          ticks: {
	            font: {
	              size: 11
	            }
	          },
	          barPercentage: 0.6
	        }
	      }
	    }
	  });
	}

	window.updateChart = function (period) {
	  document.getElementById('selectedPeriodLabel').innerText = period;

	  document.querySelectorAll('.btn-group button').forEach(btn => {
	    btn.classList.remove('active');
	    if (btn.innerText === period) btn.classList.add('active');
	  });

	  if (chartBar1) {
	    chartBar1.destroy();
	  }

	  const { labels, data } = chartDataSets[period];
	  chartBar1 = createChart(labels, data);
	};

	document.addEventListener('DOMContentLoaded', () => {
	  document.querySelectorAll('#chart-buttons button').forEach(btn => {
	    btn.addEventListener('click', () => {
	      const period = btn.getAttribute('data-period');
	      updateChart(period);
	    });
	  });
	  updateChart('Monthly');
	});
	var ctx2 = document.getElementById('profile-searches').getContext('2d');
	new Chart(ctx2, {
		type: 'bar',
		data: {
			labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
			datasets: [{
				label: 'Sales',
				data: [14, 12, 34, 25, 24, 20],
				backgroundColor: 'rgb(252, 96, 117'
			}]
		},
		options: {
			maintainAspectRatio: false,
			responsive: true,
			legend: {
				display: false,
				labels: {
					display: false
				}
			},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true,
						fontSize: 10,
						max: 80
					}
				}],
				xAxes: [{
					barPercentage: 0.6,
					ticks: {
						beginAtZero: true,
						fontSize: 11
					}
				}]
			}
		}
	});
	var ctx3 = document.getElementById('new-followers').getContext('2d');
	var gradient = ctx3.createLinearGradient(0, 0, 0, 250);
	gradient.addColorStop(0, '#44c4fa');
	gradient.addColorStop(1, '#664dc9');
	new Chart(ctx3, {
		type: 'bar',
		data: {
			labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
			datasets: [{
				label: 'Sales',
				data: [14, 12, 34, 25, 24, 20],
				backgroundColor: gradient
			}]
		},
		options: {
			maintainAspectRatio: false,
			responsive: true,
			legend: {
				display: false,
				labels: {
					display: false
				}
			},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true,
						fontSize: 10,
						max: 80
					}
				}],
				xAxes: [{
					barPercentage: 0.6,
					ticks: {
						beginAtZero: true,
						fontSize: 11
					}
				}]
			}
		}
	});

	var ctx4 = document.getElementById('new-connections').getContext('2d');
	var gradient = ctx4.createLinearGradient(0, 0, 0, 250);
	gradient.addColorStop(0, '#5E5E5E');
	new Chart(ctx4, {
		type: 'bar',
		data: {
			labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
			datasets: [{
				label: 'Sales',
				data: [14, 12, 34, 25, 24, 20],
				backgroundColor: gradient
			}]
		},
		options: {
			maintainAspectRatio: false,
			responsive: true,
			legend: {
				display: false,
				labels: {
					display: false
				}
			},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true,
						fontSize: 10,
						max: 80
					}
				}],
				xAxes: [{
					barPercentage: 0.6,
					ticks: {
						beginAtZero: true,
						fontSize: 11
					}
				}]
			}
		}
	});*/


/*const chartDataSets = {
  semiAnnually: {
    labels: ['H1', 'H2'],
    postFrequency: [1, 3], // for chartBar1
    profileSearches: [4, 5],
    newFollowers: [2, 4],
    newConnections: [1, 2]
  },
  Monthly: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    postFrequency: [2, 7, 4.5, 6, 12, 10],
    profileSearches: [14, 12, 34, 25, 24, 20],
    newFollowers: [10, 20, 15, 30, 25, 35],
    newConnections: [5, 10, 8, 12, 15, 18]
  },
  Quarterly: {
    labels: ['Q1', 'Q2'],
    postFrequency: [8, 15, 30, 45],
    profileSearches: [18, 25, 40, 55],
    newFollowers: [14, 20, 35, 40],
    newConnections: [10, 15, 20, 25]
  }
};*/
	console.log('chartDataSets', chartDataSets);

let chartBar1, chartProfileSearches, chartNewFollowers, chartNewConnections;

function createBarChart(ctx, labels, data, color = '#ff9b44') {
  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Posts',
        data: data,
        backgroundColor: color
      }]
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { font: { size: 10 }, max: 100 }
        },
        x: {
          ticks: { font: { size: 11 } },
          barPercentage: 0.6
        }
      }
    }
  });
}

window.updateChart = function (period) {
	// document.getElementById('selectedPeriodLabel').innerText = period;
	var btn = $('#chart-buttons button[data-period="' + period + '"]');
	if (btn.length) {
		$('#selectedPeriodLabel').text(btn.text());
	}
  document.querySelectorAll('#chart-buttons button').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-period') === period) btn.classList.add('active');
  });

  const { labels, postFrequency, profileSearches, newFollowers, newConnections } = chartDataSets[period];

  // Destroy and clear canvases safely
  if (chartBar1 && typeof chartBar1.destroy === 'function') {
    chartBar1.destroy();
    clearCanvas('chartBar1');
  }
  if (chartProfileSearches && typeof chartProfileSearches.destroy === 'function') {
    chartProfileSearches.destroy();
    clearCanvas('profile-searches');
  }
  if (chartNewFollowers && typeof chartNewFollowers.destroy === 'function') {
    chartNewFollowers.destroy();
    clearCanvas('new-followers');
  }
  if (chartNewConnections && typeof chartNewConnections.destroy === 'function') {
    chartNewConnections.destroy();
    clearCanvas('new-connections');
  }

  const ctx1 = document.getElementById('chartBar1').getContext('2d');
  const ctx2 = document.getElementById('profile-searches').getContext('2d');
  const ctx3 = document.getElementById('new-followers').getContext('2d');
  const ctx4 = document.getElementById('new-connections').getContext('2d');

  chartBar1 = createBarChart(ctx1, labels, postFrequency, 'rgb(155, 135, 245)');
  chartProfileSearches = createBarChart(ctx2, labels, profileSearches, 'rgb(234, 56, 76)');
  chartNewFollowers = createBarChart(ctx3, labels, newFollowers, 'rgb(229, 222, 255)');
  chartNewConnections = createBarChart(ctx4, labels, newConnections, 'rgb(85, 85, 85)');
}

// This should be outside the function
function clearCanvas(canvasId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}


document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#chart-buttons button').forEach(btn => {
    btn.addEventListener('click', () => {
      const period = btn.getAttribute('data-period');
      updateChart(period);       // Update Bar Chart (chart.js)
      updateLineCharts(period);  // Update all Line Charts (apexcharts)
    });
  });

  // Initial load
  updateChart('Monthly');
  updateLineCharts('Monthly');
});

var ctx1 = document.getElementById('sentimentAnalysis').getContext('2d');
new Chart(ctx1, {
	type: 'bar',
	data: {
		labels: ['Positive', 'Neutral', 'Negative'],
		datasets: [{
			// label: 'Sentiment',
			data: sentimentData, // update with your actual values
			backgroundColor: 'hsl(222.2 84% 4.9%)',
			barPercentage: 0.15,     // width of each bar
			// categoryPercentage: 0.8 // spacing between bars
		}]
	},
	options: {
		maintainAspectRatio: false,
		responsive: true,
		plugins: {
			legend: {
				display: false
			},
			tooltip: {
		    backgroundColor: '#ffffff',     // white background
		    titleColor: '#000000',          // black title text
		    bodyColor: '#000000',           // black body text
		    borderColor: '#e5e7eb',         // light gray border
		    borderWidth: 1,
		    cornerRadius: 4,
		    titleFont: {
		      size: 12,
		      weight: 'bold'
		    },
		    bodyFont: {
		      size: 11
		    },
		    callbacks: {
		      label: function(context) {
		        const label = context.label;
		        const value = context.parsed.y;
		        return `${value}% of comments`;
		      }
		    }
		  }
		},
		scales: {
			y: {
				beginAtZero: true,
				max: 100,
				ticks: {
					stepSize: 25,
					font: {
						size: 10
					}
				},
				grid: {
					color: 'rgba(67, 87, 133, .09)'
				}
			},
			x: {
				ticks: {
					font: {
						size: 11
					}
				},
				grid: {
					color: 'rgba(67, 87, 133, .09)'
				}
			}
		}
	}
});

const ctx22 = document.getElementById('sentimentHistory').getContext('2d');
new Chart(ctx22, {
  type: 'bar',
  data: {
    labels: months,
    datasets: [
      {
        label: 'Positive',
        data: positive,
        backgroundColor: 'rgb(74, 222, 128)',
        barPercentage: 0.05,
      },
      {
        label: 'Neutral',
        data: neutral,
        backgroundColor: 'rgb(250, 204, 21)',
        barPercentage: 0.05,
      },
      {
        label: 'Negative',
        data: negative,
        backgroundColor: 'rgb(248, 113, 113)',
        barPercentage: 0.05,
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
    	backgroundColor: {
	      color: '#fff' // or any color
	    },
      tooltip: {
        callbacks: {
          label: function(ctx) {
            return `${ctx.dataset.label}: ${ctx.parsed.y}%`;
          }
        }
      },
      legend: {
        display: true,
        position: 'bottom'
      }
    },
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true,
        max: 100,
        beginAtZero: true,
        ticks: {
          stepSize: 25
        }
      }
    }
  }
});
document.querySelectorAll('.post-btn2').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.post-btn2').forEach(b => b.classList.remove('active'));
    this.classList.add('active');

    const mode = this.dataset.mode;
    document.getElementById('sentimentCurrentChart').style.display = mode === 'current' ? 'block' : 'none';
    document.getElementById('sentimentHistoryChart').style.display = mode === 'history' ? 'block' : 'none';
  });
});
//	var ctx4 = document.getElementById('chartBar4').getContext('2d');
//	new Chart(ctx4, {
//		type: 'bar',
//		data: {
//			labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//			datasets: [{
//				label: 'Sales',
//				data: [14, 12, 34, 25, 24, 20],
//				backgroundColor: ['#ff9b44', 'rgb(252, 96, 117', '#38cb89', '#3e80eb', '#ffab00', '#ef4b4b']
//			}]
//		},
//		options: {
//			indexAxis: 'y',
//			maintainAspectRatio: false,
//			legend: {
//				display: false,
//				labels: {
//					display: false
//				}
//			},
//			scales: {
//				yAxes: [{
//					ticks: {
//						beginAtZero: true,
//						fontSize: 10,
//					}
//				}],
//				xAxes: [{
//					ticks: {
//						beginAtZero: true,
//						fontSize: 11,
//						max: 80
//					}
//				}]
//			}
//		}
//	});
//	var ctx5 = document.getElementById('chartBar5').getContext('2d');
//	new Chart(ctx5, {
//		type: 'bar',
//		data: {
//			labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
//			datasets: [{
//				data: [14, 12, 34, 25, 24, 20],
//				backgroundColor: [ '#ff9b44', 'rgb(252, 96, 117', '#116e7c', '#ffab00', '#ef4b4b']
//			}, {
//				data: [22, 30, 25, 30, 20, 40],
//				backgroundColor: '#44c4fa'
//			}]
//		},
//		options: {
//			indexAxis: 'y',
//			maintainAspectRatio: false,
//			legend: {
//				display: false,
//				labels: {
//					display: false
//				}
//			},
//			scales: {
//				yAxes: [{
//					ticks: {
//						beginAtZero: true,
//						fontSize: 11,
//					}
//				}],
//				xAxes: [{
//					ticks: {
//						beginAtZero: true,
//						fontSize: 11,
//						max: 80
//					}
//				}]
//			}
//		}
//	});
//	/** STACKED BAR CHART **/
//	var ctx6 = document.getElementById('chartStacked1');
//	new Chart(ctx6, {
//		type: 'bar',
//		data: {
//			labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//			datasets: [{
//				data: [14, 12, 34, 25, 24, 20],
//				backgroundColor: '#ff9b44',
//				borderWidth: 1,
//				fill: true
//			}, {
//				data: [14, 12, 34, 25, 24, 20],
//				backgroundColor:  'rgb(252, 96, 117)',
//				borderWidth: 1,
//				fill: true
//			}]
//		},
//		options: {
//			maintainAspectRatio: false,
//			legend: {
//				display: false,
//				labels: {
//					display: false
//				}
//			},
//			scales: {
//				yAxes: [{
//					stacked: true,
//					ticks: {
//						beginAtZero: true,
//						fontSize: 11
//					}
//				}],
//				xAxes: [{
//					barPercentage: 0.5,
//					stacked: true,
//					ticks: {
//						fontSize: 11
//					}
//				}]
//			}
//		}
//	});
//	var ctx7 = document.getElementById('chartStacked2');
//	new Chart(ctx7, {
//		type: 'bar',
//		data: {
//			labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//			datasets: [{
//				data: [14, 12, 34, 25, 24, 20],
//				backgroundColor: '#ff9b44',
//				borderWidth: 1,
//				fill: true
//			}, {
//				data: [14, 12, 34, 25, 24, 20],
//				backgroundColor:  'rgb(252, 96, 117)',
//				borderWidth: 1,
//				fill: true
//			}]
//		},
//		options: {
//			indexAxis: 'y',
//			maintainAspectRatio: false,
//			legend: {
//				display: false,
//				labels: {
//					display: false
//				}
//			},
//			scales: {
//				yAxes: [{
//					stacked: true,
//					ticks: {
//						beginAtZero: true,
//						fontSize: 10,
//						max: 80
//					}
//				}],
//				xAxes: [{
//					stacked: true,
//					ticks: {
//						beginAtZero: true,
//						fontSize: 11
//					}
//				}]
//			}
//		}
//	});
//	/* LINE CHART */
//	var ctx8 = document.getElementById('chartLine1');
//	new Chart(ctx8, {
//		type: 'line',
//		data: {
//			labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//			datasets: [{
//				data: [14, 12, 34, 25, 44, 36, 35, 25, 30, 32, 20, 25 ],
//				borderColor: '#ff9b44',
//				borderWidth: 1,
//				fill: false
//			}, {
//				data: [35, 30, 45, 35, 55, 40, 10, 20, 25, 55, 50, 45],
//				borderColor: 'rgb(252, 96, 117)',
//				borderWidth: 1,
//				fill: false
//			}]
//		},
//		options: {
//			maintainAspectRatio: false,
//			legend: {
//				display: false,
//				labels: {
//					display: false
//				}
//			},
//			scales: {
//				yAxes: [{
//					ticks: {
//						beginAtZero: true,
//						fontSize: 10,
//						max: 80
//					}
//				}],
//				xAxes: [{
//					ticks: {
//						beginAtZero: true,
//						fontSize: 11
//					}
//				}]
//			}
//		}
//	});
//	/** AREA CHART **/
//	var ctx9 = document.getElementById('chartArea1');
//	var gradient1 = ctx3.createLinearGradient(0, 350, 0, 0);
//	gradient1.addColorStop(0, 'rgba(102, 77, 201,0)');
//	gradient1.addColorStop(1, 'rgba(102, 77, 201,.5)');
//	var gradient2 = ctx3.createLinearGradient(0, 280, 0, 0);
//	gradient2.addColorStop(0, 'rgba(91, 115, 232,0)');
//	gradient2.addColorStop(1, 'rgba(91, 115, 232,.5)');
//	new Chart(ctx9, {
//		type: 'line',
//		data: {
//			labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//			datasets: [{
//				data: [14, 12, 34, 25, 44, 36, 35, 25, 30, 32, 20, 25 ],
//				borderColor: '#ff9b44',
//				borderWidth: 1,
//				backgroundColor: gradient1
//			}, {
//				data: [35, 30, 45, 35, 55, 40, 10, 20, 25, 55, 50, 45],
//				borderColor: '#44c4fa',
//				borderWidth: 1,
//				backgroundColor: gradient2
//			}]
//		},
//		options: {
//			maintainAspectRatio: false,
//			legend: {
//				display: false,
//				labels: {
//					display: false
//				}
//			},
//			scales: {
//				yAxes: [{
//					ticks: {
//						beginAtZero: true,
//						fontSize: 10,
//						max: 80
//					}
//				}],
//				xAxes: [{
//					ticks: {
//						beginAtZero: true,
//						fontSize: 11
//					}
//				}]
//			}
//		}
//	});
	/** PIE CHART **/
	var datapie = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
		datasets: [{
			data: [35,20,8,15,24],
			backgroundColor: ['#664dc9', '#44c4fa', '#38cb89', '#3e80eb', '#ffab00', '#ef4b4b']
		}]
	};
	var optionpie = {
		maintainAspectRatio: false,
		responsive: true,
		legend: {
			display: false,
		},
		animation: {
			animateScale: true,
			animateRotate: true
		}
	};
	// For a doughnut chart
	var ctx6 = document.getElementById('chartPie');
	var myPieChart6 = new Chart(ctx6, {
		type: 'doughnut',
		data: datapie,
		options: optionpie
	});
	// For a pie chart
	var ctx7 = document.getElementById('chartDonut');
	var myPieChart7 = new Chart(ctx7, {
		type: 'pie',
		data: datapie,
		options: optionpie
	});
});
