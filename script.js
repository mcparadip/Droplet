var today = new Date();
var h = today.getHours();
var m = today.getMinutes();
var s = today.getSeconds();
var ampm = (h >= 12) ? "PM" : "AM";
var fonts = ["Amatic SC", "Raleway", "Bebas Neue", "Exo", "Josefin Sans"];
var font = 0;

// Load Background

if (navigator.onLine == false) {
  $("#bg").attr("src", "images/" + (Math.floor(Math.random() * 20)+1) + ".jpg");
}

// Fonts

function setFont(fontindex) {
  chrome.storage.sync.set({"font": fontindex}, function() {});
  document.body.style = "display: flex; font-family: '" + fonts[fontindex] + "';";
  font = fontindex;
}

chrome.storage.sync.get("font", function(items) {
  if (items.font == undefined) {
    setFont(0);
    font = 0;
  } else {
    font = items.font;
    setFont(font);
  }
});

$("body").dblclick(function() {
  newfont = font + 1
  if (newfont == fonts.length) {
    newfont = 0;
  }
  setFont(newfont)
});

// Other stuff

function pad(num) {
  var s = "0" + num;
  return s.substr(s.length-2);
}

function fullDate() {
  var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  return dayNames[today.getDay()] + ', ' + monthNames[today.getMonth()] + ' ' + today.getDate() + ', ' + today.getFullYear();
}

function updateTime() {
  today = new Date();
  h = today.getHours();
  m = today.getMinutes();
  s = today.getSeconds();
  ampm = (h >= 12) ? "PM" : "AM";

  if ($("hour").text() != h) {
    $("hour").fadeOut(125, function() {
      $(this).text(pad(h%12)).fadeIn(125);
    });
  }
  if ($("min").text() != m) {
    $("min").fadeOut(125, function() {
      $(this).text(pad(m)).fadeIn(125);
    });
  }
  if ($("sec").text() != s) {
    $("sec").fadeOut(125, function() {
      $(this).text(pad(s)).fadeIn(125);
    });
  }
  if ($("ampm").text() != ampm) {
    $("ampm").fadeOut(125, function() {
      $(this).text(ampm).fadeIn(125);
    });
  }
  $("#date").text(fullDate());
}

$(document).ready(function() {
  $("hour").text(pad(h));
  $("min").text(pad(m));
  $("sec").text(pad(s));
  $("ampm").text(ampm);
  $("#date").text(fullDate())
  setInterval(updateTime, 1000);
});

$("img#bg").on("load", function() {
  $("html.fade").fadeIn(250).removeClass("fade");
});
