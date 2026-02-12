$(document).ready(function() {

//	 Bar Chart

    var barChartDataDjango = {{ bar_chart_data|safe }};
    console.log('barChartDataDjango:', barChartDataDjango);

    // Data processing logic for Django data
    barChartDataDjango.forEach(function(entry) {
        entry.y = entry.y.toString(); // Convert y to a string
        entry.a = parseFloat(entry.a); // Convert a to a number
        entry.b = parseFloat(entry.b); // Convert b to a number
        entry.c = parseFloat(entry.c); // Convert c to a number
    });

    // Create the Bar Chart using Django data
    Morris.Bar({
        element: 'bar-charts',
        redrawOnParentResize: true,
        data: barChartDataDjango,
        xkey: 'y',
        ykeys: ['a', 'b', 'c'],
        labels: ['Earning', 'Profit', 'Contracted Profit'],
        lineColors: ['#ff9b44', '#fc6075', '#ff9b44'],
        lineWidth: '2px',
        barColors: ['#ff9b44', '#fc6075', '#ff9b44'],
        resize: true,
        redraw: true
    });
	
	// Line Chart
	
	Morris.Line({
		element: 'line-charts',
		redrawOnParentResize: true,
		data: [
			{ y: '2006', a: 50, b: 90 },
			{ y: '2007', a: 75,  b: 65 },
			{ y: '2008', a: 50,  b: 40 },
			{ y: '2009', a: 75,  b: 65 },
			{ y: '2010', a: 50,  b: 40 },
			{ y: '2011', a: 75,  b: 65 },
			{ y: '2012', a: 100, b: 50 }
		],
		xkey: 'y',
		ykeys: ['a', 'b'],
		labels: ['Total Sales', 'Total Revenue'],
		lineColors: ['#ff9b44','#fc6075'],
		lineWidth: '3px',
		resize: true,
		
		redraw: true
	});
		
});
