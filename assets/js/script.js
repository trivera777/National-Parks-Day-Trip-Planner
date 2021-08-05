// user selectes state from drop down
// user clicks submit
// on button click it will take us to the results page
// page will render nation park results
// >> results to display:
// >> >> national park name with image, 3 activies, weather
// link/button to take you back to homepage {{nav bar}}
// added line for merge stuff

// create varible that matches with button >> verify botton tags
var searchBtn = $(".search-button");
// create varible that matches with state >> verify botton tags
var selectedState = document.querySelector('.state');
let redirectUrl = "./activities.html"
let stateCode = "";

//API Keys:
var npsApiKey = "keUgXA4zA0DCR17ihQfTmtASQqGBGyMJ8Q85tkNc";
var weatherApiKey = "f6dbccad1096ef580392335246d5632e";
var renderSearchResults = function (event) {
  //will need to come back to this to determine if we need state code or if we can use fill state name
  //limit is currently set to 50. we will want to discuess how many results we want it to return on search
  //adding another line for testing
  var npsApiUrl =
    'https://developer.nps.gov/api/v1/parks?stateCode=' +
    stateCode +
    '&limit=50&api_key=' +
    npsApiKey;
};

searchBtn.click(function(event){
  event.preventDefault();
  stateCode = $(".state-selection").find("option:selected").data("state")
  console.log(stateCode);
  sessionStorage.setItem("stateCode", stateCode)
  window.location.href = redirectUrl

});

