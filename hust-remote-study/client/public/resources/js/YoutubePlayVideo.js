      var player;
      
      function initVideo(videoId, panelId) {
    	  console.log('initVideo')
        player = new YT.Player(panelId, {
          height: '100%',
          width: '100%',
          videoId: videoId,
          playerVars: { 'rel': 0,
        	  			'autoplay': 1,
                        'controls': 1 ,
                        'color': 'blue',
//                        'playlist': ''
                        },
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
          }
        });
    	  console.log('end initVideo')
      }
      
        function seekTo(newTime){
        	if(player){
        		player.seekTo(newTime);
        	}
        }

        // 4. The API will call this function when the video player is ready.
        function onPlayerReady(event) {
          event.target.playVideo();
        }

        function setVolum(x){
        	if(player){
        		player.setVolume(x)
        	}
        }
        
        function getDuration(){
        	return player.getDuration();
        }
        
        function getCurrentTime(){
        	if(player){
        		return  player.getCurrentTime();
        	}else{
        		return  0;
        	}
        	
        }

        function onPlayerStateChange(event) {
          if (event.data == YT.PlayerState.CUED ) {
              console.log('event: CUED')
          }
        }

        function stopVideo() {
        	if(player){
        		player.stopVideo();
        	}
        }
        
        function stopVideo() {
        	if(player){
        		console.log('player ', player);
        		player.stopVideo();
        	}
        }
        
        function isPauseVideo() {
        	if(player){
        		player.isPauseVideo();
        	}
        }
        
        function pauseVideo() {
        	if(player){
        		player.pauseVideo();
        	}
        }
        
        function playVideo() {
        	if(player){
        		player.playVideo();
        	}
        }
