// Playlist Generator
console.log(`Generating Playlist!`);

// Variables
const body = $(`body`);
const generateButton = $(`.generateButton`);
const promptForm = $(`.promptForm`);
const closeBtn = $(`.closeBtn`);
const titlePlaylist = $(`.playlistTitle`);
const durationPlaylist = $(`.playlistDuration`);
const generateBtn = $(`.submitBtn`);
promptForm.hide();

// Custom Track Object
class Track {
    constructor(name,duration,artist,id,href,album,external_urls) {
        this.name = name;
        this.duration = duration;
        this.artist = artist;
        this.id = id;
        this.href = href;
        this.album = album;
        this.external_urls = external_urls;
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

        if (titlePlaylist.val() === `` || durationPlaylist.val() === `` || isNaN(durationPlaylist.val()) || durationPlaylist.val() < 15 || durationPlaylist.val() >= 30) {
            alert(`Please enter valid inputs into the fields.`)
            return;
        }

        let titleP = titlePlaylist.val();
        let durationP = durationPlaylist.val();

        console.log(`${titleP}: (Your New Playlist) - (${durationP} minutes)`);

        generatePlaylist(titleP,durationP);
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

    let userList = [];

    console.log(`The duration of the ${title} playlist is ${duration} minutes or ${durationInMs} milliseconds.`);

    fetchTracks().then(tracks => {
        tracks.items.forEach(track => {
            const {track: {name, duration_ms, artists, id, href, album, external_urls}} = track;
            const newTrack = new Track(name, duration_ms, artists[0].name,id,href,album,external_urls);
            trackItems.push(newTrack);
        })
        console.log(`The Master Playlist is: `);
        console.log(trackItems);

        for (var i = 0; i < trackItems.length; i++) {
            let durationInMilliseconds = trackItems[i].duration;
            totalDuration += durationInMilliseconds;

            if (totalDuration >= durationInMs) {
                break;
            } else {
                userList.push(trackItems[i]);
            }
        }
        console.log(userList);
        const durationMinutes = Math.floor(moment.duration(totalDuration).asMinutes());
        console.log(`The User Playlist is ${totalDuration} milliseconds long.`);
        console.log(`The User Playlist is ${durationMinutes} minutes long.`);
    })
    return trackItems;
}

async function fetchTracks() {

    // Playlists to Fetch
    const playlistsToFetch = [
        `37i9dQZEVXbMDoHDwVN2tF`, // Top 50 Global
        `37i9dQZEVXbLRQDuF5jeBp`, // Top 50 USA
        `37i9dQZEVXbLiRSasKsNU9` // Viral 50
    ];

    var x = Math.floor(Math.random() * playlistsToFetch.length) + 1;
    var randomPlaylistID = playlistsToFetch[x];

    const response = await fetch(`https://api.spotify.com/v1/playlists/${randomPlaylistID}/tracks?offset=0&limit=50`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });
    const tracks = await response.json();
    return tracks;
}