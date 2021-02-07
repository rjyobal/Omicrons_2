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
                let views_data = [
                    {
                      x: x_values,
                      y: y_values,
                      type: 'bar'
                    }
                  ];
                let layout = {
                    yaxis: {range: [0, 7000]}
                };
                Plotly.newPlot('plot', views_data, layout);
            }
        }
    });
}

//Execute init fuctions
init();

