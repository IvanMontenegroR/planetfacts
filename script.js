fetch('data.json')
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
    const specificPlanet =  data.find(item => item.name === planet);
    if (specificPlanet) { // Check if a planet was found
        const planetImage = document.createElement('img');
        planetImage.src = specificPlanet.images.planet;
        imageSection.appendChild(planetImage);
    }

};
