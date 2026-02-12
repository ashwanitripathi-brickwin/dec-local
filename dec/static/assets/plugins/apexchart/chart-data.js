'use strict';$(document).ready(function(){function generateData(baseval,count,yrange){var i=0;var series=[];while(i<count){var x=Math.floor(Math.random()*(750-1+1))+1;;var y=Math.floor(Math.random()*(yrange.max-yrange.min+1))+yrange.min;var z=Math.floor(Math.random()*(75-15+1))+15;series.push([x,y,z]);baseval+=86400000;i++;}
return series;}
if($('#deals-chart').length>0){var options={series:[{name:"sales",colors:['#FFC38F'],data:[{x:'Inpipeline',y:400,},{x:'Follow Up',y:30},{x:'Schedule',y:248},{x:'Conversation',y:470},{x:'Won',y:470},{x:'Lost',y:180}]}],chart:{type:'bar',height:250,},plotOptions:{bar:{borderRadius:50,borderRadiusApplication:'around',}},colors:['#FFC38F'],xaxis:{type:'category',group:{style:{fontSize:'7px',fontWeight:700,},groups:[{title:'2019',cols:4},{title:'2020',cols:4}]}},};var chart=new ApexCharts(document.querySelector("#deals-chart"),options);chart.render();}
if($('#leads-years').length>0){var options={series:[{name:'XYZ MOTORS',data:dates}],chart:{type:'area',stacked:false,height:350,zoom:{type:'x',enabled:true,autoScaleYaxis:true},toolbar:{autoSelected:'zoom'}},dataLabels:{enabled:false},markers:{size:0,},title:{text:'Stock Price Movement',align:'left'},fill:{type:'gradient',gradient:{shadeIntensity:1,inverseColors:false,opacityFrom:0.5,opacityTo:0,stops:[0,90,100]},},yaxis:{labels:{formatter:function(val){return(val/1000000).toFixed(0);},},title:{text:'Price'},},xaxis:{type:'datetime',},tooltip:{shared:false,y:{formatter:function(val){return(val/1000000).toFixed(0)}}}};var chart=new ApexCharts(document.querySelector("#lead-years"),options);chart.render();}
if($('#leads-chart').length>0){var options={series:[{name:"sales",colors:['#BEA4F2'],data:[{x:'Inpipeline',y:400,},{x:'Follow Up',y:30},{x:'Schedule',y:248},{x:'Conversation',y:470},{x:'Won',y:470},{x:'Lost',y:180}]}],chart:{type:'bar',height:250,},plotOptions:{bar:{borderRadius:50,borderRadiusApplication:'around',}},colors:['#BEA4F2'],xaxis:{type:'category',group:{style:{fontSize:'7px',fontWeight:700,},groups:[{title:'2019',cols:4},{title:'2020',cols:4}]}},};var chart=new ApexCharts(document.querySelector("#leads-chart"),options);chart.render();}
if($('#last-chart').length>0){var options={series:[{data:[400,220,448,]}],chart:{type:'bar',height:150},plotOptions:{bar:{borderRadius:50,horizontal:true,}},dataLabels:{enabled:false},borderRadius:50,colors:['#F96C85'],xaxis:{categories:['Conversation','Follow Up','Inpipeline'],}};var chart=new ApexCharts(document.querySelector("#last-chart"),options);chart.render();}
if($('#last-chart-2').length>0){var options={series:[{data:[400,430,448,]}],chart:{type:'bar',height:150},plotOptions:{bar:{borderRadius:50,horizontal:true,}},dataLabels:{enabled:false},borderRadius:50,colors:['#F96C85'],xaxis:{categories:['Conversation','Follow Up','Inpipeline'],}};var chart=new ApexCharts(document.querySelector("#last-chart-2"),options);chart.render();}
if($('#won-chart').length>0){var options={series:[{data:[400,122,250]}],chart:{type:'bar',height:150},plotOptions:{bar:{borderRadius:10,horizontal:true,}},dataLabels:{enabled:false},colors:['#77D882'],xaxis:{categories:['Conversation','Follow Up','Inpipeline'],}};var chart=new ApexCharts(document.querySelector("#won-chart"),options);chart.render();}
if($('#leads-won-chart').length>0){var options={series:[{data:[400,430,448,]}],chart:{type:'bar',height:150},plotOptions:{bar:{borderRadius:10,horizontal:true,}},dataLabels:{enabled:false},colors:['#77D882'],xaxis:{categories:['Conversation','Follow Up','Inpipeline'],}};var chart=new ApexCharts(document.querySelector("#leads-won-chart"),options);chart.render();}
if($('#year-chart').length>0){var options={series:[{data:[34,44,54,21,12,43,33,23,66,66,58]}],chart:{type:'line',height:350},stroke:{curve:'stepline',},dataLabels:{enabled:false},title:{align:'left'},colors:['#FF902F'],markers:{hover:{sizeOffset:4}}};var chart=new ApexCharts(document.querySelector("#year-chart"),options);chart.render();}
if($('#sales_chart').length>0){var columnCtx=document.getElementById("sales_chart"),columnConfig={colors:['#7638ff','#fda600'],series:[{name:"Received",type:"column",data:[70,150,80,180,150,175,201,60,200,120,190,160,50]},{name:"Pending",type:"column",data:[23,42,35,27,43,22,17,31,22,22,12,16,80]}],chart:{type:'bar',fontFamily:'Poppins, sans-serif',height:350,toolbar:{show:false}},plotOptions:{bar:{horizontal:false,columnWidth:'60%',endingShape:'rounded'},},dataLabels:{enabled:false},stroke:{show:true,width:2,colors:['transparent']},xaxis:{categories:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct'],},yaxis:{title:{text:'$ (thousands)'}},fill:{opacity:1},tooltip:{y:{formatter:function(val){return "$ "+val+" thousands"}}}};var columnChart=new ApexCharts(columnCtx,columnConfig);columnChart.render();}
if($('#invoice_chart').length>0){var pieCtx=document.getElementById("invoice_chart"),pieConfig={colors:['#7638ff','#ff737b','#fda600','#1ec1b0'],series:[55,40,20,10],chart:{fontFamily:'Poppins, sans-serif',height:320,type:'donut',},labels:['Paid','Unpaid','Overdue','Draft'],legend:{show:false},responsive:[{breakpoint:480,options:{chart:{width:200,height:200,},legend:{position:'bottom'}}}]};var pieChart=new ApexCharts(pieCtx,pieConfig);pieChart.render();}
if($('#s-line').length>0){var sline={chart:{height:350,type:'line',zoom:{enabled:false},toolbar:{show:false,}},colors:['rgb(255, 155, 68)'],dataLabels:{enabled:false},stroke:{curve:'straight'},series:[{name:"Desktops",data:[10,41,35,51,49,62,69,91,148]}],title:{text:'Product Trends by Month',align:'left'},grid:{row:{colors:['#f1f2f3','transparent'],opacity:0.5},},xaxis:{categories:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep'],}}
var chart=new ApexCharts(document.querySelector("#s-line"),sline);chart.render();}
if($('#s-line-area').length>0){var sLineArea={chart:{height:350,type:'area',toolbar:{show:false,}},colors:['rgb(255, 155, 68)','rgb(252, 96, 117)'],dataLabels:{enabled:false},stroke:{curve:'smooth'},series:[{name:'series1',data:[31,40,28,51,42,109,100]},{name:'series2',data:[11,32,45,32,34,52,41]}],xaxis:{type:'datetime',categories:["2018-09-19T00:00:00","2018-09-19T01:30:00","2018-09-19T02:30:00","2018-09-19T03:30:00","2018-09-19T04:30:00","2018-09-19T05:30:00","2018-09-19T06:30:00"],},tooltip:{x:{format:'dd/MM/yy HH:mm'},}}
var chart=new ApexCharts(document.querySelector("#s-line-area"),sLineArea);chart.render();}
if($('#s-col').length>0){var sCol={chart:{height:350,type:'bar',toolbar:{show:false,}},plotOptions:{bar:{horizontal:false,columnWidth:'55%',endingShape:'rounded'},},colors:['rgb(255, 155, 68)','rgb(252, 96, 117)'],dataLabels:{enabled:false},stroke:{show:true,width:2,colors:['transparent']},series:[{name:'Net Profit',data:[44,55,57,56,61,58,63,60,66]},{name:'Revenue',data:[76,85,101,98,87,105,91,114,94]}],xaxis:{categories:['Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct'],},yaxis:{title:{text:'$ (thousands)'}},fill:{opacity:1},tooltip:{y:{formatter:function(val){return "$ "+val+" thousands"}}}}
var chart=new ApexCharts(document.querySelector("#s-col"),sCol);chart.render();}
if($('#s-col-stacked').length>0){var sColStacked={chart:{height:350,type:'bar',stacked:true,toolbar:{show:false,}},responsive:[{breakpoint:480,options:{legend:{position:'bottom',offsetX:-10,offsetY:0}}}],plotOptions:{bar:{horizontal:false,},},series:[{name:'PRODUCT A',data:[44,55,41,67,22,43]},{name:'PRODUCT B',data:[13,23,20,8,13,27]},{name:'PRODUCT C',data:[11,17,15,15,21,14]},{name:'PRODUCT D',data:[21,7,25,13,22,8]}],xaxis:{type:'datetime',categories:['01/01/2011 GMT','01/02/2011 GMT','01/03/2011 GMT','01/04/2011 GMT','01/05/2011 GMT','01/06/2011 GMT'],},legend:{position:'right',offsetY:40},fill:{opacity:1},}
var chart=new ApexCharts(document.querySelector("#s-col-stacked"),sColStacked);chart.render();}
if($('#s-bar').length>0){var sBar={chart:{height:350,type:'bar',toolbar:{show:false,}},colors:['rgb(252, 96, 117)'],plotOptions:{bar:{horizontal:true,}},dataLabels:{enabled:false},series:[{data:[400,430,448,470,540,580,690,1100,1200,1380]}],xaxis:{categories:['South Korea','Canada','United Kingdom','Netherlands','Italy','France','Japan','United States','China','Germany'],}}
var chart=new ApexCharts(document.querySelector("#s-bar"),sBar);chart.render();}
if($('#mixed-chart').length>0){var options={chart:{height:350,type:'line',toolbar:{show:false,}},colors:['rgb(255, 155, 68)','rgb(252, 96, 117)'],series:[{name:'Website Blog',type:'column',data:[440,505,414,671,227,413,201,352,752,320,257,160]},{name:'Social Media',type:'line',data:[23,42,35,27,43,22,17,31,22,22,12,16]}],stroke:{width:[0,4]},title:{text:'Traffic Sources'},labels:['01 Jan 2001','02 Jan 2001','03 Jan 2001','04 Jan 2001','05 Jan 2001','06 Jan 2001','07 Jan 2001','08 Jan 2001','09 Jan 2001','10 Jan 2001','11 Jan 2001','12 Jan 2001'],xaxis:{type:'datetime'},yaxis:[{title:{text:'Website Blog',},},{opposite:true,title:{text:'Social Media'}}]}
var chart=new ApexCharts(document.querySelector("#mixed-chart"),options);chart.render();}
if($('#donut-chart').length>0){var donutChart={chart:{height:350,type:'donut',toolbar:{show:false,}},series:[44,55,41,17],responsive:[{breakpoint:480,options:{chart:{width:200,height:300,},legend:{position:'bottom'}}}]}
var donut=new ApexCharts(document.querySelector("#donut-chart"),donutChart);donut.render();}
if($('#radial-chart').length>0){var radialChart={chart:{height:350,type:'radialBar',toolbar:{show:false,}},plotOptions:{radialBar:{dataLabels:{name:{fontSize:'22px',},value:{fontSize:'16px',},total:{show:true,label:'Total',formatter:function(w){return 249}}}}},series:[44,55,67,83],labels:['Apples','Oranges','Bananas','Berries'],}
var chart=new ApexCharts(document.querySelector("#radial-chart"),radialChart);chart.render();}
if($('#working_chart').length>0){var options={series:[{name:'Break',data:[-50,-120,-80,-180,-80,-70,-100],},{name:'Hours',data:[200,250,200,290,220,300,250],}],colors:['#FC133D','#55CE63'],chart:{type:'bar',height:210,stacked:true,zoom:{enabled:true}},responsive:[{breakpoint:280,options:{legend:{position:'bottom',offsetY:0}}}],plotOptions:{bar:{horizontal:false,borderRadius:4,borderRadiusApplication:"end",borderRadiusWhenStacked:"all",columnWidth:'30%',endingShape:'rounded'},},dataLabels:{enabled:false},yaxis:{min:-200,max:300,tickAmount:5,},xaxis:{categories:[' S ','M','T','W','T','F','S'],},legend:{show:false},fill:{opacity:1}};var chart=new ApexCharts(document.querySelector("#working_chart"),options);chart.render();}
// if($('#leadpiechart').length>0){var options={series:[44,55,13,43,30,37],chart:{width:450,type:'pie',},labels:['Leadership', 'Marketing', 'Technology', 'Innovation', 'Career', 'Events'],responsive:[{breakpoint:480,options:{chart:{width:275},legend:{position:'right'}}}]};var chart=new ApexCharts(document.querySelector("#leadpiechart"),options);chart.render();}
/*if ($('#leadpiechart').length > 0) {
  var options2 = {
    series: [44, 55, 13, 43, 30, 37],
    chart: {
      width: 450,
      type: 'pie',
    },
    labels: ['Inpipeline', 'Follow Up', 'Schedule Service', 'Conversation', 'Test', 'Test2'],
    colors: [
      'rgb(139, 92, 246)', // purple
      'rgb(132, 204, 22)', // green
      'rgb(249, 115, 22)', // orange
      'rgb(6, 182, 212)',  // cyan
      'rgb(236, 72, 153)', // pink
      'rgb(156, 163, 175)' // gray
    ],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 275
        },
        legend: {
          position: 'right'
        }
      }
    }]
  };

  var chart2 = new ApexCharts(document.querySelector("#leadpiechart"), options2);
  chart2.render();
}*/
/*if ($('#leadpiechart').length > 0) {
  var options2 = {
  series: [44, 55, 13, 43, 30, 37],
  chart: {
    type: 'pie',
    width: '100%',
  },
  labels: ['Inpipeline', 'Follow Up', 'Schedule Service', 'Conversation', 'Test', 'Test2'],
  colors: [
    'rgb(155, 135, 245)',   // purple
    'rgb(142, 145, 150)',   // green
    'rgb(234, 56, 76)',   // orange
    'rgb(126, 105, 171)',    // cyan
    'rgb(217, 70, 239)',   // pink
    'rgb(51, 195, 240)'   // gray
  ],
  dataLabels: {
    enabled: true,
    formatter: function (val, opts) {
      return opts.w.globals.labels[opts.seriesIndex] + ": " + Math.round(val) + "%";
    },
    style: {
      fontSize: '14px',
      colors: ['#fff']
    },
    dropShadow: {
      enabled: false
    }
  },
  legend: {
    show: true,
    position: 'bottom',
    fontSize: '14px',
    labels: {
      colors: '#555'
    },
    formatter: function(seriesName, opts) {
      return seriesName + " (" + opts.w.globals.series[opts.seriesIndex] + ")";
    },
    itemMargin: {
      horizontal: 10,
      vertical: 4
    },
    markers: {
      radius: 12
    }
  },
  stroke: {
    show: false
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 300
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
};


  var chart2 = new ApexCharts(document.querySelector("#leadpiechart"), options2);
  chart2.render();
}*/


if ($('#leadpiechart').length > 0) {

  // Your raw data
  // const rawData = [
  //   { label: 'Leadership', value: 32, color: 'rgb(155, 135, 245)' },
  //   { label: 'Marketing', value: 23, color: 'rgb(142, 145, 150)' },
  //   { label: 'Technology', value: 18, color: 'rgb(234, 56, 76)' },
  //   { label: 'Innovation', value: 14, color: 'rgb(126, 105, 171)' },
  //   { label: 'Career', value: 8, color: 'rgb(217, 70, 239)' },
  //   { label: 'Events', value: 5, color: 'rgb(51, 195, 240)' }
  // ];

  // // Sort by value descending
  // const sortedData = rawData.sort((a, b) => b.value - a.value);

  // // Extract sorted series, labels, and colors
  // const sortedSeries = sortedData.map(item => item.value);
  // const sortedLabels = sortedData.map(item => item.label);
  // const sortedColors = sortedData.map(item => item.color);

  const options2 = {
    series: sortedSeries,
    chart: {
      type: 'pie',
      width: '100%',
      height: 300,
    },
    labels: sortedLabels,
    colors: sortedColors,
    dataLabels: {
      enabled: true,
      position: 'outside',
      offset: 20,
      formatter: function (val, opts) {
        return opts.w.globals.labels[opts.seriesIndex] + ": " + Math.round(val) + "%";
      },
      style: {
        fontSize: '13px',
        colors: undefined // use matching chart slice color
      },
      dropShadow: { enabled: false }
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: 20,
          minAngleToShowLabel: 5
        },
        expandOnClick: false
      }
    },
    legend: {
      show: true,
      position: 'bottom',
      // horizontalAlign: 'center',
      fontSize: '14px',
      labels: {
        colors: '#333'
      },
      formatter: function(seriesName, opts) {
        return seriesName + " (" + opts.w.globals.series[opts.seriesIndex] + ")";
      },
      
      markers: {
        radius: 12
      }
    },
    stroke: {
      show: false
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 320
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  const chart2 = new ApexCharts(document.querySelector("#leadpiechart"), options2);
  chart2.render();
}


var options = {
  chart: {
    type: 'bar',
    height: 100,
    stacked: true,
    toolbar: { show: false }
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '50%',
      // borderRadius: 10,
      borderRadius: 20,
      borderRadiusApplication: 'around',
      dataLabels: {
        position: 'top'
      }
    }
  },
  colors: ['#6610f2', '#E5E7EB'], // Purple and Light Gray
  series: [
    {
      name: 'Original',
      data: [68]
    },
    {
      name: 'Reshared',
      data: [32]
    }
  ],
  xaxis: {
    categories: ['Content'],
    labels: {
      show: false
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    max: 100
  },
  yaxis: {
    labels: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  legend: {
    show: true,
    position: 'right',
    markers: {
      radius: 12
    },
    labels: {
      colors: '#333'
    },
    itemMargin: {
      vertical: 5
    }
  },
  grid: {
    show: false
  },
  tooltip: {
    enabled: false
  }
};

var chart = new ApexCharts(document.querySelector("#sourceBreakdown"), options);
chart.render();

// if( $('#leadpiechart2').length>0){var options={series:[44,55,13,43,30,37],chart:{width:450,type:'pie',},labels:['Inpipeline','Follow Up','Schedule Service','Conversation','Test','Test2'],responsive:[{breakpoint:480,options:{chart:{width:275},legend:{position:'right'}}}]};var chart=new ApexCharts(document.querySelector("#leadpiechart2"),options);chart.render();}

$(document).ready(function () {
  var chart;

  var chartData = {
    roles: {
      labels: ['Marketing', 'Sales', 'Operations', 'Executive', 'Other'],
      series: [30, 25, 20, 15, 10],
      colors: ['rgb(139, 92, 246)', 'rgb(132, 204, 22)', 'rgb(249, 115, 22)', 'rgb(6, 182, 212)', 'rgb(236, 72, 153)']
    },
    locations: {
      labels: ['United States','India','United Kingdom','Canada','Australia','Other'],
      series: [40, 30, 20, 10],
      colors: ['rgb(139, 92, 246)', 'rgb(132, 204, 22)', 'rgb(249, 115, 22)', 'rgb(6, 182, 212)', 'rgb(236, 72, 153)', 'rgb(156, 163, 175)']
    },
    industries: {
      labels: ['Technology','Marketing','Finance','Healthcare','Education'],
      series: [35, 25, 25, 15],
      colors: ['rgb(139, 92, 246)', 'rgb(132, 204, 22)', 'rgb(249, 115, 22)', 'rgb(6, 182, 212)', 'rgb(236, 72, 153)']
    },
    interaction: {
      labels: ['New Audience', 'Existing Audience'],
      series: [37, 63],
      colors: ['rgb(139, 92, 246)', 'rgb(6, 182, 212)']
    }
  };


  function renderChart(type) {
    if (chart) {
      chart.destroy();
    }

    var options = {
      series: chartData[type].series,
      chart: {
        width: 450,
        type: 'pie'
      },
      labels: chartData[type].labels,
      colors: chartData[type].colors, // 👈 ADD this line
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 275
          },
          legend: {
            position: 'right'
          }
        }
      }]
    };

    chart = new ApexCharts(document.querySelector("#leadpiechart2"), options);
    chart.render();
  }


  renderChart('roles');

  $('.tab-button').click(function () {
    $('.tab-button').removeClass('active');
    $(this).addClass('active');

    var chartType = $(this).data('chart');
    renderChart(chartType);
  });
});


});
// if($('#engagement').length>0){var options={series:[{name:"Session Duration",data:[45,52,38,24,33,26,21,20,6,8,15,10]},],chart:{height:350,type:'line',zoom:{enabled:false},},dataLabels:{enabled:false},stroke:{width:[5,7,5],curve:'straight',dashArray:[0,8,5]},legend:{tooltipHoverFormatter:function(val,opts){return val+' - <strong>'+opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex]+'</strong>'}},markers:{size:0,hover:{sizeOffset:6}},colors:['#FFC38F'],xaxis:{categories:['Jan','feb','march','april','may','jun','july','aug','sep','oct','nov','dec'],},tooltip:{y:[{title:{formatter:function(val){return val+" (mins)"}}},{title:{formatter:function(val){return val+" per session"}}},{title:{formatter:function(val){return val;}}}]},grid:{borderColor:'#f1f1f1',}};var chart=new ApexCharts(document.querySelector("#engagement"),options);chart.render();}
// if($('#impressions').length>0){var options={series:[{name:"Session Duration",data:[45,52,38,24,33,26,21,20,6,8,15,10]},],chart:{height:350,type:'line',zoom:{enabled:false},},dataLabels:{enabled:false},stroke:{width:[5,7,5],curve:'straight',dashArray:[0,8,5]},legend:{tooltipHoverFormatter:function(val,opts){return val+' - <strong>'+opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex]+'</strong>'}},markers:{size:0,hover:{sizeOffset:6}},colors:['#FFC38F'],xaxis:{categories:['Jan','feb','march','april','may','jun','july','aug','sep','oct','nov','dec'],},tooltip:{y:[{title:{formatter:function(val){return val+" (mins)"}}},{title:{formatter:function(val){return val+" per session"}}},{title:{formatter:function(val){return val;}}}]},grid:{borderColor:'#f1f1f1',}};var chart=new ApexCharts(document.querySelector("#impressions"),options);chart.render();}
// if($('#profile-views').length>0){var options={series:[{name:"Session Duration",data:[45,52,38,24,33,26,21,20,6,8,15,10]},],chart:{height:350,type:'line',zoom:{enabled:false},},dataLabels:{enabled:false},stroke:{width:[5,7,5],curve:'straight',dashArray:[0,8,5]},legend:{tooltipHoverFormatter:function(val,opts){return val+' - <strong>'+opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex]+'</strong>'}},markers:{size:0,hover:{sizeOffset:6}},colors:['#FFC38F'],xaxis:{categories:['Jan','feb','march','april','may','jun','july','aug','sep','oct','nov','dec'],},tooltip:{y:[{title:{formatter:function(val){return val+" (mins)"}}},{title:{formatter:function(val){return val+" per session"}}},{title:{formatter:function(val){return val;}}}]},grid:{borderColor:'#f1f1f1',}};var chart=new ApexCharts(document.querySelector("#profile-views"),options);chart.render();}


/*const chartDataSetsLine = {
  Weekly: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    data: [5, 10, 7, 12]
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

var engagementChart, impressionsChart, profileViewsChart;

/*function createLineChartOptions(labels, data) {
  return {
    series: [{
      name: "Session Duration",
      data: data
    }],
    chart: {
      height: 350,
      type: 'line',
      zoom: { enabled: false }
    },
    dataLabels: { enabled: false },
    stroke: { width: [5, 7, 5], curve: 'straight', dashArray: [0, 8, 5] },
    legend: {
      tooltipHoverFormatter: function (val, opts) {
        return val + ' - <strong>' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + '</strong>';
      }
    },
    markers: { size: 0, hover: { sizeOffset: 6 } },
    colors: ['#FFC38F'],
    xaxis: {
      categories: labels
    },
    tooltip: {
      y: [{
        title: { formatter: function (val) { return val + " (mins)" } }
      }]
    },
    grid: { borderColor: '#f1f1f1' }
  };
}*/
/*function createLineChartOptions(labels, data) {
  return {
    series: [{
      name: "Session Duration",
      data: data
    }],
    chart: {
      height: 350,
      type: 'line',
      zoom: { enabled: false }
    },
    dataLabels: { enabled: false },
    stroke: {
      width: 3,          // thinner line
      curve: 'smooth',   // or 'straight' if you want straight lines
    },
    markers: {
      size: 5,          // <<< THIS shows points!
      colors: ['#FFC38F'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: { size: 7 }
    },
    colors: ['#FFC38F'],
    xaxis: {
      categories: labels
    },
    tooltip: {
      y: [{
        title: { formatter: function (val) { return val + " (mins)"; } }
      }]
    },
    grid: {
      borderColor: '#f1f1f1'
    }
  };
}*/
/*function createLineChartOptions(labels, data) {
  return {
    series: [{
      name: "Session Duration",
      data: data
    }],
    chart: {
      height: 350,
      type: 'line',
      zoom: { enabled: false },
      toolbar: { show: false }
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth',  // smooth line
      width: 3          // moderate thickness
    },
    markers: {
      size: 5,                   // points visible
      colors: ['#7366ff'],        // light purple color for points
      strokeColors: '#fff',       // white border around points
      strokeWidth: 2,
      hover: { size: 7 }          // bigger when hover
    },
    colors: ['#7366ff'],          // line color (purple tone)
    grid: {
      borderColor: '#f1f1f1',     // light grid color
      strokeDashArray: 5          // dashed grid lines
    },
    tooltip: {
      enabled: true,
      marker: { show: true },     // marker in tooltip
      shared: false
    },
    xaxis: {
      categories: labels,
      labels: {
        style: { fontSize: '12px' }
      }
    },
    yaxis: {
      labels: {
        style: { fontSize: '12px' }
      }
    },
    legend: {
      show: false   // no need for legend for single series
    }
  };
}




document.addEventListener('DOMContentLoaded', function () {
  const { labels, data } = chartDataSetsLine['Monthly']; // Default load: Monthly

  if ($('#engagement').length > 0) {
    var optionsEngagement = createLineChartOptions(labels, data);
    engagementChart = new ApexCharts(document.querySelector("#engagement"), optionsEngagement);
    engagementChart.render();
  }

  if ($('#impressions').length > 0) {
    var optionsImpressions = createLineChartOptions(labels, data);
    impressionsChart = new ApexCharts(document.querySelector("#impressions"), optionsImpressions);
    impressionsChart.render();
  }

  if ($('#profile-views').length > 0) {
    var optionsProfileViews = createLineChartOptions(labels, data);
    profileViewsChart = new ApexCharts(document.querySelector("#profile-views"), optionsProfileViews);
    profileViewsChart.render();
  }
});

function updateLineCharts(period) {
  const { labels, data } = chartDataSetsLine[period];

  if (engagementChart) {
    engagementChart.updateOptions({
      xaxis: { categories: labels }
    });
    engagementChart.updateSeries([{
      name: "Session Duration",
      data: data
    }]);
  }

  if (impressionsChart) {
    impressionsChart.updateOptions({
      xaxis: { categories: labels }
    });
    impressionsChart.updateSeries([{
      name: "Session Duration",
      data: data
    }]);
  }

  if (profileViewsChart) {
    profileViewsChart.updateOptions({
      xaxis: { categories: labels }
    });
    profileViewsChart.updateSeries([{
      name: "Session Duration",
      data: data
    }]);
  }
}


*/