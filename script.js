var today = new Date();
var h = today.getHours();
var m = today.getMinutes();
var s = today.getSeconds();
var fonts = ["Raleway", "Roboto", "Teko", "Amatic SC", "Inconsolata"];
var font = 0;

// Fonts

function setFont(fontindex) {
  chrome.storage.sync.set({font: fontindex}, function() {});
  document.body.style = "display: flex; font-family: '" + fonts[fontindex] + "';";
  font = fontindex;
}

chrome.storage.sync.get("font", function(items) {
  if (items[0] == undefined) {
    setFont(0);
    font = 0;
    console.log("undefined!!!!");
  } else {
    font = items[0].font;
    console.log(font)
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

  if ($("hour").text() != h) {
    $("hour").fadeOut(125, function() {
      $(this).text(pad(h)).fadeIn(125);
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
  $("#date").text(fullDate())
}

$(function() {
  $("hour").text(pad(h));
  $("min").text(pad(m));
  $("sec").text(pad(s));
  $("body.fade").fadeIn(400).removeClass("fade");
  $("#date").text(fullDate())
  setInterval(updateTime, 1000);
});
