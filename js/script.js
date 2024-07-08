document.addEventListener('DOMContentLoaded', function() {
    const imageSection = document.getElementById('planet-image1');
    const nameSectionText = document.getElementById('planet-name-text');
    const descSectionText = document.getElementById('planet-desc-text');
    const sourceSectionText = document.getElementById('planet-source-text');
    const overviewButton = document.getElementById('overview-button');
    const structureButton= document.getElementById('structure-button');
    const geologyButton = document.getElementById('geology-button');
    const buttons = document.querySelectorAll('.main-button');
    const rotationValue = document.getElementById('rotation-value');
    const revolutionValue = document.getElementById('revolution-value');
    const radiusValue = document.getElementById('radius-value');
    const tempValue = document.getElementById('temp-value');

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
                const formattedSource = formatSourceLink(planet.overview.source);
                document.querySelectorAll('.menu-item').forEach(item => {
                    item.classList.remove('menu-clicked');
                })
                buttons.forEach(item => {
                    item.classList.remove('button-clicked');
                });
                overviewButton.classList.add('button-clicked');
                imageSection.src = planet.images.planet;
                nameSectionText.textContent = planet.name;
                descSectionText.textContent = planet.overview.content;
                
                sourceSectionText.textContent = formattedSource;
                
                rotationValue.textContent = planet.rotation;
                revolutionValue.textContent = planet.revolution;
                radiusValue.textContent = planet.radius;
                tempValue.textContent = planet.temperature;
                
                mainButtons(planet);
                this.classList.add('menu-clicked');
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
        const formattedSource = formatSourceLink(planet.overview.source);
        overviewButton.addEventListener('click', function(){
            buttons.forEach(item => {
                item.classList.remove('button-clicked');
            });
            descSectionText.textContent = planet.overview.content;
            sourceSectionText.textContent = formattedSource;
            imageSection.src = planet.images.planet;
            this.classList.add('button-clicked');
        });
        structureButton.addEventListener('click', function(){
            buttons.forEach(item => {
                item.classList.remove('button-clicked');
            });

            descSectionText.textContent = planet.structure.content;
            sourceSectionText.textContent = formattedSource;
            imageSection.src = planet.images.internal;
            this.classList.add('button-clicked');
        });

        geologyButton.addEventListener('click', function(){
            buttons.forEach(item => {
                item.classList.remove('button-clicked');
            });
            descSectionText.textContent = planet.geology.content;
            sourceSectionText.textContent = formattedSource;
            imageSection.src = planet.images.geology;
            this.classList.add('button-clicked');
        });
        }



    function planetDefault(data){
        const specificPlanet =  data.find(item => item.name === "Earth");
        
        if (specificPlanet) { // Check if a planet was found
            const defaultFormattedtSource = formatSourceLink(specificPlanet.overview.source);
            
            imageSection.src = specificPlanet.images.planet;        
            nameSectionText.textContent = specificPlanet.name;
            descSectionText.textContent = specificPlanet.overview.content;
            sourceSectionText.textContent = defaultFormattedtSource;
            rotationValue.textContent = specificPlanet.rotation;
            revolutionValue.textContent = specificPlanet.revolution;
            radiusValue.textContent = specificPlanet.radius;
            tempValue.textContent = specificPlanet.temperature;
            planet = specificPlanet;
            overviewButton.classList.add('button-clicked');
        }

        const defaultPlanet = data.find(planet => planet.name === "Earth");
        
        return defaultPlanet;
    }
});

function formatSourceLink(url) {
    // Use the URL constructor to parse the URL and extract the hostname
    const hostname = new URL(url).hostname;
    
    // Extract the main word of the domain, assuming it's the part before the last dot
    // This will work for simple cases and needs adjustment for more complex domain structures
    let mainWord = hostname.substring(0, hostname.lastIndexOf('.'));
    
    // Remove subdomains, assuming they are separated by dots
    // This gets the last part after the last dot in the remaining string
    mainWord = mainWord.substring(mainWord.lastIndexOf('.') + 1) || mainWord;
    
    // Capitalize the first letter and return
    return mainWord.charAt(0).toUpperCase() + mainWord.slice(1);
  }


