"use strict";

var weatherReport;
var httpRequest = new XMLHttpRequest();

function getWeather() {
  var location = "Tokyo,jp"
  httpRequest.open("get", "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=metric&APPID=24adfe9cde53183445762a65b24cf065");
  httpRequest.send(null);
  httpRequest.onreadystatechange = fillWeather;
}

function fillWeather() {
  if (httpRequest.readyState == 4 && httpRequest.status == 200) {
    weatherReport = JSON.parse(httpRequest.responseText);
    document.getElementById("location").innerHTML = weatherReport.name + ", " + weatherReport.sys.country;
    document.getElementById("icon").src = "http://openweathermap.org/img/w/" + weatherReport.weather[0].icon + ".png";
    document.getElementById("hi-temp").innerHTML += "Hi: " + weatherReport.main.temp_max + "&deg; F";
    document.getElementById("low-temp").innerHTML += "Low: " + weatherReport.main.temp_min + "&deg; F";
    document.getElementById("description").innerHTML += weatherReport.weather[0].description;
  }
}

if (window.addEventListener) {
  window.addEventListener("load", getWeather, false);
} else if (window.attachEvent) {
  window.attachEvent("onload", getWeather);
}
