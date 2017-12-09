var today = {};
var upcoming = {};
var late = {};

function loadData() {
  if (window.localStorage.getItem("today") === null) {
    window.localStorage.setItem("today", JSON.stringify(today));
    today = JSON.parse(window.localStorage.getItem('today'));
  }else{
    today = JSON.parse(window.localStorage.getItem('today'));
    }
    if (window.localStorage.getItem("upcoming") === null) {
      window.localStorage.setItem("upcoming", JSON.stringify(upcoming));
      upcoming = JSON.parse(window.localStorage.getItem('upcoming'));
    }else{
      upcoming = JSON.parse(window.localStorage.getItem('upcoming'));
    }
    if (window.localStorage.getItem("late") === null) {
      window.localStorage.setItem("late", JSON.stringify(late));
      late = JSON.parse(window.localStorage.getItem('late'));
    }else{
      late = JSON.parse(window.localStorage.getItem('late'));
    }
}

function init() {

  if (window.localStorage.getItem("today") === null) {
    window.localStorage.setItem("today", JSON.stringify(today));
    today = JSON.parse(window.localStorage.getItem('today'));
  }else{
    today = JSON.parse(window.localStorage.getItem('today'));
    for (var key in today) {
        if (today.hasOwnProperty(key)) loadToday(today[key]);
    }
  }
  if (window.localStorage.getItem("upcoming") === null) {
    window.localStorage.setItem("upcoming", JSON.stringify(upcoming));
    upcoming = JSON.parse(window.localStorage.getItem('upcoming'));
  }else{
    upcoming = JSON.parse(window.localStorage.getItem('upcoming'));
    for (var key in upcoming) {
        if (upcoming.hasOwnProperty(key)) loadUpcoming(upcoming[key]);
    }

  }
  if (window.localStorage.getItem("late") === null) {
    window.localStorage.setItem("late", JSON.stringify(late));
    late = JSON.parse(window.localStorage.getItem('late'));
  }else{
    late = JSON.parse(window.localStorage.getItem('late'));
    for (var key in late) {
        if (late.hasOwnProperty(key)) loadLate(late[key]);
    }
  }
}

function reloadChart() {
  window.myPie.destroy();
  var tR = Object.keys(today).length;
  var uR = Object.keys(upcoming).length;
  var lR = Object.keys(late).length;
  var configReload = {
    type: 'pie',
    data: {
      datasets: [{
        data: [tR, uR, lR],
        backgroundColor: [
          window.chartColors.blue,
          window.chartColors.orange,
          window.chartColors.red,
        ],
      }],
      labels: [
        "Today",
        "Upcoming",
        "Late"
      ]
    },
    options: {
      responsive: true,
      legend: {
        display: true,
        labels: {
          padding: 20
        },
      },
      tooltips: {
        enabled: false,
      }
    }
  };
  var ctx = document.getElementById("chart-area").getContext("2d");
  window.myPie = new Chart(ctx, configReload);
}

function addToday(value) {
  today[value] = value;
  window.localStorage.setItem("today", JSON.stringify(today));
}

function addUpcoming(value) {
  upcoming[value] = value;
  window.localStorage.setItem("upcoming", JSON.stringify(upcoming));
}

function addLate(value) {
  late[value] = value;
  window.localStorage.setItem("late", JSON.stringify(late));
}


function todaySize() {
  return Object.keys(today).length;
}

function upcomingSize() {
  return Object.keys(upcoming).length;
}

function lateSize() {
  return Object.keys(late).length;
}

function delTodayElm(key) {
  delete today[key];
  window.localStorage.setItem("today", JSON.stringify(today));
}

function delUpcomingElm(key) {
  delete upcoming[key];
  window.localStorage.setItem("upcoming", JSON.stringify(upcoming));
}

function delLateElm(key) {
  delete late[key];
  window.localStorage.setItem("late", JSON.stringify(late));
}

function newElement() {
  alertify.success('Task Created!')
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  today[inputValue] = inputValue;
  window.localStorage.setItem("today", JSON.stringify(today));
  document.getElementById("to").innerHTML= todaySize();
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  reloadChart();
  var close = document.getElementsByClassName("close");
  var i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      alertify.success('Task Done!');
      var div = this.parentElement;
      var text = div.innerHTML.split("<");
      var div2 = div.parentElement;
      var div3 = div2.parentElement;
      if(div3.id.toString() === "today"){
        var key = text[0];
        delTodayElm(key);
        document.getElementById("to").innerHTML= todaySize();
      }
      if(div3.id.toString() === "upcoming"){
        var key = text[0];
        delUpcomingElm(key);
        document.getElementById("up").innerHTML= upcomingSize();
      }
      if(div3.id.toString() === "late"){
        var key = text[0];
        delLateElm(key);
        document.getElementById("la").innerHTML= lateSize();
      }
      div.style.display = "none";
      reloadChart();
    }
  }
}

function newElementUp() {
  alertify.success('Task Created!')
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInputUp").value;
  upcoming[inputValue] = inputValue;
  window.localStorage.setItem("upcoming", JSON.stringify(upcoming));
  document.getElementById("up").innerHTML= upcomingSize();
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
  } else {
    document.getElementById("myULUp").appendChild(li);
  }
  document.getElementById("myInputUp").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  reloadChart();
  var close = document.getElementsByClassName("close");
  var i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      alertify.success('Task Done!');
      var div = this.parentElement;
      var text = div.innerHTML.split("<");
      var div2 = div.parentElement;
      var div3 = div2.parentElement;
      if(div3.id.toString() === "today"){
        var key = text[0];
        delTodayElm(key);
        document.getElementById("to").innerHTML= todaySize();
      }
      if(div3.id.toString() === "upcoming"){
        var key = text[0];
        delUpcomingElm(key);
        document.getElementById("up").innerHTML= upcomingSize();
      }
      if(div3.id.toString() === "late"){
        var key = text[0];
        delLateElm(key);
        document.getElementById("la").innerHTML= lateSize();
      }
      div.style.display = "none";
      reloadChart();
    }
  }
}

function newElementLate() {
  alertify.success('Task Created!')
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInputLate").value;
  late[inputValue] = inputValue;
  window.localStorage.setItem("late", JSON.stringify(late));
  document.getElementById("la").innerHTML= lateSize();
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
  } else {
    document.getElementById("myULLate").appendChild(li);
  }
  document.getElementById("myInputLate").value = "";
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  reloadChart();
  var close = document.getElementsByClassName("close");
  var i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      alertify.success('Task Done!');
      var div = this.parentElement;
      var text = div.innerHTML.split("<");
      var div2 = div.parentElement;
      var div3 = div2.parentElement;
      if(div3.id.toString() === "today"){
        var key = text[0];
        delTodayElm(key);
        document.getElementById("to").innerHTML= todaySize();
      }
      if(div3.id.toString() === "upcoming"){
        var key = text[0];
        delUpcomingElm(key);
        document.getElementById("up").innerHTML= upcomingSize();
      }
      if(div3.id.toString() === "late"){
        var key = text[0];
        delLateElm(key);
        document.getElementById("la").innerHTML= lateSize();
      }
      div.style.display = "none";
      reloadChart();
    }
  }
}

function loadToday(inputValue) {
  var li = document.createElement("li");
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
}

function loadUpcoming(inputValue) {
  var li = document.createElement("li");
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
  } else {
    document.getElementById("myULUp").appendChild(li);
  }
  document.getElementById("myInputUp").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
}

function loadLate(inputValue) {
  var li = document.createElement("li");
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
  } else {
    document.getElementById("myULLate").appendChild(li);
  }
  document.getElementById("myInputLate").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
}
