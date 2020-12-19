(function() 
{
  let host = location.origin.replace(/^http/, 'ws');
  let ws = new WebSocket(host);
  
  console.log(host);

  let vidButton1 = document.getElementById("vidButton1");
  let vidButton2 = document.getElementById("vidButton2");
  let vidButton3 = document.getElementById("vidButton3");
  let buttons = [vidButton1, vidButton2, vidButton3];

 
  let playButton = document.getElementById("playButton");
  let stopButton = document.getElementById("stopButton");

  videoUpdate = function(e)
  {
    let json = null;
    let videoId = null;

    for(let i=0; i<buttons.length; i++)
    {
      if(e.target.id == null)
      {
        return;
      }

      if(buttons[i].id == e.target.id)
      {
        videoId = buttons[i].getAttribute("data-video-id");
        break;
      }
    }

    json = {"event":"videoUpdate","videoId":videoId};
    sendData(json);
  }

  videoPlay = function(e)
  {
    json = {"event":"videoPlay"};
    sendData(json);
  }

  videoStop = function(e)
  {
    json = {"event":"videoStop"};
    sendData(json);
  }

  vidButton1.addEventListener("click", videoUpdate);
  vidButton2.addEventListener("click", videoUpdate);
  vidButton3.addEventListener("click", videoUpdate);
 
  playButton.addEventListener("click", videoPlay);
  stopButton.addEventListener("click", videoStop);

  sendData = function(json)
  {
    let data = JSON.stringify(json);
    ws.send(data);
  }
  
}());