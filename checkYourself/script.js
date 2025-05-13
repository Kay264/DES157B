/* FIVE THINGS TO CHANGE

    -AM vs PM

    -background color
    -album cover

    data related
    -song & artist
    -activity
*/


let globalData;
const amBtn = document.querySelector('#am');
const pmBtn = document.querySelector('#pm');
let amTime = true;
let selectedHour = 1; 

//--------------------------------------------------------------------------------
async function getData(){
    const myMusicData = await fetch('data/music.json');
    const data = await myMusicData.json();

    globalData = data;

    document.querySelector('#name').innerHTML = outputMusicHTML(data);
    document.querySelector('#activity').innerHTML = outputActivityHTML(data);

}

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
const numberButtons = document.querySelectorAll('.nums');

numberButtons.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        selectedHour = i + 1; 
        updateNumberButtonStyles();
        console.log(`Selected hour: ${selectedHour} ${amTime ? 'AM' : 'PM'}`);
        showAlbum(i)
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


function showAlbum(index) {
    const covers = document.querySelectorAll('.albumCover');
    covers.forEach((cover, i) => {
        if (i === index) {
            cover.classList.add('show');
        } else {
            cover.classList.remove('show');
        }
    });
}

showAlbum(0);

