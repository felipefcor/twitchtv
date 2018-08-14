var channels = ["freecodecamp", "NBA", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "LVPes3"];
var game;
var status;

function getChannelInfo() {


for (i = 0;i < channels.length;++i) {

       var xmlhttp = new XMLHttpRequest(),
       url = 'https://api.twitch.tv/kraken/streams/'+ channels[i] + '?client_id=7e0leu1c5jgpvj7iviwcij03omfiqt';
       
       xmlhttp.onreadystatechange = function() {

            if (this.readyState == 4 && this.status == 200) {
            var streamers = JSON.parse(this.responseText);
            
                if (streamers.stream === null) {
                   game = "Offline";
                   status = "offline";
                } else if (streamers.stream === undefined) {
                   game = "Not found";
                   status = "offline";
                } else {
                   game = streamers.stream.game;
                   status = "online";
                };
            }    
    }

    xmlhttp.open('GET', url, true);
    xmlhttp.send();
}



for (i = 0;i < channels.length;++i) {

      var xmlhttp = new XMLHttpRequest(),
      url = 'https://api.twitch.tv/kraken/channels/'+ channels[i] + '?client_id=7e0leu1c5jgpvj7iviwcij03omfiqt';
    	
      xmlhttp.onreadystatechange = function() {
        
        if (this.readyState == 4 && this.status == 200) {
          var channel1 = JSON.parse(this.responseText);

         var logo = channel1.logo != null ? channel1.logo : "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F",
          name = channel1.display_name != null ? channel1.display_name : channel1,
          description = status === "online" ? ': ' + channel1.status : "";

              
          html = '<div class="row ' + status + '" id="canal"><div class="col-xs-2 col-md-2" id="icon"><img src="' + 
          logo + '" class="logo"></div><div class="col-xs-5 col-md-3" id="name"><a href="' + 
          channel1.url + '" target="_blank">' + name + '</a></div><div class="col-xs-5 col-md-7" id="streaming">'+ 
          game + '<span class="hidden-xs">' + description + '</span></div></div>';
                               
        
        document.getElementById('display').innerHTML += html; 
        
        }
    }
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
}


}




document.addEventListener("DOMContentLoaded", function(){
      getChannelInfo();
});




  

//Cuando pulso los botones del menú

var selector = document.getElementsByClassName('selector');
var numSelect = selector.length;
var i;

    for (i = 0 ; i < numSelect; i++) {
   
      selector[i].addEventListener('click', callback);
  
    }

function callback () {

      var allChannels = document.querySelectorAll('#canal'); 
      var onChannel = document.querySelectorAll('.online');
      var offChannel = document.querySelectorAll('.offline');
      var status = this.getAttribute('id');
             
              if (status==="all"){
                 
                allChannels.forEach( function (selector) {
                  selector.classList.remove("hidden");
                })
                

              }
              else if (status==="online") {
                  onChannel.forEach( function (selector) {
                    selector.classList.remove("hidden");
                   })
                  offChannel.forEach( function (selector) {
                    selector.classList.add("hidden");
                })
                }
              else if (status==="offline"){
                  onChannel.forEach( function (selector) {
                    selector.classList.add("hidden");
                  })
                  offChannel.forEach( function (selector) {
                    selector.classList.remove("hidden"); 
                })
              }
             

//selector.removeEventListener('click', callback);

};