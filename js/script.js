let defaultPlanetFlag = 0;

fetch('data/data.json')
.then(response => response.json())
.then(data => {
    preloadImages(data);
    
    if(defaultPlanetFlag == 0){
        planetDefault(data, "Earth");
        defaultPlanetFlag = 1;
    }

    createMenu(data);
});

function preloadImages(data) {
    data.forEach(planet => {
        const img = new Image();
        img.src = planet.images.planet;
    });
}

function createMenu(data){
    const menuList = document.getElementById('header-menu-elements');
    data.forEach(planet => {
        const imageSection = document.getElementById('planet-image1');
        const nameSectionText = document.getElementById('planet-name-text');
        const descSectionText = document.getElementById('planet-desc-text');
        const sourceSectionText = document.getElementById('planet-source-text');
        const newMenuItem = document.createElement('li');
        
        newMenuItem.classList.add('menu-item');
        newMenuItem.setAttribute('data-planet-name', planet.name);
        newMenuItem.textContent = planet.name;

        newMenuItem.addEventListener('click', function() {
            imageSection.src = planet.images.planet;
            nameSectionText.textContent = planet.name;
            descSectionText.textContent = planet.overview.content;
            sourceSectionText.textContent = `Source: ${planet.overview.source}`;
            
        });

        menuList.appendChild(newMenuItem);
    });
}

function planetDefault(data, planet){
    const imageSection = document.getElementById('planet-image1');
    const nameSectionText = document.getElementById('planet-name-text');
    const descSectionText = document.getElementById('planet-desc-text');
    const sourceSectionText = document.getElementById('planet-source-text');
    const specificPlanet =  data.find(item => item.name === planet);
    if (specificPlanet) { // Check if a planet was found
        imageSection.src = specificPlanet.images.planet;
        
        nameSectionText.textContent = specificPlanet.name;
        
        descSectionText.textContent = specificPlanet.overview.content;
        
        sourceSectionText.textContent = `Source: ${specificPlanet.overview.source}`;
    }
}
