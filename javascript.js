var channels = ["freecodecamp", "NBA", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "LVPes3"];


function getChannelInfo() {

	channels.forEach(function(channel) {

        function makeURL(type, name) {
            return 'https://api.twitch.tv/kraken/' + type + '/' + name + '?client_id=7e0leu1c5jgpvj7iviwcij03omfiqt';
        }
                
        var xmlhttpStreams = new XMLHttpRequest();
        var url = makeURL("streams", channel);
        xmlhttpStreams.onreadystatechange = function() {
            if (xmlhttpStreams.readyState == 4 && this.status == 200) {
                var data = JSON.parse(xmlhttpStreams.responseText);
                var status, game;

                if(data.stream === null) {
                    status = 'offline';
                    game = 'offline';
                }
                else if(data.stream === undefined) {
                    status = 'offline';
                    game = 'not found';
                }
                else {
                    status = 'online';
                    game = data.stream.game;
                }

                var xmlhttpChannels = new XMLHttpRequest();
                var url = makeURL("channels", channel);
                xmlhttpChannels.onreadystatechange = function() {
                    if (xmlhttpChannels.readyState == 4 && this.status == 200) {
                        var data = JSON.parse(xmlhttpChannels.responseText);
                        var logo = null;
                        var name = null;
                        var description = '';

                        if(data.logo !== null){
                            logo = data.logo;
                            }
                        if(data.name !== null) {
                            name = data.name;
                            }
                        if(status === 'online') {
                            description = data.status;
                            }

                        
                          var div = document.createElement("div");

                        
                          div.innerHTML = '<div class="row ' + status + '" id="canal"><div class="col-xs-2 col-md-2" id="icon"><img src="' + 
								          logo + '" class="logo"></div><div class="col-xs-5 col-md-3" id="name"><a href="' + 
								          data.url + '" target="_blank">' + name + '</a></div><div class="col-xs-5 col-md-7" id="streaming">'+ 
								          game + '<span class="hidden-xs">' + description + '</span></div></div>';

                        
                        var display = document.getElementById("display");

                        
                        if(status === 'online') {
                           display.prepend(div);
                        }

                        else  {
                          display.appendChild(div);
                        }  
                     }
                };
                xmlhttpChannels.open("GET", url, true);
                xmlhttpChannels.send();

            }
        };
        xmlhttpStreams.open("GET", url, true);
        xmlhttpStreams.send();
        

    })
}

document.addEventListener("DOMContentLoaded", function(){
      getChannelInfo();
});



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
           

};
