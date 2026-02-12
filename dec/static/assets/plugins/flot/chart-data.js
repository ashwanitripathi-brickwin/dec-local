$(function() {
	'use strict';

/*const chartDataSetsLine = {
  semiAnnually: {
    labels: ['H 1', 'H 2'],
    data: [5, 10]
  },
  Monthly: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [15, 20, 18, 25, 22, 30]
  },
  Quarterly: {
    labels: ['Q1', 'Q2'],
    data: [40, 60]
  }
};*/

// const chartDataSetsLine = {
//   semiAnnually: {
//     labels: ['H1', 'H2'],
//     engagement: [5, 10],
//     impressions: [8, 12],
//     profileViews: [3, 7]
//   },
//   Monthly: {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//     engagement: [15, 20, 18, 25, 22, 30],
//     impressions: [30, 40, 35, 45, 40, 50],
//     profileViews: [12, 18, 15, 20, 19, 25]
//   },
//   Quarterly: {
//     labels: ['Q1', 'Q2'],
//     engagement: [40, 60],
//     impressions: [70, 90],
//     profileViews: [25, 40]
//   }
// };


function createFlotChart(labels, data, elementId, color = 'rgb(51, 195, 240)') {
	console.log("label Changed : "+ labels);
  const flotData = data.map((y, index) => [index, y]);
  const flotTicks = labels.map((label, index) => [index, label]);

  $.plot($('#' + elementId), [{
    data: flotData,
    label: 'Session Duration',
    color: color
  }], {
    series: {
      lines: {
        show: true,
        lineWidth: 2,
        fill: false
      },
      points: {
        show: true,
        radius: 4,
        fill: true,
        fillColor: '#ffffff'
      },
      shadowSize: 0
    },
    legend: {
      show: false
    },
    grid: {
      hoverable: true,
      clickable: true,
      borderColor: '#f1f1f1',
      borderWidth: 1,
      labelMargin: 8
    },
    yaxis: {
      min: 0,
      color: 'rgba(67, 87, 133, .09)',
      font: {
        size: 10,
        color: '#8e9cad'
      }
    },
    xaxis: {
      ticks: flotTicks,
      color: 'rgba(67, 87, 133, .09)',
      font: {
        size: 10,
        color: '#8e9cad'
      }
    }
  });
}

$(document).ready(function() {
  const { labels, data } = chartDataSetsLine['Monthly']; // Default period

  if ($('#engagement').length > 0) {
    createFlotChart(labels, data, 'engagement', 'rgb(51, 195, 240)');
  }

  if ($('#impressions').length > 0) {
    createFlotChart(labels, data, 'impressions', 'rgb(126, 105, 171)');
  }

  if ($('#profile-views').length > 0) {
    createFlotChart(labels, data, 'profile-views', 'rgb(217, 70, 239)');
  }
});

window.updateLineCharts = function(period) {
  console.log("Check period : " + period);
  
  const { labels, engagement, impressions, profileViews } = chartDataSetsLine[period];

  if ($('#engagement').length > 0) {
    createFlotChart(labels, engagement, 'engagement', 'rgb(51, 195, 240)');
  }

  if ($('#impressions').length > 0) {
    createFlotChart(labels, impressions, 'impressions', 'rgb(126, 105, 171)');
  }

  if ($('#profile-views').length > 0) {
    createFlotChart(labels, profileViews, 'profile-views', 'rgb(217, 70, 239)');
  }
};


	$.plot('#flotBar1', [{
		data: [
			[0, 20],
			[1, 35],
			[2, 25]
		]
	}], {
		series: {
			bars: {
				show: true,
				lineWidth: 0,
				fillColor: '#ff9b44',
				barWidth: .1
			},
			highlightColor: '#7cd6fc'
		},
		grid: {
			borderWidth: 1,
			borderColor: 'rgba(67, 87, 133, .09)',
			hoverable: true
		},
		yaxis: {
			ticks: [0, 25, 50, 75, 100],
			tickColor: 'rgba(67, 87, 133, .09)',
			font: {
				color: '#8e9cad',
				size: 10
			}
		},
		xaxis: {
			ticks: [
				[0, "Positive"],
				[1, "Neutral"],
				[2, "Negative"]
			],
			min: -0.3,       // sets left edge
			max: 3, 
			tickColor: 'rgba(67, 87, 133, .09)',
			font: {
				color: '#8e9cad',
				size: 10
			}
		}
	});
/*$.plot('#flotBar1', [{
	data: [
		[0, 20],
		[1, 35],
		[2, 25]
	]
}], {
	series: {
		bars: {
			show: true,
			lineWidth: 0,
			fillColor: '#ff9b44',
			barWidth: .1
		},
		highlightColor: '#7cd6fc'
	},
	grid: {
		borderWidth: 1,
		borderColor: 'rgba(67, 87, 133, .09)',
		hoverable: true
	},
	yaxis: {
		ticks: [0, 25, 50, 75, 100],
		tickColor: 'rgba(67, 87, 133, .09)',
		font: {
			color: '#8e9cad',
			size: 10
		}
	},
	xaxis: {
		ticks: [
			[0, "Positive"],
			[1, "Neutral"],
			[2, "Negative"]
		],
		tickColor: 'rgba(67, 87, 133, .09)',
		font: {
			color: '#8e9cad',
			size: 10
		}
	}
});*/

	$.plot('#flotBar2', [{
		data: [
			[0, 30],
			[2, 15],
			[4, 45],
			[6, 22],
			[8, 18],
			[10, 27],
			[12, 34],
			[14, 35],
			[16, 48],
		],
		bars: {
			show: true,
			lineWidth: 0,
			fillColor: '#FC6075',
			barWidth: .8
		}
	}, {
		data: [
			[1, 80],
			[3, 20],
			[5, 24],
			[7, 17],
			[9, 10],
			[11, 24],
			[13, 30],
			[15, 16]
		],
		bars: {
			show: true,
			lineWidth: 0,
			fillColor: '#ff9b44',
			barWidth: .8
		}
	}], {
		grid: {
			borderWidth: 1,
			borderColor: 'rgba(67, 87, 133, .09)'
		},
		yaxis: {
			tickColor: 'rgba(67, 87, 133, .09)',
			font: {
				color: '#8e9cad',
				size: 10
			}
		},
		xaxis: {
			tickColor: 'rgba(67, 87, 133, .09)',
			font: {
				color: '#8e9cad',
				size: 10
			}
		}
	});
	var newCust = [
		[0, 10],
		[1, 15],
		[2, 25],
		[3, 22],
		[4, 18],
		[5, 27],
		[6, 34],
	];
	var retCust = [
		[0, 8],
		[1, 17],
		[2, 28],
		[3, 20],
		[4, 16],
		[5, 24],
		[6, 36]
	];
	var plot = $.plot($('#flotLine1'), [{
		data: newCust,
		label: 'Posts',
		color: '#664dc9'
	}, {
		data: retCust,
		label: 'Customer',
		color: '#44c4fa'
	}], {
		series: {
			lines: {
				show: true,
				lineWidth: 2
			},
			shadowSize: 0
		},
		points: {
			show: false,
		},
		legend: {
			noColumns: 1,
			position: 'nw'
		},
		grid: {
			hoverable: true,
			clickable: true,
			borderWidth: 0,
			labelMargin: 5
		},
		yaxis: {
			min: 0,
			max: 40,
			color: 'rgba(67, 87, 133, .09)',
			font: {
				size: 10,
				color: '#8e9cad'
			}
		},
		xaxis: {
			color: 'rgba(67, 87, 133, .09)',
			font: {
				size: 10,
				color: '#8e9cad'
			}
		}
	});
	var plot = $.plot($('#flotLine2'), [{
		data: newCust,
		label: 'Posts',
		color: '#664dc9'
	}, {
		data: retCust,
		label: 'Customer',
		color: '#44c4fa'
	}], {
		series: {
			lines: {
				show: true,
				lineWidth: 2
			},
			shadowSize: 0
		},
		points: {
			show: true,
		},
		legend: {
			noColumns: 1,
			position: 'ne'
		},
		grid: {
			hoverable: true,
			clickable: true,
			borderColor: '#ddd',
			borderWidth: 0,
			labelMargin: 5
		},
		yaxis: {
			min: 0,
			max: 50,
			color: 'rgba(67, 87, 133, .09)',
			font: {
				size: 10,
				color: '#8e9cad'
			}
		},
		xaxis: {
			color: 'rgba(67, 87, 133, .09)',
			font: {
				size: 10,
				color: '#8e9cad'
			}
		}
	});
	var plot = $.plot($('#flotArea1'), [{
		data: newCust,
		label: 'Posts',
		color: '#664dc9'
	}, {
		data: retCust,
		label: 'Customer',
		color: '#44c4fa'
	}], {
		series: {
			lines: {
				show: true,
				lineWidth: 1,
				fill: true,
				fillColor: {
					colors: [{
						opacity: 0
					}, {
						opacity: 0.8
					}]
				}
			},
			shadowSize: 0
		},
		points: {
			show: false,
		},
		legend: {
			noColumns: 1,
			position: 'nw'
		},
		grid: {
			hoverable: true,
			clickable: true,
			borderColor: '#ddd',
			borderWidth: 0,
			labelMargin: 5
		},
		yaxis: {
			min: 0,
			max: 50,
			color: 'rgba(67, 87, 133, .09)',
			font: {
				size: 10,
				color: '#8e9cad'
			}
		},
		xaxis: {
			color: 'rgba(67, 87, 133, .09)',
			font: {
				size: 10,
				color: '#8e9cad'
			}
		}
	});
	var plot = $.plot($('#flotArea2'), [{
		data: newCust,
		label: 'Sales',
		color: '#664dc9'
	}, {
		data: retCust,
		label: 'Customer',
		color: '#44c4fa'
	}], {
		series: {
			lines: {
				show: true,
				lineWidth: 1,
				fill: true,
				fillColor: {
					colors: [{
						opacity: 0
					}, {
						opacity: 0.3
					}]
				}
			},
			shadowSize: 0
		},
		points: {
			show: true,
		},
		legend: {
			noColumns: 1,
			position: 'nw'
		},
		grid: {
			hoverable: true,
			clickable: true,
			borderColor: '#ddd',
			borderWidth: 0,
			labelMargin: 5
		},
		yaxis: {
			min: 0,
			max: 50,
			color: 'rgba(67, 87, 133, .09)',
			font: {
				size: 10,
				color: '#8e9cad'
			}
		},
		xaxis: {
			color: 'rgba(67, 87, 133, .09)',
			font: {
				size: 10,
				color: '#8e9cad'
			}
		}
	});
	/**************** PIE CHART *******************/
	var piedata = [{
		label: 'Series 1',
		data: [
			[1, 10]
		],
		color: '#664dc9'
	}, {
		label: 'Series 2',
		data: [
			[1, 50]
		],
		color: '#44c4fa'
	}, {
		label: 'Series 3',
		data: [
			[1, 30]
		],
		color: '#38cb89'
	}, {
		label: 'Series 4',
		data: [
			[1, 30]
		],
		color: '#ef4b4b'
	}, {
		label: 'Series 5',
		data: [
			[1, 60]
		],
		color: '#ffab00'
	}];
	$.plot('#flotPie1', piedata, {
		series: {
			pie: {
				show: true,
				radius: 1,
				label: {
					show: true,
					radius: 2 / 3,
					formatter: labelFormatter,
					threshold: 0.1
				}
			}
		},
		grid: {
			hoverable: false,
			clickable: true
		}
	});
	$.plot('#flotPie2', piedata, {
		series: {
			pie: {
				show: true,
				radius: 1,
				innerRadius: 0.5,
				label: {
					show: true,
					radius: 2 / 3,
					formatter: labelFormatter,
					threshold: 0.1
				}
			}
		},
		grid: {
			hoverable: false,
			clickable: true
		}
	});

	function labelFormatter(label, series) {
		return '<div style="font-size:8pt; text-align:center; padding:2px; color:white;">' + label + '<br/>' + Math.round(series.percent) + '%</div>';
	}
});