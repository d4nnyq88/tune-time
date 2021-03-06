// Playlist Generator

// Variables
let genreX = ``;
let genreID = ``;
let saveInfo = [];
let minMinutes = 10;
let maxMinutes = 121;

// Constants
const body = $(`body`);
const generateButton = $(`.generateButton`);
const promptForm = $(`.promptForm`);
const playlistPromptForm = $(`.playlistPromptForm`);
const closeBtn = $(`.closeBtn`);
const titlePlaylist = $(`.playlistTitle`);
const durationPlaylist = $(`.playlistDuration`);
const genrePlaylist = $(`.genres`);
const userPlaylist = $(`.userPlaylist`);
const buttonsRow = $(`.buttonsRow`);
const modalTitle = $(`.hinner`);
const saveButton = document.querySelector(`#save`);
const generateNewButton = $(`#generateNew`);
const generateBtn = $(`.submitBtn`);

// Initial Actions
promptForm.hide();
userPlaylist.hide();
buttonsRow.hide();

// Custom Playlist Object
class Playlist {
    constructor(name,duration,durationMinutes,trackList,genre) {
        this.name = name;
        this.duration = duration;
        this.durationMinutes = durationMinutes;
        this.trackList = trackList;
        this.genre = genre;
    }

    logInfo() {
        Object.values(this).forEach(value => {
            console.log(value);
        })
    }
}

// Custom Track Object
class Track {
    constructor(name,duration,artist,id,href,album,external_urls,releaseDate) {
        this.name = name;
        this.duration = duration;
        this.artist = artist;
        this.id = id;
        this.href = href;
        this.album = album;
        this.external_urls = external_urls;
        this.releaseDate = releaseDate;
    }

    logInfo() {
        Object.values(this).forEach(value => {
            console.log(value);
        })
    }
}

// Spotify Token
let token = ``;
const clientId = '8f62dc31962f42fabe1974961a756d45';
const clientSecret = 'ca84a1572ec940789947e1428e236a11';

const _getToken = async () => {

    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    token = data.access_token;
    return data.access_token;
};

_getToken();

// Prompt form when user clicks generateButton
generateButton.on(`click`, event => {
    promptFormShow();
})

// Functions
function promptFormShow() {
    promptForm.show(1000);

    generateBtn.on(`click`, event => {
        event.preventDefault();

        if (titlePlaylist.val() === `` || durationPlaylist.val() === `` || isNaN(durationPlaylist.val()) || durationPlaylist.val() < minMinutes || durationPlaylist.val() >= maxMinutes) {
            alert(`Please enter valid inputs into the fields.`)
            return;
        }

        let titleP = titlePlaylist.val();
        let durationP = durationPlaylist.val();
        let genreP = genrePlaylist.val();

        generatePlaylist(titleP,durationP,genreP);
        playlistPromptForm.hide(1000);
    })

    closeBtn.on(`click`, event => {
        promptFormHide();
    })
}

function promptFormHide() {
    promptForm.hide(1000);
}

generateNewButton.on(`click`,event => {
    userPlaylist.hide(1000);
    buttonsRow.hide(1000);
    modalTitle.html(`Generate New Playlist Form`);
    playlistPromptForm.show(1000);
})

function generatePlaylist(title,duration,genre) {

    // Custom Track Details
    const trackItems = [];
    let totalDuration = 0;
    let durationInS = duration * 60;
    let durationInMs = durationInS * 1000;
    userPlaylist.show(1000);

    let userList = [];
    let userPlaylists= [];
    genreX = genre;

    fetchTracks().then(tracks => {

        tracks.items.forEach(track => {
            const {track: {name, duration_ms, artists, id, href, album, external_urls}} = track;
            const release_dater = moment(track.track.album.release_date).format(`dddd, MMMM Do YYYY`);
            const newTrack = new Track(name, duration_ms, artists[0].name,id,href,album,external_urls, release_dater);
            trackItems.push(newTrack);
        })

        const shuffledTracks = [...trackItems];

        const shuffledMasterList = shuffleArray(shuffledTracks);

        for (var i = 0; i < shuffledMasterList.length; i++) {
            let durationInMilliseconds = shuffledMasterList[i].duration;
            totalDuration += durationInMilliseconds;

            if (totalDuration >= durationInMs) {
                break;
            } else {
                userList.push(shuffledMasterList[i]);
            }
        }

        userPlaylist.html(``);
        const durationMinutes = Math.floor(moment.duration(totalDuration).asMinutes());
        modalTitle.html(`${title}<span class="listDetails"> <span class="greenSep">|</span> ${durationMinutes} minutes long <span class="greenSep">|</span> ${userList.length} Track(s).</span>`);

        let newPlaylist = new Playlist(title,totalDuration,durationMinutes,userList, genre);
        userPlaylists.push(newPlaylist);
        saveInfo = userPlaylists;
        userList.forEach((track,index) => {
            const trackID = track.id;
            const durationTrackMinutes = Math.floor(moment.duration(track.duration).asMinutes());
            const trackElement = $(`
            <div class="trackElement">
                <iframe src="https://open.spotify.com/embed/track/${trackID}" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
                <div class="trackDetails">
                    ${index+1}.
                    <marquee><a href="/">${track.name}</a> by ${track.artist} <span class="greenSep">|</span> ${durationTrackMinutes} Minute(s) <span class="greenSep">|</span> Published on ${track.releaseDate}</marquee>
                </div>
            </div>
            `);

            userPlaylist.append(trackElement);
        })
        
      })
      buttonsRow.show(1000);
    }
    
    if (saveButton) {
    saveButton.addEventListener('click', async (event) => {
        
        const name = saveInfo[0].name;
        const genre = saveInfo[0].genre;
        const track_list = saveInfo[0].trackList;
        const reqDuration = saveInfo[0].durationMinutes;
        const realDuration = saveInfo[0].duration;
       
        const response = await fetch(`/api/playlist/`, {
            method: 'POST',
            body: JSON.stringify({ name, genre,track_list,reqDuration,realDuration }),
            headers: {
              'Content-Type': 'application/json',
            },
            
          });
          
          const data = await response.json();
          console.log(data);

          if (response.ok) {
            document.location.replace('/dashboard');
          } else {
            alert('Failed to create project');
            return;
          }
        
      });   
    }

async function fetchTracks() {

    // Playlists to Fetch
    const playlistsToFetch = [
        `37i9dQZEVXbMDoHDwVN2tF`, // Top 50 Global
        `37i9dQZEVXbLRQDuF5jeBp`, // Top 50 USA
        `37i9dQZEVXbLiRSasKsNU9` // Viral 50
    ];

    const shuffledIDs = [...playlistsToFetch];

    const shuffledMasterIDs = shuffleArray(shuffledIDs);
    var randomPlaylistID = shuffledMasterIDs[0];

    function genreSwitch(genre) {
        genre = genreX;
        switch(genre) {
            case `Random`:
            return genreID = randomPlaylistID;
            case `Rap`:
            return genreID = `37i9dQZF1DX0XUsuxWHRQd`;
            case `Rock`:
            return genreID = `37i9dQZF1DXcF6B6QPhFDv`;
            case `Pop`:
            return genreID = `37i9dQZF1DXarRysLJmuju`;
            case `R&B`:
            return genreID = `37i9dQZF1DX4SBhb3fqCJd`;
            case `Country`:
            return genreID = `37i9dQZF1DX1lVhptIYRda`;
            case `Metal`:
            return genreID = `37i9dQZF1DWTcqUzwhNmKv`;
            case `Metalcore`:
            return genreID = `79QHayucQm6M4wUlUbhQNQ`;
            case `Hip Hop`:
            return genreID = `0FAb3s3yJArWnikZbEOO9p`;
        }
        return genreID;
    }

    const response = await fetch(`https://api.spotify.com/v1/playlists/${genreSwitch()}/tracks?offset=0&limit=50`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });
    const tracks = await response.json();
    return tracks;
}

function shuffleArray(array) {

    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex != 0) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

const trackElems = document.querySelectorAll(`.trackElem`);
trackElems.forEach((elem) => {
    elem.addEventListener(`click`, async function trackObject(event,index) {
        let trackIdentityMain = event.target.getAttribute(`data-trackID`);
        let trackGenre = event.target.parentElement.id;
        let trackDuration = elem.querySelector(`.trackDuration`).innerHTML;
        const response = await fetch(`https://api.spotify.com/v1/tracks/${trackIdentityMain}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });
        const track = await response.json();
        window.location.href = `/track?=${track.name}`;
        localStorage.setItem(`Selected Track`, JSON.stringify(track));
        localStorage.setItem(`Track Genre`, trackGenre);
        localStorage.setItem(`Track Duration`, trackDuration);
    })
})