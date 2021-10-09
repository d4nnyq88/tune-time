// Fetch Track
window.addEventListener(`DOMContentLoaded`, event => {
    let songTitle = document.querySelector(`#song-title`);
    let albumCover = document.querySelector(`#album-cover`);
    let albumTrack = document.querySelector(`#albumTrack`);
    let artistTrack = document.querySelector(`#artistTrack`);
    let releaseDateTrack = document.querySelector(`#release-dateTrack`);
    let genreTrack = document.querySelector(`#genreTrack`);
    let durationTrack = document.querySelector(`#durationTrack`);
    let rating = document.querySelector(`#rating`);
    let trackObject = JSON.parse(localStorage.getItem(`Selected Track`));
    console.log(trackObject);

    songTitle.innerHTML = trackObject.name;
    albumCover.setAttribute(`src`,trackObject.album.images[0].url);
    durationTrack.innerHTML = `<span class="trackDuration">Duration: </span> ` + localStorage.getItem(`Track Duration`);
    albumTrack.innerHTML = `<span class="albumName">Album: </span> ` + trackObject.album.name;
    rating.innerHTML = `<span class="rating">Rating: </span> <div class="starRating"></div>`;
    genreTrack.innerHTML = `<span class="genreName">Genre: </span> ` + localStorage.getItem(`Track Genre`);
    releaseDateTrack.innerHTML = `<span class="release_date">Release Date: </span> ` + moment(trackObject.album.release_date).format(`dddd, MMMM Do | YYYY`);
    if (trackObject.artists.length === 1) {
        artistTrack.innerHTML = `<span class="songArtist">Artist: </span> `;
        artistTrack.append(trackObject.artists[0].name);
    } else {
        artistTrack.innerHTML = `<span class="songArtist">Artist(s): </span> `;
        trackObject.artists.forEach(artist => {
            let artistName = artist.name;
            artistTrack.append(artistName + ', ');
        })
    }
})