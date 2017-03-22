var today = new Date();
var h = today.getHours();
var m = today.getMinutes();
var s = today.getSeconds();
var timeFadeInt = 125;

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

  if ($("hour").text() != h) {
    $("hour").fadeOut(timeFadeInt, function() {
      $(this).text(pad(h)).fadeIn(timeFadeInt);
    });
  }
  if ($("min").text() != m) {
    $("min").fadeOut(timeFadeInt, function() {
      $(this).text(pad(m)).fadeIn(timeFadeInt);
    });
  }
  if ($("sec").text() != s) {
    $("sec").fadeOut(timeFadeInt, function() {
      $(this).text(pad(s)).fadeIn(timeFadeInt);
    });
  }
  $("#date").text(fullDate())
}

$(function() {
  $("h").text(pad(h));
  $("m").text(pad(m));
  $("s").text(pad(s));
  $("body.fade").fadeIn(400).removeClass("fade");
  $("#date").text(fullDate())
  setInterval(updateTime, 1000);
});
