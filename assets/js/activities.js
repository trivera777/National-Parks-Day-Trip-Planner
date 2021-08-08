let searchResults = $('.search-results');

//API Keys:
let npsApiKey = 'keUgXA4zA0DCR17ihQfTmtASQqGBGyMJ8Q85tkNc';
let weatherApiKey = 'f6dbccad1096ef580392335246d5632e';
let stateCode = JSON.parse(sessionStorage.getItem('stateCode'));

function fiveDayForecast(weatherData) {
  //changed to match class. previouslly set to match ID.
  let fiveDayHtml = $('.five-day-forcast');
  fiveDayHtml.empty();

  for (let i = 1; i < 6; i++) {
    let weatherDataFiveDay = weatherData.daily[i];
    const addDivWeather = $('<div>');
    addDivWeather.addClass('five-day-cards');

    let dateCode = new Date(weatherDataFiveDay.dt * 1000);
    let months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    let month = months[dateCode.getMonth()];
    let date = dateCode.getDate();
    let year = dateCode.getFullYear();
    let addDate = $('<p>' + month + '/' + date + '/' + year + '</p>');

    var iconCode = weatherDataFiveDay.weather[0].icon;
    var iconSource = 'https://openweathermap.org/img/w/' + iconCode + '.png';
    const addIcon = $('<img src="' + iconSource + '"></img>');
    const addTemp = $(
      '<p>Temperature: ' + weatherDataFiveDay.temp.day + ' °F</p>'
    );
    const addWind = $('<p>Wind: ' + weatherDataFiveDay.wind_speed + ' MPH</p>');
    const addHumidity = $(
      '<p>Humidity: ' + weatherDataFiveDay.humidity + '%</p>'
    );

    addDate.appendTo(addDivWeather);
    addIcon.appendTo(addDivWeather);
    addTemp.appendTo(addDivWeather);
    addWind.appendTo(addDivWeather);
    addHumidity.appendTo(addDivWeather);
    addDivWeather.appendTo(fiveDayHtml);
  }
}

let renderSearchResults = function (stateCode) {
  let npsApiUrl =
    'https://developer.nps.gov/api/v1/parks?stateCode=' +
    stateCode +
    //changed to display 5 results to the ID.
    '&limit=5&api_key=' +
    npsApiKey;

  function getApiNps(npsApiUrl) {
    sessionStorage.getItem('stateCode');
    fetch(npsApiUrl)
      .then(function (response) {
        if (response.status === 200) {
          response.json().then(function (parkData) {
            let parksArray = parkData.data;
            console.log(parksArray);

            parksArray.forEach((element) => {
              let latitude = element.latitude;
              let longitude = element.longitude;
              let activities = element.activities;

              let addStateParkContainer = $('<div>');
              addStateParkContainer.attr(
                'class',
                'columns state-park-container'
              );

              let addStateParkInfo = $('<div>');
              addStateParkInfo.attr(
                'class',
                'column is-narrow state-park-info'
              );

              let addStateParkBox = $('<div>');
              addStateParkBox
                .attr('class', 'box state-park-box')
                .attr('style', 'width: 350px; height: auto;');

              let addStateParkName = $('<div>');
              addStateParkName
                .attr('class', 'state-title state-park-name')
                .text(element.fullName);

              let addPic = $('<img>');
              addPic
                .attr('class', 'pic')
                .attr('src', element.images[0].url)
                .attr('alt', element.images[0].caption);

              let addMap = $('<div>');
              addMap.attr('id', 'map').attr('class', 'map');

              addStateParkName.appendTo(addStateParkBox);
              addPic.appendTo(addStateParkBox);
              addMap.appendTo(addStateParkBox);
              addStateParkBox.appendTo(addStateParkInfo);
              addStateParkInfo.appendTo(addStateParkContainer);
              addStateParkContainer.appendTo(searchResults);

              let addActivitiesWeatherContainer = $('<div>');
              addActivitiesWeatherContainer.attr(
                'class',
                'column activites-weather-container'
              );

              let addActivitiesBox = $('<div>');
              addActivitiesBox
                .attr('class', 'box activities-box')
                .attr('style', 'width: 1350px; height: 170px;');

              let addActivitiesTitle = $('<div>');
              addActivitiesTitle
                .attr('class', 'title activities-title')
                .text('Activities');

              let addActivitiesEl = $('<div>');
              addActivitiesEl
                .attr('class', 'columns activities')
                .attr('id', 'activities')
                .attr('style', 'font-size: 25px;');

              function activityRandomizer() {
                for (let i = 0; i < 3; i++) {
                  let randomNumber = Math.floor(
                    Math.random() * activities.length
                  );
                  let randomActivity = activities[randomNumber];
                  activities.splice(randomNumber, 1);
                  let addActivity = $('<div>');
                  addActivity.attr('class', 'column');
                  addActivity.text(randomActivity.name);
                  addActivity.appendTo(addActivitiesEl);
                }
              }

              activityRandomizer();

              addActivitiesTitle.appendTo(addActivitiesBox);
              addActivitiesEl.appendTo(addActivitiesBox);
              addActivitiesBox.appendTo(addActivitiesWeatherContainer);
              addActivitiesWeatherContainer.appendTo(addStateParkContainer);

              addWeatherContainer = $('<div>');
              addWeatherContainer
                .attr('id', 'weather')
                .attr('class', 'weather-container')
                .attr('style', 'width: 1350px;');

              addWeatherBox = $('<div>');
              addWeatherBox
                .attr('class', 'box weather-box')
                .attr('style', 'height: 320px;');

              addWeatherTitle = $('<div>');
              addWeatherTitle
                .attr('class', 'title weather-title')
                .text('Weather');

              addFiveDayForcast = $('<div>');
              addFiveDayForcast
                .attr('id', 'five-day-html')
                .attr('class', 'five-day-forcast');

              addWeatherTitle.appendTo(addWeatherBox);
              addFiveDayForcast.appendTo(addWeatherBox);
              addWeatherBox.appendTo(addWeatherContainer);
              addWeatherContainer.appendTo(addActivitiesWeatherContainer);

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
                      fiveDayForecast(weatherData);
                      // displayWeatherData(weatherData); need to add function to display weather data to webpage
                      console.log(weatherData);
                    });
                    0;
                  }
                });
              }
              getApiWeather();

              let map;
              initMap = function () {
                map = new google.maps.Map(document.getElementById('map'), {
                  center: {
                    lat: parseFloat(latitude),
                    lng: parseFloat(longitude),
                  },
                  zoom: 8,
                });
              };
              initMap();
            });

            //this part works!! Don't break this Michael!!
            // let latitude = parkData.data[0].latitude;
            // let longitude = parkData.data[0].longitude;
            // let activities = parkData.data[0].activities;

            // stateParkName.text(parkData.data[0].fullName);
            // picEl
            //   .attr('src', parkData.data[0].images[0].url)
            //   .attr('alt', parkData.data[0].images[0].caption);
            // activity1El.text(parkData.data[0].activities[0].name);
            // activity2El.text(parkData.data[0].activities[1].name);
            // activity3El.text(parkData.data[0].activities[2].name);

            //function to pull random activities. still need to figure out how to get random activites on page. thinking we need to create the activity divs within this function and render those to the page.
            // function activityRandomizer() {
            //   for (let i = 0; i < 3; i++) {
            //     let randomNumber = Math.floor(
            //       Math.random() * activities.length
            //     );
            //     let randomActivity = activities[randomNumber];
            //     activities.splice(randomNumber, 1);
            //     console.log(randomActivity.name);
            //     // create divs to display on page
            //     let addActivity = $('<div>');
            //     addActivity.attr('class', 'column');
            //     addActivity.text(randomActivity.name);
            //     addActivity.appendTo(addActivitiesEl);
            //   }
            // }

            // activityRandomizer();

            // function getApiWeather() {
            //   let weatherUrlQuery =
            //     'https://api.openweathermap.org/data/2.5/onecall?lat=' +
            //     latitude +
            //     '&lon=' +
            //     longitude +
            //     '&units=imperial' +
            //     '&APPID=' +
            //     weatherApiKey;

            //   fetch(weatherUrlQuery).then(function (response) {
            //     if (response.status === 404) {
            //       console.log('404 Error');
            //       return;
            //     } else {
            //       response.json().then(function (weatherData) {
            //         fiveDayForecast(weatherData);
            //         // displayWeatherData(weatherData); need to add function to display weather data to webpage
            //         console.log(weatherData);
            //       });
            //       0;
            //     }
            //   });
            // }
            // getApiWeather();
            // let map;
            // initMap = function () {
            //   map = new google.maps.Map(document.getElementById('map'), {
            //     center: {
            //       lat: parseFloat(latitude),
            //       lng: parseFloat(longitude),
            //     },
            //     zoom: 8,
            //   });
            // };
            // initMap();
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
