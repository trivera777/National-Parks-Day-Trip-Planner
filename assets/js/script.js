// user selectes state from drop down
// user clicks submit
// on button click it will take us to the results page
// page will render nation park results
// >> results to display:
// >> >> national park name with image, 3 activies, weather
// link/button to take you back to homepage {{nav bar}}
// added line for merge stuff -- adding to revert change 

// create varible that matches with button >> verify botton tags
var searchBtn = document.querySelector('.btn');
// create varible that matches with state >> verify botton tags
var selectedState = document.querySelector('.state')

//API Keys:
var npsApiKey = keUgXA4zA0DCR17ihQfTmtASQqGBGyMJ8Q85tkNc;
var weatherApiKey = f6dbccad1096ef580392335246d5632e;

var renderSearchResults = function (event) {

    var npsApiUrl = 
};

searchBtn.addEventListener('click', renderSearchResults);
