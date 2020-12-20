(async function() 
{

  let host = location.origin.replace(/^http/, 'ws');
  let ws = new WebSocket(host);
  let videoPlayer = document.getElementById("videoPlayer");
  let videos = null;



  onVideoPlay = function() 
  {
    videoPlayer.play();
    console.log("play video");
  }

  onVideoStop = function() 
  {
    videoPlayer.pause();
    console.log("stop video");
  }

  onVideoUpdate = function(videoId) 
  {
    if(videoId == null)
    {
      return;
    }
    
    let videoSource = null;

    for(let i=0; i<videos.length; i++)
    {
      if(videos[i].id == videoId)
      {
        videoSource = videos[i].source;
        break;
      }
    }

    videoPlayer.src = videoSource;
    console.log(`update video : src=  ${videoSource}`);
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

    if(videos==null)
    {
      console.error("problem with loading the data json file");
    }
  }


  

  await init();


  ws.onmessage = function(e) 
  {
    let json = JSON.parse(e.data);
    switch(json.event)
    {
      case "videoUpdate":
        onVideoUpdate(json.videoId);
      break;

      case "videoStop":
        onVideoStop();
      break;

      case "videoPlay":
        onVideoPlay();
      break;
    }
  }

}());
