(async function() 
{
  let host = location.origin.replace(/^http/, 'ws');
  let ws = new WebSocket(host);
  let videos = null;
  let buttons = null;

 
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
    let json = null;
    json = {"event":"videoPlay"};
    sendData(json);
  }

  videoStop = function(e)
  {
    let json = null;
    json = {"event":"videoStop"};
    sendData(json);
  }

  sendData = function(json)
  {
    let data = JSON.stringify(json);
    ws.send(data);
  }


  loadJson = async function()
  {
    try 
    {
      let data = await (await fetch("data.json")).json();

      if(data.videos == null)
      {
        console.error("problem with loading the data json file - data.videos");
      }

      return data.videos;
    } 
    catch(e) 
    {
      console.error(`problem with loading the data json file ${e.error}`);
    }
  }

  init = async function()
  {
    videos = await loadJson();

    let videoButtonContainer = document.getElementById("video-button-container");
    if(videoButtonContainer==null)
    {
      console.error("these is no video button container in the html");
      return;
    }
  
    buttons = [];
    for(let i=0; i<videos.length; i++)
    {
      console.log(videos[i].id)
      let button = document.createElement("button");
      button.innerHTML = `video ${i}`;
      button.setAttribute("id", `video-button ${i}`);
      button.setAttribute("data-video-id", videos[i].id);
      button.addEventListener("click", videoUpdate);
      videoButtonContainer.appendChild(button);
      buttons.push(button);
    }
  }

  await init();
 
  playButton.addEventListener("click", videoPlay);
  stopButton.addEventListener("click", videoStop);


  
}());