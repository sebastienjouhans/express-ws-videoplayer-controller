(function() {

  let videos = null;

  fetch("data.json")
    .then(response => response.json())
      .then(data => 
        {
          console.log(data.videos); 
          videos = data.videos;
        });

  let host = location.origin.replace(/^http/, 'ws');
  let ws = new WebSocket(host);
  
  console.log(host);

  let videoPlayer = document.getElementById("videoPlayer");

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
    console.log("update video");
  }


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
