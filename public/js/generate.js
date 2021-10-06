// Playlist Generator
console.log(`Generating Playlist!`);

// Variables
const body = $(`body`);
const generateButton = $(`.generateButton`);
const promptForm = $(`.promptForm`);
const playlistPromptForm = $(`.playlistPromptForm`);
const closeBtn = $(`.closeBtn`);
const titlePlaylist = $(`.playlistTitle`);
const durationPlaylist = $(`.playlistDuration`);
const genrePlaylist = $(`.genres`);
const userPlaylist = $(`.userPlaylist`);
const modalTitle = $(`.hinner`);

const minMinutes = 10;
const maxMinutes = 120;

const generateBtn = $(`.submitBtn`);
promptForm.hide();
userPlaylist.hide();

const userPlaylists = [];
let genreID = ``;

// function genreSwitch(genre) {
//     genre = genreP;
//     switch(genre) {
//         case `Random`:
//         return genreID = ``; 
//     }
//     return genreID;
// }

// Custom Playlist Object
class Playlist {
    constructor(name,duration,durationMinutes,trackList) {
        this.name = name;
        this.duration = duration;
        this.durationMinutes = durationMinutes;
        this.trackList = trackList;
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

        console.log(`${titleP}: (Your New Playlist) - (${durationP} minutes) from the genre: ${genreP}`);

        // generatePlaylist(titleP,durationP,genreP);
        generatePlaylist(titleP,durationP);
        playlistPromptForm.hide(1000);
    })

    closeBtn.on(`click`, event => {
        promptFormHide();
    })
}

function promptFormHide() {
    promptForm.hide(1000);
} 

function generatePlaylist(title,duration) {
    // Custom Track Details
    const trackItems = [];
    let totalDuration = 0;
    let durationInS = duration * 60;
    let durationInMs = durationInS * 1000;
    userPlaylist.show(1000);

    let userList = [];

    console.log(`The duration of the ${title} playlist is ${duration} minutes or ${durationInMs} milliseconds.`);

    fetchTracks().then(tracks => {
        tracks.items.forEach(track => {
            const {track: {name, duration_ms, artists, id, href, album, external_urls}} = track;
            const release_date = track.track.album.release_date;
            const newTrack = new Track(name, duration_ms, artists[0].name,id,href,album,external_urls, release_date);
            trackItems.push(newTrack);
        })
        console.log(`The Master Playlist is: `);
        console.log(trackItems);

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
        console.log(userList);
        const durationMinutes = Math.floor(moment.duration(totalDuration).asMinutes());
        console.log(`The User Playlist is ${totalDuration} milliseconds long.`);
        console.log(`The User Playlist is ${durationMinutes} minutes long.`);

        modalTitle.html(`${title} - ${durationMinutes} minutes long`);

        const newPlaylist = new Playlist(modalTitle.html(),totalDuration,durationMinutes,userList);
        userPlaylists.push(newPlaylist);
        console.log(`User Playlist Is: `);
        console.log(userPlaylists);

        userList.forEach(track => {
            const trackID = track.id;

            const trackElement = $(`
            <div class="trackElement">
                <iframe src="https://open.spotify.com/embed/track/${trackID}" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
            </div>
            `);

            userPlaylist.append(trackElement);
        })
    })
    module.exports={title,userPlaylists,totalDuration,}
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

    const response = await fetch(`https://api.spotify.com/v1/playlists/${randomPlaylistID}/tracks?offset=0&limit=50`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });
    const tracks = await response.json();
    return tracks;
}

function shuffleArray(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}  
    
