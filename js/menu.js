document.getElementById('play-button').addEventListener('click', function() {
    fadeOutAndNavigate('game.html');
});

document.getElementById('reset-button').addEventListener('click', function() {
    if (confirm('Are you sure you want to reset all progress?')) {
        localStorage.removeItem('spartanResources');
        alert('Progress has been reset.');
    }
});

const themeSong = document.getElementById('theme-song');
const muteButton = document.getElementById('mute-button');

themeSong.play();

muteButton.addEventListener('click', function() {
    if (themeSong.muted) {
        themeSong.muted = false;
        muteButton.textContent = 'Mute';
    } else {
        themeSong.muted = true;
        muteButton.textContent = 'Unmute';
    }
});

function fadeOutAndNavigate(url) {
    const mainMenu = document.getElementById('main-menu');
    document.body.classList.add('fade-out');
    mainMenu.classList.add('fade-out');
    themeSong.volume = 1.0;

    const fadeAudio = setInterval(function () {
        if (themeSong.volume > 0.1) {
            themeSong.volume -= 0.1;
        } else {
            clearInterval(fadeAudio);
            themeSong.volume = 0;
        }
    }, 100);

    setTimeout(function() {
        window.location.href = url;
    }, 1000); // Match this duration with the CSS transition duration
}
