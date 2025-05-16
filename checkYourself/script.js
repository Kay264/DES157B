(function(){
    'use strict';
    console.log("reading js");

    const amBtn = document.querySelector('#am');
    const pmBtn = document.querySelector('#pm');
    const numberButtons = document.querySelectorAll('.nums');
    const songName = document.querySelector('#name');
    const activity = document.querySelector('#activity');
    const albumCover = document.querySelector('#cover');
    const body = document.body;

    let amTime = true;
    let selectedHour = 1;
    let musicData = {};

    //fetch the JSON data
    async function getData(){
        try {
            const response = await fetch('data/music.json');
            musicData = await response.json();
        } catch (error) {
            console.error('Error fetching JSON data:', error);
        }
    }

    //update the DOM based on selected hour
    function updateDOM() {
        const hourKey = amTime ? selectedHour : selectedHour + 12;
        const data = musicData[hourKey];

        if (data) {
            songName.textContent = data.song;
            activity.textContent = data.activity;
            body.style.backgroundColor = data.color;

            //update album cover
            albumCover.innerHTML = ''; //clear previous content
            const img = document.createElement('img');
            img.src = data.album; //assuming 'album' is the image file name or URL
            img.classList.add('albumCover', 'show');
            img.alt = `Album cover for ${data.song}`;
            albumCover.appendChild(img);
        } else {
            console.warn(`No data found for hour: ${hourKey}`);
        }
    }

    //update AM/PM button styles
    function updateButtonStyles() {
        amBtn.style.color = amTime ? "#DEDEE0" : "black";
        pmBtn.style.color = amTime ? "black" : "#DEDEE0";
    }

    // Update clock number button styles
    function updateNumberButtonStyles() {
        numberButtons.forEach((btn, i) => {
            if (i + 1 === selectedHour) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Event listeners for AM/PM buttons
    amBtn.addEventListener('click', () => {
        amTime = true;
        updateButtonStyles();
        updateDOM();
    });

    pmBtn.addEventListener('click', () => {
        amTime = false;
        updateButtonStyles();
        updateDOM();
    });

    // Event listeners for clock number buttons
    numberButtons.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            selectedHour = i + 1;
            updateNumberButtonStyles();
            updateDOM();
        });
    });

    // Initialize
    getData();
})();
