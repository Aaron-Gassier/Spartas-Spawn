let resources = {
    strength: 0,
    endurance: 0,
    wisdom: 0,
    honor: 0
    // Add more resources as needed
};

let totalMinutesElapsed = 49440;

const timeConfig = {
    seasonDays: 30,
    hoursInDay: 24,
    minutesInHour: 60,
    seasons: ["Spring", "Summer", "Fall", "Winter"]
};

function gatherResource(resource) {
    resources[resource]++;
    document.getElementById(resource).innerText = resources[resource];
    saveProgress();
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
        if (resources.hasOwnProperty(resource)) {
            document.getElementById(resource).innerText = resources[resource];
        }
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

window.onload = function() {
    loadProgress();
    document.body.classList.remove('fade-out'); // Remove fade-out class on load
    setInterval(advanceTime, 1000); // 1000 ms = 1 second
}

// Back to Menu functionality
document.getElementById('back-to-menu-button').addEventListener('click', function() {
    fadeOutAndNavigate('index.html');
});

function fadeOutAndNavigate(url) {
    document.body.classList.add('fade-out');
    setTimeout(function() {
        window.location.href = url;
    }, 1000); // Match this duration with the CSS transition duration
}