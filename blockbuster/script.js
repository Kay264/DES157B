(function(){
    'use strict';

    const fs = document.querySelector('.fa-expand');
    
    const intervalID = setInterval(checkTime, 1000);


    fs.addEventListener('click', function(){

        if(!document.fullscreenElement){
            document.documentElement.requestFullscreen();

        }else{
            document.exitFullscreen();
        }
    });





    const textPath = document.querySelector('#spiralText');
    const words = ["A", "circle", "is", "the", "reflection", "of", "eternity.", "It", "has", "no", "beginning", "and", "it", "has", "no", "end", "- and", "if", "you", "put", "several", "circles", "over", "each", "other,", "then", "you", "get", "a", "spiral."];
    let newWord;

    function addDivs(){
        for(const i = 0; i <= words.length; i++){
            setTimeout(function(){
                    
            }, 5500);

        };
        
    }

    addDivs();


})();

