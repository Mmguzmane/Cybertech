const video = document.getElementById('miVideo');

window.addEventListener('load', () => {
    video.play();
});

video.addEventListener('ended', () => {
    video.currentTime = 0;
    video.play(); 
});