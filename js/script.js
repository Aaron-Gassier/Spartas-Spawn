let resources = {
    willpower: 3,
    strength: 0,
    endurance: 0,
    wisdom: 0,
    honor: 0
    // Add more resources as needed
};

const maxResources = {
    willpower: 3,
    strength: 5,
    endurance: 5,
    wisdom: 5,
    honor: 10000
    // Set max values for each resource
};

const regenRates = {
    willpower: 0.1,
    strength: 0,
    endurance: 0,
    wisdom: 0,
    honor: 0
    // Set regen rates for each resource
};

const displayFormat = {
    willpower: true,
    strength: true,
    endurance: false,
    wisdom: false,
    honor: false
    // Toggle display format for each resource
};

let totalMinutesElapsed = 49440;

const timeConfig = {
    seasonDays: 30,
    hoursInDay: 24,
    minutesInHour: 60,
    seasons: ["Spring", "Summer", "Fall", "Winter"]
};

function gatherResource(resource) {
    if (resources.willpower >= 1) {
        if (resources[resource] < maxResources[resource]) {
            resources[resource]++;
            resources.willpower--; // Decrease willpower by 1
            updateResourceDisplay(resource);
            updateResourceDisplay('willpower'); // Update willpower display
            saveProgress();
        }
    }
}

function regenerateResources() {
    for (const resource in resources) {
        if (resources[resource] < maxResources[resource]) {
            resources[resource] = Math.min(resources[resource] + regenRates[resource], maxResources[resource]);
            updateResourceDisplay(resource);
        }
    }
    saveProgress();
}

function updateResourceDisplay(resource) {
    if (displayFormat[resource]) {
        document.getElementById(resource).innerText = `${Math.floor(resources[resource])}/${maxResources[resource]}`;
    } else {
        document.getElementById(resource).innerText = Math.floor(resources[resource]);
    }
}

function saveProgress() {
    localStorage.setItem('spartanResources', JSON.stringify(resources));
    localStorage.setItem('totalMinutesElapsed', totalMinutesElapsed);
}

function loadProgress() {
    const savedResources = localStorage.getItem('spartanResources');
    const savedMinutes = localStorage.getItem('totalMinutesElapsed');
    if (savedResources) {
        resources = JSON.parse(savedResources);
        updateUI();
    }
    if (savedMinutes) {
        totalMinutesElapsed = parseInt(savedMinutes, 10); // Parse saved minutes as a decimal number
        updateTimeUI();
    }
}

function updateUI() {
    for (const resource in resources) {
        updateResourceDisplay(resource);
    }
}

function updateTimeUI() {
    let totalMinutes = totalMinutesElapsed; // Use a local copy for calculations
    
    const yearsElapsed = Math.floor(totalMinutes / (timeConfig.seasonDays * timeConfig.hoursInDay * timeConfig.minutesInHour * 4));
    totalMinutes %= (timeConfig.seasonDays * timeConfig.hoursInDay * timeConfig.minutesInHour * 4);
    
    const seasonIndex = Math.floor(totalMinutes / (timeConfig.seasonDays * timeConfig.hoursInDay * timeConfig.minutesInHour));
    totalMinutes %= (timeConfig.seasonDays * timeConfig.hoursInDay * timeConfig.minutesInHour);
    
    const daysElapsed = Math.floor(totalMinutes / (timeConfig.hoursInDay * timeConfig.minutesInHour));
    totalMinutes %= (timeConfig.hoursInDay * timeConfig.minutesInHour);
    
    const hoursElapsed = Math.floor(totalMinutes / timeConfig.minutesInHour);
    const minutesElapsed = totalMinutes % timeConfig.minutesInHour;

    const currentYear = 1 + yearsElapsed;
    const currentSeason = timeConfig.seasons[seasonIndex];
    const currentDay = daysElapsed + 1;
    const currentHour = hoursElapsed;
    const currentMinute = minutesElapsed;

    document.getElementById('time').innerText = 
        `Year ${currentYear}, Day ${currentDay}, ${currentSeason} ${currentHour}:${currentMinute < 10 ? '0' + currentMinute : currentMinute}`;
}

function advanceTime() {
    totalMinutesElapsed++;
    updateTimeUI();
    saveProgress();
}

function toggleDisplayFormat(resource) {
    displayFormat[resource] = !displayFormat[resource];
    updateResourceDisplay(resource);
}

window.onload = function() {
    loadProgress();
    document.body.classList.remove('fade-out'); // Remove fade-out class on load
    setInterval(advanceTime, 1000); // 1000 ms = 1 second
    setInterval(regenerateResources, 200); // Regenerate resources every 0.2 seconds

    // Add event listeners for resource tooltips
    document.querySelectorAll('.resource-cell').forEach(element => {
        element.addEventListener('mouseover', showTooltip);
        element.addEventListener('mouseout', hideTooltip);
        element.addEventListener('mousemove', moveTooltip);
    });
    
    // Back to Menu functionality
    document.getElementById('back-to-menu-button').addEventListener('click', function() {
        fadeOutAndNavigate('index.html');
    });

    // Go home functionality
    document.getElementById('go-home-button').addEventListener('click', function() {
        fadeOutAndNavigate('home.html');
    });
}

function showTooltip(event) {
    const resource = event.currentTarget.getAttribute('data-resource');
    const tooltip = document.getElementById('tooltip');
    tooltip.innerHTML = `
        <strong>${resource.charAt(0).toUpperCase() + resource.slice(1)}</strong><br>
        Max: ${maxResources[resource]}<br>
        Regen Rate: ${regenRates[resource]}
    `;
    tooltip.style.visibility = 'visible';
    moveTooltip(event); // Position the tooltip
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.visibility = 'hidden';
}

function moveTooltip(event) {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.left = event.pageX + 10 + 'px';
    tooltip.style.top = event.pageY + 10 + 'px';
}

function fadeOutAndNavigate(url) {
    document.body.classList.add('fade-out');
    setTimeout(function() {
        window.location.href = url;
    }, 1000); // Match this duration with the CSS transition duration
}
