
function buildGauge(sample){

url = `/wfreq/${sample}`; 

d3.json(url).then(function(data)
{
  console.log(`returned Wfreq : ${data.WFREQ}`);
  var wfreqForSample = data.WFREQ;

  var level = wfreqForSample*20;  // Since there are 9 segments each segment is 20 degrees

// Trig to calc meter point
var degrees = 180 - level, radius = .6;
var radians = degrees * Math.PI / 180;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians);

// Path: may have to change to create a better triangle
var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
     pathX = String(x),
     space = ' ',
     pathY = String(y),
     pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);

var data = [{ type: 'scatter',
   x: [0], y:[0],
    marker: {size: 28, color:'rgb(0, 51, 28)'},
    showlegend: false,
    name: 'speed',
    text: level,
    hoverinfo: 'text+name'},
  { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50 ] ,
  rotation: 90,
  text: ['8-9', '7-8', '6-7', '5-6','4-5', '3-4', '2-3', '1-2','0-1'],
  textinfo: 'text',
  textposition:'inside',
  marker: {colors:[
    'rgb(102, 0, 0)',
    'rgb(127, 64, 63)',
    'rgb(168, 2, 0)',
    'rgb(153, 34, 34)',
    'rgb(242, 122, 121)',
    'rgb(255, 154, 153)',
    'rgb(221, 170, 170)',
    'rgb(255, 204, 204)',
    'rgb(242, 218, 218)',  
    'rgba(255, 255, 255, 0)']},
  labels: ['8-9', '7-8', '6-7', '5-6','4-5', '3-4', '2-3', '1-2','0-1'],
  hoverinfo: 'label',
  hole: .5,
  type: 'pie',
  showlegend: false
}];

var layout = {
  shapes:[{
      type: 'path',
      path: path,
      fillcolor: 'rgb(0, 51, 28)',
      line: {
        color: 'rgb(0, 51, 28)'
      }
    }],
  title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
  height: 500,
  width:500,
  xaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]},
  yaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]}
};

Plotly.newPlot('gauge', data, layout);

});

};