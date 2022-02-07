import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// Business Logic

function checkNumber(number) {
  if (isNaN(number) || number < 0) {
    return new Error("Not a valid number!");
  } else {
    return true;
  }
}



// User Interface Logic

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");

    let request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
    }

  });
  
  $('#submittedNumber').click(function() {
    const inputtedNumber = parseInt($('#number').val());
    $('#number').val("");

    try {
      const isNumberValid = checkNumber(inputtedNumber);
      if (isNumberValid instanceof Error) {
        console.error(isNumberValid.message);
        throw RangeError("Not a valid number!");
      } else {
        console.log("Try was successful, so no need to catch!");
        $('#displayNumber').text("This number is valid. You may continue.");
      }
    } catch(error) {
      console.error(`Red alert! We have an error: ${error.message}`);
    }
  });
});
