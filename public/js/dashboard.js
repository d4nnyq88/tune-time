// Dashboard JS

// Alter Playlist Durations // Converting from Milliseconds to Minutes
const durationMS = document.querySelectorAll(`.durationMS`);
durationMS.forEach(duration => {
    let ms = parseInt(duration.innerHTML);
    let minuteDuration = Math.floor(moment.duration(ms).asMinutes());
    duration.innerHTML = minuteDuration + ' Min.';
})

const trackDurations = document.querySelectorAll(`.trackDuration`);
trackDurations.forEach(track => {
    let ms = parseInt(track.innerHTML);
    let minuteDuration = Math.floor(moment.duration(ms).asMinutes());
    track.innerHTML = minuteDuration + ' Min.';
})

// Alter Playlist Index // Converting Index from starting at 0 to starting at 1
const indexes = document.querySelectorAll(`.index`);
indexes.forEach(index => {
    let innerIndex = parseInt(index.innerHTML) + 1;
    index.innerHTML = innerIndex;
})

const trackLs = document.querySelectorAll(`.track-list`);
trackLs.forEach(L => {
    L.style.display = `none`;
})

let dashboardLeftBottom = document.querySelector(`.dashboardLeftBottom`);
const playListNames = document.querySelectorAll(`.playListName`);
    playListNames.forEach(playlist => {
        playlist.addEventListener(`click`,event => {

            dashboardLeftBottom.innerHTML = ``;

            trackLs.forEach(L => {
                L.style.display = `none`;
            })

            document.querySelector(`.playListTracks`).style.display = `none`;

            let nameHTML = document.querySelector(`.nameOfList`);
            let genreHTML = document.querySelector(`.genreList`);
            let durationHTML = document.querySelector(`.durationList`);

            // Track Info
            let trackObj = JSON.parse(playlist.parentElement.getAttribute(`data-track`));
            trackObj.forEach(track => {
                let albumImage = track.album.images[0].url;
                let track1Row = document.createElement(`div`);
                track1Row.setAttribute(`class`,`trackImage`);
                let track1Image = document.createElement(`img`);
                track1Image.setAttribute(`src`,`${albumImage}`);
                track1Image.setAttribute(`alt`,`albumImage`);
                track1Image.setAttribute(`class`,`albumImage`);
                track1Row.append(track1Image);
                dashboardLeftBottom.append(track1Row);
            })

            let playListName = event.target.parentElement.querySelector(`.playListName`).innerHTML;
            let playListGenre = event.target.parentElement.querySelector(`.listofGenre`).innerHTML;
            let playListDuration = event.target.parentElement.querySelector(`.durationMS`).innerHTML;
            let playListID = parseInt(event.target.parentElement.id);
            // let playListTrackList = JSON.parse(event.target.getAttribute(`data-tracklist`));

            let playlistToShow = document.querySelector(`.PLTrackList${playListID}`);
            playlistToShow.style.display = `flex`;

            nameHTML.innerHTML = 'Playlist: ' + playListName + ': ';
            genreHTML.innerHTML = playListGenre + ' - ';
            durationHTML.innerHTML = playListDuration;
        })
    })
