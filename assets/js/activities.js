// user selectes state from drop down
// user clicks submit
// on button click it will take us to the results page
// page will render nation park results
// >> results to display:
// >> >> national park name with image, 3 activies, weather
// link/button to take you back to homepage {{nav bar}}
// added line for merge stuff

//API Keys:
let npsApiKey = 'keUgXA4zA0DCR17ihQfTmtASQqGBGyMJ8Q85tkNc';
let weatherApiKey = 'f6dbccad1096ef580392335246d5632e';
let stateCode = JSON.parse(sessionStorage.getItem('stateCode'));

let renderSearchResults = function (stateCode) {
  let npsApiUrl =
    'https://developer.nps.gov/api/v1/parks?stateCode=' +
    stateCode +
    '&limit=1&api_key=' +
    npsApiKey;

  function getApiNps(npsApiUrl) {
    sessionStorage.getItem('stateCode');
    fetch(npsApiUrl)
      .then(function (response) {
        if (response.status === 200) {
          response.json().then(function (data) {
            console.log(data);
            let latitude = data.data[0].latitude;
            let longitude = data.data[0].longitude;
            let activities = data.data[0].activities;
            function getApiWeather() {
              let weatherUrlQuery =
                'https://api.openweathermap.org/data/2.5/onecall?lat=' +
                latitude +
                '&lon=' +
                longitude +
                '&units=imperial' +
                '&APPID=' +
                weatherApiKey;

              fetch(weatherUrlQuery).then(function (response) {
                if (response.status === 404) {
                  console.log('404 Error');
                  return;
                } else {
                  response.json().then(function (weatherData) {
                    // displayWeatherData(weatherData); need to add function to display weather data to webpage
                    console.log(weatherData);
                  });
                  0;
                }
              });
            }
            getApiWeather();
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

renderSearchResults(stateCode);