gsap.registerPlugin(ScrollTrigger);

 

(function(){
    'use strict';
    console.log("reading js");

console.log("JS is running!");


  document.addEventListener('mousemove', function(event) {
    console.log('X:', event.clientX, 'Y:', event.clientY);
  }); 

//declarations_______________________________________________________________

let foodwebData;
let rhinoData;

//fetch the JSON data________________________________________________________

 

  async function fetchRhinoData() {
    try {
      const res = await fetch('jsons/rhinoPop.json'); // adjust path if needed
      rhinoData = await res.json();
      setupRhinoScroll(); // Call this AFTER data is ready
    } catch (e) {
      console.error('Failed to load rhino data:', e);
    }
  }

  async function getData(){
    try {
        const response = await fetch('jsons/foodweb.json');
        foodwebData = await response.json();

        // 👉 Now that data is loaded, set up event listeners:

        // Euphorbia
        document.querySelector('#EuphorbiaI').addEventListener('click', () => {
          updateScale('euphorbia', 0.2);
          updateScale('duneAnt', 0.1);
          updateScale('blackRhino', 0.1);
        });

        document.querySelector('#EuphorbiaD').addEventListener('click', () => {
          updateScale('euphorbia', -0.2);
          updateScale('blackRhino', -0.1);
        });

        // 🐜 Dune Ant
        document.querySelector('#DuneAntI').addEventListener('click', () => {
          updateScale('duneAnt', 0.2);
          updateScale('poacher', -0.1);
          updateScale('spottedHyena', -0.1);
          updateScale('blackRhino', -0.1);
          updateScale('euphorbia', -0.1);
        });

        document.querySelector('#DuneAntD').addEventListener('click', () => {
          updateScale('duneAnt', -0.2);
          updateScale('euphorbia', -0.1);
          updateScale('blackRhino', -0.1);
        });

        // 🦏 Black Rhino
        document.querySelector('#BlackRhinoI').addEventListener('click', () => {
          updateScale('blackRhino', 0.2);
          updateScale('euphorbia', -0.1);
        });

        document.querySelector('#BlackRhinoD').addEventListener('click', () => {
          updateScale('blackRhino', -0.2);
          updateScale('euphorbia', 0.1);
          updateScale('spottedHyena', -0.1);
        });

        // 🐺 Spotted Hyena
        document.querySelector('#spottedHyenaI').addEventListener('click', () => {
          updateScale('spottedHyena', 0.2);
          updateScale('blackRhino', -0.1);
        });

        document.querySelector('#spottedHyenaD').addEventListener('click', () => {
          updateScale('spottedHyena', -0.2);
          updateScale('blackRhino', 0.1);
          updateScale('euphorbia', -0.1);
        });

        // 💀 Poacher
        document.querySelector('#PoacherI').addEventListener('click', () => {
          updateScale('poacher', 0.2);
          updateScale('blackRhino', -0.1);
          updateScale('spottedHyena', -0.1);
        });

        document.querySelector('#PoacherD').addEventListener('click', () => {
          updateScale('poacher', -0.2);
          updateScale('blackRhino', 0.1);
          updateScale('spottedHyena', 0.1);
        });

        // Exit crash message
        document.querySelector('#exit').addEventListener('click', resetEcosystem);

    } catch (error) {
        console.error('Error fetching JSON data:', error);
    }
}


//Rhino foodweb___________________________________________________________________________


//update Scale____________________________
function updateScale(speciesName, change) {
  const data = foodwebData[speciesName];
  let scale = parseFloat(data.scaleCount);

  scale += change;
  data.scaleCount = scale.toFixed(1); // Update JSON

  // Apply scale to image
  document.querySelector(`#${camelToId(speciesName)}`).style.transform = `scale(${scale})`;

  // Check for crash conditions
  if (scale >= 2) {
    showCrash(data.messageI);
  } else if (scale <= 0) {
    showCrash(data.messageD);
  }
}

// Reset everything________________________
function resetEcosystem() {
  for (let species in foodwebData) {
    foodwebData[species].scaleCount = "1";
    document.querySelector(`#${camelToId(species)}`).style.transform = 'scale(1)';
  }
  document.querySelector('#foodChainMessage').style.opacity = 0;
}

function showCrash(message) {
  document.querySelector('#foodChainText').textContent = message;
  document.querySelector('#foodChainMessage').style.opacity = 1;
}


// Converts "Black Rhino" -> "blackRhino" to match IDs
function camelToId(name) {
  return name.replace(/\s(.)/g, (match, group1) => group1.toUpperCase()).replace(/\s/g, '');
}



// Exit crash message and reset
document.querySelector('#exit').addEventListener('click', resetEcosystem)





//scroll things in general_____________________________________________________________________


window.addEventListener('scroll', () => {

  //moon
  const moon = document.querySelector('#moon');
  const moonStopPoint = 3200; // play with this value for best effect
  const scrollY = window.scrollY;

  if (scrollY < moonStopPoint) {
    moon.classList.add('fixed');
    moon.classList.remove('stopped');
  } else {
    moon.classList.remove('fixed');
    moon.classList.add('stopped');
  }


});


gsap.registerPlugin(ScrollTrigger);

gsap.to("#narration", {
  opacity: 0,
  scrollTrigger: {
    trigger: "#firstRhino",
    start: "bottom bottom", // when the rhino's bottom hits the viewport bottom
    end: "+=1500",          // how far to scroll while fading
    scrub: true,
    pin: true,
    anticipatePin: 1,
 
  }
});


// 1. Pin the entire rhinoFacts section

ScrollTrigger.create({
  trigger: '#factRhino',
  start: 'bottom bottom',
  end: `+=3200`,
  pin: '#rhinoFacts',
  scrub: true,
  anticipatePin: 1,
});


// 2. Timeline to swap images
let rhinoImages = ['habitat.png', 'blackVWhite.png', 'social.jpg', 'other.png'];

rhinoImages.forEach((imgName, i) => {
  ScrollTrigger.create({
    trigger: '#rhinoFactsWrapper',
    start: `${800 * i}px`,
    end: `${800 * (i + 1)}px`,
    scrub: true,
    onEnter: () => {
      document.querySelector('#factImages').src = `imgs/factImgs/${imgName}`;
    },
    onEnterBack: () => {
      document.querySelector('#factImages').src = `imgs/factImgs/${imgName}`;
    }
  });
});









//This code no work plz ignore:

/* function setupRhinoScroll() {
  const decades = Object.keys(rhinoData);
  const rhinoImgs = document.querySelectorAll('.rhinopop');

  decades.forEach((decade, index) => {
    const startPx = index * 800;
    const endPx = startPx + 800;
    const population = rhinoData[decade].population;
    const rhinoCount = rhinoData[decade].rhinoCount;

    ScrollTrigger.create({
      trigger: '#rhinoEndangerWrapper',
      start: `top+=${startPx} top`,
      end: `top+=${endPx} top`,
      scrub: true,
      onUpdate: self => {
        if (self.progress > 0 && self.progress < 1) {
          updateRhinoDisplay(decade, population, rhinoCount);
        }
      }
    });
  });
}

function updateRhinoDisplay(year, pop, count) {
  document.querySelector('#year').textContent = year;
  document.querySelector('#pop').textContent = pop;

  const rhinos = document.querySelectorAll('.rhinopop');
  rhinos.forEach((rhino, i) => {
    rhino.style.opacity = (i < count) ? '1' : '0';
  });
}

 */


/* window.addEventListener('scroll', () => {
  const maxScroll = 8000; // adjust this based on how much scrolling you want
  const scrollTop = window.scrollY;
  const scrollRatio = scrollTop / maxScroll;
  const rhinosToShow = Math.max(1, Math.ceil((1 - scrollRatio) * rhinos.length));

  rhinos.forEach((rhino, i) => {
    rhino.style.opacity = (i < rhinosToShow) ? '1' : '0';
  });
}); */

// Ensure this matches your pin duration
const totalScroll = 5600;
const rhinos = document.querySelectorAll('.rhinopop');

// Pinning setup (keep this as you had it)
ScrollTrigger.create({
  trigger: '#rhinoEndangerWrapper',
  start: 'top top',
  end: `+=${totalScroll}`,
  pin: true,
  scrub: true,
  anticipatePin: 1,
});

// Rhino disappearance timeline
const rhinoTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: '#rhinoEndangerWrapper',
    start: 'top top',
    end: `+=${totalScroll}`,
    scrub: true
  }
});

// Fade out each rhino one at a time
rhinos.forEach((rhino, i) => {
  if (i < rhinos.length - 1) {
    rhinoTimeline.to(rhino, { opacity: 0 }, i * (totalScroll / (rhinos.length - 1)) / totalScroll);
  }
});


ScrollTrigger.create({
  trigger: '#rhinoFoodChain',
  start: 'top+=400 top',   // pin starts 100px after top hits viewport top
  end: '+=800',            // pin for 800px scroll (longer)
  pin: true,
  scrub: true,
});

  // Initialize
  fetchRhinoData();
  getData();
})();