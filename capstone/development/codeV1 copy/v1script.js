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



  getData();
})();