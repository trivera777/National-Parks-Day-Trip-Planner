let searchBtn = $('.search-button');

let redirectUrl = './activities.html';
let stateCode = '';

searchBtn.click(function (event) {
  event.preventDefault();
  stateCode = $('.state-selection').find('option:selected').data('state');
  console.log(stateCode);
  sessionStorage.setItem('stateCode', JSON.stringify(stateCode));
  window.location.href = redirectUrl;
});
