let searchResults = $('.search-results');

//API Keys:
let npsApiKey = 'keUgXA4zA0DCR17ihQfTmtASQqGBGyMJ8Q85tkNc';
let weatherApiKey = 'f6dbccad1096ef580392335246d5632e';
// Micheal's API - Micheal exceeded the API fetch limit haha
// let weatherApiKey = '55c422bf5964a5456389760079669854';
let stateCode = JSON.parse(sessionStorage.getItem('stateCode'));

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

            let mapCounter = 1;

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
                .attr('style', 'width: 350px; height: auto;')
                .attr('data-lat', latitude)
                .attr('data-long', longitude);

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
              addMap.attr('id', 'map-' + mapCounter).attr('class', 'map');
              mapCounter++;

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

              //added if statement. some Nantional Parks do not have activities listed
              function activityRandomizer() {
                if (activities.length != 0) {
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
                } else {
                  let addActivity = $('<div>');
                  addActivity.attr('class', 'column');
                  addActivity.text(
                    'This park does not have any activity details available.'
                  );
                  addActivity.appendTo(addActivitiesEl);
                }
              }

              activityRandomizer();

              addActivitiesTitle.appendTo(addActivitiesBox);
              addActivitiesEl.appendTo(addActivitiesBox);
              addActivitiesBox.appendTo(addActivitiesWeatherContainer);
              addActivitiesWeatherContainer.appendTo(addStateParkContainer);

              function fiveDayForecast(weatherData) {
                //changed to match class. previouslly set to match ID.
                // let fiveDayHtml = $('.five-day-forcast');
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

                addFiveDayForcast.empty();
                //changed - index previously starting at 1. that started forcast with tomorrow's info.
                for (let i = 0; i < 5; i++) {
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
                  let addDate = $(
                    '<p>' + month + '/' + date + '/' + year + '</p>'
                  );

                  var iconCode = weatherDataFiveDay.weather[0].icon;
                  var iconSource =
                    'https://openweathermap.org/img/w/' + iconCode + '.png';
                  const addIcon = $('<img src="' + iconSource + '"></img>');
                  const addTemp = $(
                    '<p>Temperature: ' + weatherDataFiveDay.temp.day + ' °F</p>'
                  );
                  const addWind = $(
                    '<p>Wind: ' + weatherDataFiveDay.wind_speed + ' MPH</p>'
                  );
                  const addHumidity = $(
                    '<p>Humidity: ' + weatherDataFiveDay.humidity + '%</p>'
                  );

                  addDate.appendTo(addDivWeather);
                  addIcon.appendTo(addDivWeather);
                  addTemp.appendTo(addDivWeather);
                  addWind.appendTo(addDivWeather);
                  addHumidity.appendTo(addDivWeather);
                  addDivWeather.appendTo(addFiveDayForcast);
                }
              }

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
                    });
                    0;
                  }
                });
              }
              getApiWeather();

              let map;
            });
            $('.state-park-box').each(function () {
              let mapId = $(this).children('.map').attr('id');

              let mapLat = $(this).attr('data-lat');
              let mapLong = $(this).attr('data-long');

              initMap(mapLat, mapLong, mapId);
            });
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to NSP');
      });
  }

  let initMap = function (lat, long, id) {
    map = new google.maps.Map(document.getElementById(id), {
      center: {
        lat: parseFloat(lat),
        lng: parseFloat(long),
      },
      zoom: 8,
    });
  };

  getApiNps(npsApiUrl);
};

renderSearchResults(stateCode);
