function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  var url = `/metadata/${sample}`; 
  // Use `d3.json` to fetch the metadata for a sample
  d3.json(url).then(function(samplemetadata)
      {
        // Use d3 to select the panel with id of `#sample-metadata`
        var metadatadiv = d3.select("#sample-metadata") ;
        // Use `.html("") to clear any existing metadata
        metadatadiv.html("");
               
        // Use `Object.entries` to add each key and value pair to the panel
       var table = metadatadiv.append("table");
       var tbody = table.append("tbody");
        Object.entries(samplemetadata).forEach(([key, value]) => {

          tbody.append("tr")
          .html(`<td>${key.toUpperCase()}</td>||<td>${value}</td>`)
          
        });

      });  
    
    // BONUS: Build the Gauge Chart
    buildGauge(sample);
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

  // @TODO: Build a Bubble Chart using the sample data
   var url = `/samples/${sample}`;
  //  

    d3.json(url).then(function(sampledata)
      {
        var otu_ids = sampledata.otu_ids;
        var otu_labels = sampledata.otu_labels;
        var sample_values = sampledata.sample_values;


        var trace1 = {
          x: otu_ids,
          y: sample_values,
          mode: 'markers',
          text:otu_labels,
          marker: { color: otu_ids,
                    size: sample_values
                  }
        };
        
        var data = [trace1];
        
        var layout = {
                      title: '<b> Bubble Chart(otu_ids Vs sample_values) </b>' + '<br>'+ 'Selected sample :' + sample ,
                      showlegend: false
                    };
        
        Plotly.newPlot('bubble', data, layout);   
  
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).

    var toptensamples = sample_values.slice(0,10);
    var toptenotu_ids = otu_ids.slice(0,10);
    var toptenlabels = otu_labels.slice(0,10);

    var data = [{
      values: toptensamples,
      labels: toptenotu_ids,
      type: 'pie', 
      grid: {rows: 1, columns: 2},
      hoverinfo : toptenlabels,
      showlegend: true,
      marker: {
        colors: ['rgb(102, 0, 0)',
        'rgb(127, 64, 63)',
        'rgb(168, 2, 0)',
        'rgb(153, 34, 34)',
        'rgb(242, 122, 121)',
        'rgb(255, 154, 153)',
        'rgb(221, 170, 170)',
        'rgb(255, 204, 204)',
        'rgb(242, 218, 218)',  
        'rgb(216, 176, 173)']
      }
    }];
    
    var layout = {
      height: 600,
      width: 500,
      title: '<b> Pie Chart (Top ten sample values)</b>' + '<br>' + 'Selected sample: '+ sample ,
    };
    
    Plotly.newPlot('pie', data, layout);
   
  });
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  var newSample = d3.select("#selDataset").node().value;
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
