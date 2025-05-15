(function(){
    'use strict';
    console.log("reading js")



    const amBtn = document.querySelector('#am');
    const pmBtn = document.querySelector('#pm');
    let amTime = true;
    let selectedHour = 1; 

    async function getData(){
        //retrieves JSON file
        const myMusicData = await fetch('data/music.json');
        //parses JSON response into JavaScript object
        const data = await myMusicData.json();

        //extracts array of objects to ignore nums
       /*  const values = Object.values(data);
        console.log(values); */

        document.querySelector('#name').innerHTML = outputMusicHTML(data); //For song name
        document.querySelector('#activity').innerHTML = outputActivityHTML(data); //for activity
        document.querySelector('body').style.color = outputColor(data); //for background color
        document.querySelector('#cover').innerHTML = outputCover(data); //for album cover
    
        //---------------------------------------------------------------------------------

        // Toggle AM/PM buttons
        document.querySelector('#am').addEventListener('click', () => {
            amTime = true;
            updateButtonStyles();
        });

        document.querySelector('#pm').addEventListener('click', () => {
            amTime = false;
            updateButtonStyles();
        });

        function updateButtonStyles() {
            document.querySelector('#am').style.color = amTime ? "#DEDEE0" : "black";
            document.querySelector('#pm').style.color = amTime ? "black" : "#DEDEE0";
        }

        //----------------------------------------------------------------------------------

        //Handle clicks on clock buttons
        const numberButtons = document.querySelectorAll('.nums');

        numberButtons.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                const hour = i + 1;
                selectedHour = amTime ? hour : hour + 12;
                updateNumberButtonStyles();
                console.log(`Selected hour: ${selectedHour} (${amTime ? 'AM' : 'PM'})`);
            });
        });

        function updateNumberButtonStyles() {
            numberButtons.forEach((btn, i) => {
                if (i + 1 === selectedHour) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }

    }
    //-----------------------------------------------------------------------------------
    //supportive functions

    function outputMusicHTML(data){
        let song = '';
        data.forEach(function(eachEntry){
            song = `${eachEntry.song}`

        });
        return song;
    }

    function outputActivityHTML(data){
        let activity = '';
        data.forEach(function(eachEntry){
            activity = `${eachEntry.activity}`

        });
        return activity;
    }

    function outputColor(data){
        let color = '';
        data.forEach(function(eachEntry){
            color = `${eachEntry.color}`

        });
        return color;
    }


    function outputCover(data){
        let album = '';
        data.forEach(function(eachEntry){
            album = `${eachEntry.album}`

        });
        return album;

    }


    getData();
})();
