var loggedinUser;

function greetMe() {

    // get a random quote http://itscstaging.cech.uc.edu:8000/random
    $.getJSON('http://itscstaging.cech.uc.edu:8000/random', function (data) {
        console.log(data);
        $('#status').text(data.text);
    })

    // hide prompt and box & show everything else
    $('#username').hide();
    $('#user-name-input').hide();
    $('#prompt').hide();
    $('#refresh').show();
    $('#the-greeting').show();
    $('#quote').show();
    $('#weather-title').show();
    $('#weather-data').show();
    $('#addquote-button-div').show();
    $('#buttons').show();
    // greet user based on time
    //var userName = $('#user-name-input').val();
    var userName = loggedinUser.firstName;
    console.log(userName);
    var date = new Date();
    var hours = date.getHours();

    if (hours < 12) {
        $('#greeting').text("Good morning, " + userName + "!");
    } else if (hours >= 12 && hours <= 18) {
        $('#greeting').text("Good afternoon, " + userName + "!");
    } else {
        $('#greeting').text("Good evening, " + userName + "!");
    }

}

function populateDB() {

    var db = openDatabase('mydb', '1.0', 'Greetings DB', 2 * 1024 * 1024);   // 2 MB
    var msg;

    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS MSGS (id unique, msg)');
        tx.executeSql('INSERT INTO MSGS (id, msg) VALUES (1, "Each night, when I go to sleep, I die. And the next morning, when I wake up, I am reborn.")');
        tx.executeSql('INSERT INTO MSGS (id, msg) VALUES (2, "Don\'t judge each day by the harvest you reap but by the seeds that you plant.")');  
        tx.executeSql('INSERT INTO MSGS (id, msg) VALUES (3, "Those who dream by day are cognizant of many things which escape those who dream only by night.")');
        tx.executeSql('INSERT INTO MSGS (id, msg) VALUES (4, "The two most important days in your life are the day you are born and the day you find out why.")');
        tx.executeSql('INSERT INTO MSGS (id, msg) VALUES (5, "It was the possibility of darkness that made the day seem so bright.")');
        tx.executeSql('INSERT INTO MSGS (id, msg) VALUES (6, "Even five minutes of your time can make someone\'s day.")');
        tx.executeSql('INSERT INTO MSGS (id, msg) VALUES (7, "In all of your living, don\'t forget to live.")');
        tx.executeSql('INSERT INTO MSGS (id, msg) VALUES (8, "I look upon every day to be lost in which I do not make a new acquaintance.")');
        tx.executeSql('INSERT INTO MSGS (id, msg) VALUES (9, "Man can destroy a mountain within a day, but a Man cannot build a mountain in a single day or the rest of his days.")');
    });

    return db;
}

var OpenWeatherAppKey = "9e1a40e814e616668618942da860ca2e";

function showWeatherData(results) {

    if (results.weather.length) {

        $('#error-msg').hide();
        $('#weather-data').show();

        $('#title').text(results.name);
        $('#temperature').text(results.main.temp);
        $('#wind').text(results.wind.speed);
        $('#humidity').text(results.main.humidity);
        $('#visibility').text(results.weather[0].main);

        var sunriseDate = new Date(results.sys.sunrise * 1000);
        $('#sunrise').text(sunriseDate.toLocaleTimeString());

        var sunsetDate = new Date(results.sys.sunset * 1000);
        $('#sunset').text(sunsetDate.toLocaleTimeString());
        if (results.main.temp >= 60) {
            $('#advice').text("It's a bit hot today! Make sure to put on light clothes. :)");
        }
        else if (results.main.temp <= 30) {
            $('#advice').text("It's kind of chilly! Bring on your layers.");
        }

    } else {
        $('#weather-data').hide();
        $('#error-msg').show();
        $('#error-msg').text("Error retrieving data. ");
    }
}

function getWeatherWithGeoLocation() {
    navigator.geolocation.getCurrentPosition(onGetLocationSuccess, onGetLocationError, { enableHighAccuracy: true });
   // $('#error-msg').show();
   // $('#error-msg').text('Determining your current location ...');
  //  $('#get-weather-btn').prop('disabled', true);
}

function onGetLocationSuccess(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var queryString = 'http://api.openweathermap.org/data/2.5/weather?lat='
      + latitude + '&lon=' + longitude + '&appid=' + OpenWeatherAppKey + '&units=imperial';

   // $('#get-weather-btn').prop('disabled', false);
    $.getJSON(queryString, function (results) {
        showWeatherData(results);
    }).fail(function (jqXHR) {
        $('#error-msg').show();
        $('#error-msg').text("Error retrieving data. " + jqXHR.statusText);
    });
}

function onGetLocationError(error) {
    $('#error-msg').text('Error getting location');
    $('#get-weather-btn').prop('disabled', false);
}

function refreshPage() {
   // $('#prompt').show();
 //   $('#username').show();
    // $('#user-name-input').show();
    greetMe();
   // $('#weather-data').show();
    $('#the-greeting').show();
    $('#buttons').show();
    $('#quote').show();
    $('#refresh').show();
    $('#weather-title').show();
   // $('#addquote-button-div').hide();
}

function addQuoteForm() {
    $('#addquote-form-div').show();

    $('#username').hide();
    $('#buttons').hide();
    $('#user-name-input').hide();
    $('#weather-data').hide();
    $('#the-greeting').hide();
    $('#quote').hide();
    $('#refresh').hide();
    $('#weather-title').hide();
    $('#buttons').hide();
    $('#back-button').show();
    $('#allquote-form-div').hide();
    $('#dltquote-form-div').hide();

}

function addQuoteButton() {

    console.log("anybody here?");
    var term = $('#quote-input').val();
    console.log(term);
    var url = "http://itscstaging.cech.uc.edu:8000/add";
    console.log("anybody here 2?");

    // Send the data using post
    var posting = $.post(url, { quotetext: term });
    console.log(posting);
    $('#success-msg').show();
    $('#success-msg').text("Quote successfully added");
    

}

function dltQuoteButton() {
    var term = $('#dltquote').val();
    var url = "http://itscstaging.cech.uc.edu:8000/delete";

    // Send the data using post
    var posting = $.post(url, { id: term });
    console.log(posting);
    $('#sucess-msg2').show();
    $('#success-msg2').text("Quote successfully deleted");

}

function dltQuoteForm() {
    $('#dltquote-form-div').show();

    $('#username').hide();
    $('#buttons').hide();
    $('#user-name-input').hide();
    $('#weather-data').hide();
    $('#the-greeting').hide();
    $('#quote').hide();
    $('#refresh').hide();
    $('#weather-title').hide();
    $('#buttons').hide();
    $('#back-button').show();
    $('#addquote-form-div').hide();
    $('#allquote-form-div').show();

}

function allQuotes() {
    $('#allquote-form-div').show();
    console.log("anybody here?");
    $.getJSON('http://itscstaging.cech.uc.edu:8000/all', function (data) {
        console.log(data);
        $('#status').text(data.text);
        for (var key in data) {
            //var item = data[key];
          //  for (var key2 in item) {
                console.log("Hi " + data[key].text);
                //alert(item[key2].text); // append item[key2].text
                $('#allquotes').append('<li>' + data[key].id + ": " + data[key].text + '</li>');
            }
       // }
    })

    $('#username').hide();
    $('#buttons').hide();
    $('#user-name-input').hide();
    $('#weather-data').hide();
    $('#the-greeting').hide();
    $('#quote').hide();
    $('#refresh').hide();
    $('#weather-title').hide();
    $('#buttons').hide();
    $('#back-button').show();
    $('#addquote-form-div').hide();
    $('#dltquote-form-div').hide();

}

function login() {
    var uname = $('#username').val();
    var pw = $('#password').val();
    var url = "http://itscstaging.cech.uc.edu:8000/login";

    // Send the data using post
    var valid;
    $.post(url, { username: uname, password: pw }, function (data) {
        console.log(data[1]);
        if (data[0].status === 200) {
            loggedinUser = data[1];
            console.log(loggedinUser.firstName + "has logged in");
            home();
        }
        else
            $('#loginerror').text("invalid username or password");
    }, 'json');
  
  //  console.log(posting);
    //console.log(posting["status"]);
    /*if (posting.status === "200") console.log("yay");
    else if (posting.status === 404) console.log("invalid username or pw");
*/
}

function back() {
    $('#username').hide();
    $('#user-name-input').hide();
    $('#refresh').show();
    $('#the-greeting').show();
    $('#quote').show();
    $('#weather-title').show();
    $('#weather-data').show();
    $('#buttons').show();
    $('#addquote-form-div').hide();
    $('#allquote-form-div').hide();
    $('#dltquote-form-div').hide();
    $('#back-button').hide();
    $("#allquotes").empty();
    $("#success-msg").empty();
    $("#success-msg2").empty();
}

function home() {
    $('#login').hide();
    $('#signup-form').hide();
    getWeatherWithGeoLocation();
    refreshPage();
}

function signupForm() {
    $('#signup-form').show();
    $('#login').hide();
}

function signupButton() {
    console.log("are we here? - signal");
    var fname = $('#firstname').val();
    var lname = $('#lastname').val();
    var email = $('#email').val();
    var uname = $('#newusername').val();
    var pw = $('#newpassword').val();
    
    var url = "http://itscstaging.cech.uc.edu:8000/signup";

    // Send the data using post
    var posting = $.post(url, { firstname: fname, lastname: lname, email: email, username: uname, password: pw}, 
    function (data) {
        console.log(data);
        console.log(data.userID);
        console.log("fe haga?");
        if (data.userID) {
            loggedinUser = data;
            console.log("successfully signed up");
            home();
        }
        else
            $('#signup-msg').text("username is already taken");
    }, 'json');

}
