let resources = {
    strength: 0,
    endurance: 0,
    wisdom: 0,
    honor: 0
    // Add more resources as needed
};

let time = {
    minute: 0,
    hour: 8,
    day: 5,
    season: 1, // 0: Spring, 1: Summer, 2: Fall, 3: Winter
    year: 1,
    seasonDays: 30,
    seasons: ["Spring", "Summer", "Fall", "Winter"],
};

function gatherResource(resource) {
    resources[resource]++;
    document.getElementById(resource).innerText = resources[resource];
    saveProgress();
}

function saveProgress() {
    localStorage.setItem('spartanResources', JSON.stringify(resources));
    localStorage.setItem('gameTime', JSON.stringify(time));
}

function loadProgress() {
    const savedResources = localStorage.getItem('spartanResources');
    const savedTime = localStorage.getItem('gameTime');
    if (savedResources) {
        resources = JSON.parse(savedResources);
        updateUI();
    }
    if (savedTime) {
        const parsedTime = JSON.parse(savedTime);
        // Ensure all fields are properly set
        time = { ...time, ...parsedTime };
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
    document.getElementById('time').innerText = 
        `Year ${time.year}, Day ${time.day}, ${time.seasons[time.season]} ${time.hour}:${time.minute < 10 ? '0' + time.minute : time.minute}`;
}

function advanceTime() {
    time.minute++;
    if (time.minute >= 60) {
        time.minute = 0;
        time.hour++;
        if (time.hour >= 24) {
            time.hour = 0;
            time.day++;
            if (time.day > time.seasonDays) {
                time.day = 1;
                time.season = (time.season + 1) % 4;
                if (time.season === 0) {
                    time.year--;
                }
            }
        }
    }
    updateTimeUI();
    saveProgress();
}

// Initial story setup
let story = document.getElementById('story');
if (story) {
    story.innerText = 'You are a young Spartan, beginning your journey...';
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