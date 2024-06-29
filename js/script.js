fetch('data/data.json')
.then(response => response.json())
.then(data => {
    createMenu(data);
    planetDefault(data, "Earth");
});

function createMenu(data){
    const menuList = document.getElementById('header-menu-elements');
    data.forEach(planet => {
        const newMenuItem = document.createElement('li');
        newMenuItem.textContent = planet.name;
        menuList.appendChild(newMenuItem);
    })
};

function planetDefault(data, planet){
    const imageSection = document.getElementById('planet-image');
    const nameSection = document.getElementById('planet-name');
    const descSection = document.getElementById('planet-description');
    const sourceSection = document.getElementById('planet-source');
    const specificPlanet =  data.find(item => item.name === planet);
    if (specificPlanet) { // Check if a planet was found
        const planetImage = document.createElement('img');
        planetImage.src = specificPlanet.images.planet;
        imageSection.appendChild(planetImage);
        
        const planetName = document.createElement('h2');
        planetName.textContent = specificPlanet.name;
        nameSection.appendChild(planetName);
        
        const planetDesc = document.createElement('p');
        planetDesc.textContent = specificPlanet.overview.content;
        descSection.appendChild(planetDesc);
        
        const planetSource = document.createElement('p');
        planetSource.textContent = specificPlanet.overview.source;
        sourceSection.appendChild(planetSource);
    }
};
