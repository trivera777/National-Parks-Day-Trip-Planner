// user selectes state from drop down
// user clicks submit
// on button click it will take us to the results page
// page will render nation park results
// >> results to display:
// >> >> national park name with image, 3 activies, weather
// link/button to take you back to homepage {{nav bar}}
// added line for merge stuff
//API Keys:
var npsApiKey = 'keUgXA4zA0DCR17ihQfTmtASQqGBGyMJ8Q85tkNc';
var weatherApiKey = 'f6dbccad1096ef580392335246d5632e';
let stateCode = JSON.parse(sessionStorage.getItem('stateCode'));

var renderSearchResults = function (stateCode) {
  var npsApiUrl =
    'https://developer.nps.gov/api/v1/parks?stateCode=' +
    stateCode +
    '&limit=1&api_key=' +
    npsApiKey;

  console.log(npsApiUrl);

  function getApiNps(npsApiUrl) {
    sessionStorage.getItem('stateCode');
    console.log(stateCode);
    console.log('before fetch');
    fetch(npsApiUrl)
      .then(function (response) {
        if (response.status === 200) {
          response.json().then(function (data) {
            console.log(data);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to NSP');
      });
  }

  getApiNps(npsApiUrl);
};
console.log(stateCode);

renderSearchResults(stateCode);
