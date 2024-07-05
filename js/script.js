const imageSection = document.getElementById('planet-image1');
const nameSectionText = document.getElementById('planet-name-text');
const descSectionText = document.getElementById('planet-desc-text');
const sourceSectionText = document.getElementById('planet-source-text');

let defaultPlanetFlag = 0;

fetch('data/data.json')
.then(response => response.json())
.then(data => {
    preloadImages(data);
    planetSelect(data);
});

function preloadImages(data) {
    data.forEach(planet => {
        const img = new Image();
        img.src = planet.images.planet;
    });
}

function planetSelect(data){
    const menuList = document.getElementById('header-menu-elements');
    const defaultPlanet = planetDefault(data);

    if(defaultPlanetFlag == 0){
        mainButtons(defaultPlanet);
    }
    
    data.forEach(planet => {
        const newMenuItem = document.createElement('li');
        newMenuItem.classList.add('menu-item');
        newMenuItem.setAttribute('data-planet-name', planet.name);
        newMenuItem.textContent = planet.name;

        newMenuItem.addEventListener('click', function() {
            document.querySelectorAll('.menu-item').forEach(item => {
                item.classList.remove('menu-clicked');
            })
            imageSection.src = planet.images.planet;
            nameSectionText.textContent = planet.name;
            descSectionText.textContent = planet.overview.content;
            sourceSectionText.textContent = planet.overview.source;
            
            mainButtons(planet);
            this.classList.add('menu-clicked');
            console.log(planet);
        });
        menuList.appendChild(newMenuItem);
    });
        // After all menu items have been created, find and mark the default planet menu item
        const defaultPlanetMenuItem = Array.from(document.querySelectorAll('.menu-item')).find(item => item.getAttribute('data-planet-name') === defaultPlanet.name);
        if (defaultPlanetMenuItem) {
            defaultPlanetMenuItem.classList.add('menu-clicked');
        }
}


function mainButtons(planet){
    if (!planet) return;
    const overviewButton = document.getElementById('overview-button');
    const structureButton= document.getElementById('structure-button');
    const geologyButton = document.getElementById('geology-button');

    overviewButton.addEventListener('click', function(){
        descSectionText.textContent = planet.overview.content;
        sourceSectionText.textContent = planet.overview.source;
        imageSection.src = planet.images.planet;
    });
    structureButton.addEventListener('click', function(){
        descSectionText.textContent = planet.structure.content;
        sourceSectionText.textContent = planet.structure.source;
        imageSection.src = planet.images.internal;
    });

    geologyButton.addEventListener('click', function(){
        descSectionText.textContent = planet.geology.content;
        sourceSectionText.textContent = planet.geology.source;
        imageSection.src = planet.images.geology;
    });
    }



function planetDefault(data){
    const specificPlanet =  data.find(item => item.name === "Earth");
    
    if (specificPlanet) { // Check if a planet was found
        imageSection.src = specificPlanet.images.planet;        
        nameSectionText.textContent = specificPlanet.name;
        descSectionText.textContent = specificPlanet.overview.content;
        sourceSectionText.textContent = specificPlanet.overview.source;
        planet = specificPlanet;
    }

    const defaultPlanet = data.find(planet => planet.name === "Earth");
    
    return defaultPlanet;
}


