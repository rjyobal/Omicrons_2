//Check if JS is properly connected
console.log('Ok connected - app.js');
//Get jsonData
var jsonData = '/api/v1.0/teams';
var jsonPlotData = '/static/js/plot.json';

/**
 * Execute init functions
 */
function init(){
    fillDropdown();
}

/**
 * Get Team Names from JSON to fillout dropdown
 */
function fillDropdown(){
    d3.json(jsonData).then((data) => {
        let teams = data.data[0];
        console.log(teams)
        //Add options to dropdown
        d3.select("#selDataset").append("option").text('-Select Team-')
        for(x in teams){
            d3.select("#selDataset").append("option").text(teams[x].FullName);
            //console.log(teams[x].FullName)
        }
    });
}

/**
 * Get URL from JSON and dispplay in dashboard
 * @param {string} selectedTeam Team selected in dropdown
 */
function optionChanged(selectedTeam){
    console.log(`Selected Team: ${selectedTeam}`)
    plotdata(selectedTeam);
    d3.json(jsonData).then((data) => {
        let teams = data.data[0];
        //Display image
        for(x in teams){
            //console.log(teams[x].Logo)
            if(selectedTeam==teams[x].FullName){
                //console.log(teams[x].Logo)
                d3.select('#logo').attr('src',teams[x].WikipediaLogoUrl)
            }
        }
    });
}

/**
 * Plot data based on 
 * @param {string} selectedTeam Team selected in dropdown
 */
function plotdata(selectedTeam){
    d3.json(jsonPlotData).then((data) => {
        let teamsstats = data;
        for(x in teamsstats){
            if(selectedTeam==teamsstats[x].FullName){
                let x_values = ['Passing Yds Per Game','Passing Yds','Rushing Yards Per Game','Rush Yds','Total Yds','Yard Per Game']
                let y_values = [teamsstats[x].PYdsG,teamsstats[x].PassYds,teamsstats[x].RYdsG,teamsstats[x].RushYds,teamsstats[x].TotYds,teamsstats[x].YdsG]
                //let y_values = [15,12,34,12,42,12]
                let data = [
                    {
                      x: x_values,
                      y: y_values,
                      type: 'bar',
                      marker:{color: ['#4472C4','#ED7D31','#A5A5A5','#FFC000','#5B9BD5','#70AD47']}
                    }
                  ];
                let layout = {
                    yaxis: {range: [0, 7000]},
                    title: {
                        text:'2020 NFL Team Offense Statistics',
                        font: {size: 24}
                    },
                    images: [
                        {
                          "source": "https://upload.wikimedia.org/wikipedia/commons/2/2d/American_football_icon_simple_flat.svg",
                          "xref": "x",
                          "yref": "y",
                          "x": 0, //Start on x from chart
                          "y": 7000, //Start on y from chart
                          "sizex": 0.8,
                          "sizey": 2000, //Size based on the y scale
                          "sizing": "stretch",
                          "opacity": 0.5,
                          "layer": "below"
                        }
                      ]
                };
                Plotly.newPlot('plot', data, layout);
            }
        }
    });
}

//Execute init fuctions
init();

