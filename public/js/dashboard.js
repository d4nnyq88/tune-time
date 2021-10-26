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
            let trackNumHTML = document.querySelector(`.trackNum`);

            // Track Info
            let trackObj = JSON.parse(playlist.parentElement.getAttribute(`data-trackList`));
            trackObj.forEach((track,index) => {
                let trackObject = {
                    albumImage: track.album.images[1].url,
                    trackLink: track.external_urls.spotify,
                    trackName: track.name,
                    trackID: track.id,
                    trackReleaseDate: track.releaseDate,
                    trackArtist: track.artist,
                    trackDuration: track.duration,
                    trackMin: Math.floor(moment.duration(track.duration).asMinutes()),
                    trackNum: index+1
                }
                let contentString = `${trackObject.trackNum}) ${trackObject.trackName} - ${trackObject.trackArtist} | ${trackObject.trackMin} Min.`;
                let contentStringMobile = `${trackObject.trackNum}) ${trackObject.trackName} - ${trackObject.trackArtist}`;
                let albumImage = track.album.images[1].url;
                let track1Row = document.createElement(`div`);
                track1Row.setAttribute(`class`,`trackImage`);
                let trackLink = document.createElement(`a`);
                trackLink.setAttribute(`class`,`albumImageLink`);
                trackLink.setAttribute(`target`,`_blank`);
                trackLink.setAttribute(`href`,track.external_urls.spotify);
                trackLink.setAttribute(`title`,`Album Image Link`);
                trackLink.setAttribute(`data-trackInfo`, contentString);
                trackLink.setAttribute(`data-trackInfoMobile`, contentStringMobile);
                let track1Image = document.createElement(`img`);
                track1Image.setAttribute(`src`,`${albumImage}`);
                track1Image.setAttribute(`alt`,`albumImage`);
                track1Image.setAttribute(`class`,`albumImage`);
                trackLink.append(track1Image)
                track1Row.append(trackLink);
                dashboardLeftBottom.append(track1Row);
            })

            let playListName = event.target.parentElement.querySelector(`.playListName`).innerHTML;
            let playListGenre = event.target.parentElement.querySelector(`.listofGenre`).innerHTML;
            let playListDuration = event.target.parentElement.querySelector(`.durationMS`).innerHTML;
            let playListIndex = event.target.parentElement.querySelector(`.playListIndex`).innerHTML;
            let playListTrackNum = event.target.parentElement.querySelector(`.numOf`).innerHTML;
            let playListID = parseInt(event.target.parentElement.id);
            // let playListTrackList = JSON.parse(event.target.getAttribute(`data-tracklist`));

            let playlistToShow = document.querySelector(`.PLTrackList${playListID}`);
            playlistToShow.style.display = `flex`;

            nameHTML.innerHTML = 'Playlist<span class="greenSep">:</span> ' + playListIndex + ' ' + playListName;
            genreHTML.innerHTML = playListGenre;
            durationHTML.innerHTML = '<span class="greenSep"> - </span>' + playListDuration;
            trackNumHTML.innerHTML = playListTrackNum;
        })
    })
