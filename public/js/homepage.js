// Animation
window.addEventListener('DOMContentLoaded', (event) => {
    let speakerAnimation = bodymovin.loadAnimation({
        container: document.getElementById('greenSpeaker'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: './js/greenSpeaker.json'
      })
});
