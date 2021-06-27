

var c = 1;
var lol = []

for (var l = 1; l <= 1; l++) {
  var htmlrow = `<div class="row_${l} row"></div>`;
  $('.counters').append(htmlrow);
    for (var t = 1; t <= 10; t++) {
      let number;
      if(c.toString().length == 1) {
          number = `<div class="cnb">0${c}</div>`
      } else {
            number = `<div class="cnb">${c}</div>`
      }

      var htmlcard = `<div class="channel_${c} card" id="card_thing_${c}">
      ${number}
      <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" class="cimg">
      <div class="chnam">Loading</div>
      <div class="subscriberCount odometer">0</div>
      </div>`;
      $('.row_'+l).append(htmlcard);
      c += 1;
    }
}

function random(min, max){
  return Math.floor(Math.random()* (max-min) + min);
}

function updateData(q, data) {
  setTimeout(function () { 
    var cnb = q+1;


    $(".channel_"+cnb+" .cimg").attr("src",data.items[q].snippet.thumbnails.default.url);
    $(".channel_"+cnb+" .chnam").html(data.items[q].snippet.title);
    $(".channel_"+cnb+" .subscriberCount").html(Math.floor(data.items[q].statistics.subscriberCount));


    if (lol[q] - data.result[q].SubscriberCount >= 0.5) {
      document.getElementById("card_thing_"+cnb+"").style.backgroundColor = "red";
      console.log("red")
      setTimeout(reset, 500)
    }
    if (lol[q] - data.result[q].SubscriberCount <= -0.5) {
      document.getElementById("card_thing_"+cnb+"").style.backgroundColor = "green";
      console.log("green")
      setTimeout(reset, 500)
    }

    setTimeout(idkpopdelay, 1000) 

    function idkpopdelay() {
      lol[q] = data.result[q].SubscriberCount
    }

function reset() {
  document.getElementById("card_thing_"+cnb+"").style.backgroundColor = "black";
}


    }, random(5 , 25)*1000);
}

function update(){
  fetch("../data.json")
  .then(res => res.json())
  .then(json => {
    console.log(json)
    channelID = json
    $.getJSON(`https://api.amixcounts.ga/api/yt/user/${channelID}`,(data)=>{

        console.log(data)

        data.items.sort(function(a,b){return b.statistics.subscriberCount - a.statistics.subscriberCount});

        for (var q = 0; q < 10; q++) {
          updateData(q, data)
        }
    });
  });


}


update();
setInterval(update,10000);
setTimeout(function(){$('.loader').fadeOut(); $('.counters').fadeIn(1000);},1000)
setTimeout(function(){$('#loading').fadeOut(); $('.counters').fadeIn(1000);},1000)
