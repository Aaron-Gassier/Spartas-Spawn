let resources = {
    strength: 0,
    endurance: 0,
    wisdom: 0,
    honor: 0
    // Add more resources as needed
};

function gatherResource(resource) {
    resources[resource]++;
    document.getElementById(resource).innerText = resources[resource];
    saveProgress();
}

function saveProgress() {
    localStorage.setItem('spartanResources', JSON.stringify(resources));
}

function loadProgress() {
    const savedResources = localStorage.getItem('spartanResources');
    if (savedResources) {
        resources = JSON.parse(savedResources);
        updateUI();
    }
}

function updateUI() {
    for (const resource in resources) {
        if (resources.hasOwnProperty(resource)) {
            document.getElementById(resource).innerText = resources[resource];
        }
    }
}

// Initial story setup
let story = document.getElementById('story');
if (story) {
    story.innerText = 'You are a young Spartan, beginning your journey...';
}

window.onload = function() {
    loadProgress();
    document.body.classList.remove('fade-out'); // Remove fade-out class on load
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