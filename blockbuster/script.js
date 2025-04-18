(function(){
    'use strict';

    const fs = document.querySelector('.fa-expand');
    
    const intervalID = setInterval(checkTime, 1000);
    const img = document.querySelector('#pic');


    fs.addEventListener('click', function(){

        if(!document.fullscreenElement){
            document.documentElement.requestFullscreen();

        }else{
            document.exitFullscreen();
        }
    });


    function checkTime(){
        if(0 < myVideo.currentTime && myVideo.currentTime < 16){
            img.className = "showing";
        }else{
            img.className = "hidden";
        }
    }

    


})();

