// user selectes state from drop down
// user clicks submit
// on button click it will take us to the results page
// page will render nation park results
// >> results to display:
// >> >> national park name with image, 3 activies, weather
// link/button to take you back to homepage {{nav bar}}
// added line for merge stuff

//variables
let stateParkName = $('#state-park-name');
let picEl = $('#pic');
let activity1El = $('#activity1');
let activity2El = $('#activity2');
let activity3El = $('#activity3');

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
          response.json().then(function (parkData) {
            console.log(parkData);
            let latitude = parkData.data[0].latitude;
            let longitude = parkData.data[0].longitude;
            let activities = parkData.data[0].activities;

            stateParkName.text(parkData.data[0].fullName);
            picEl
              .attr('src', parkData.data[0].images[0].url)
              .attr('alt', parkData.data[0].images[0].caption);
            activity1El.text(parkData.data[0].activities[0].name);
            activity2El.text(parkData.data[0].activities[1].name);
            activity3El.text(parkData.data[0].activities[2].name);

            //function to pull random activities. still need to figure out how to get random activites on page. thinking we need to create the activity divs within this function and render those to the page.
            function activityRandomizer() {
              for (let i = 0; i < 3; i++) {
                let randomNumber = Math.floor(
                  Math.random() * activities.length
                );
                let randomActivity = activities[randomNumber];
                activities.splice(randomNumber, 1);
                console.log(randomActivity.name);
                // create divs to display on page
              }
            }

            activityRandomizer();

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
