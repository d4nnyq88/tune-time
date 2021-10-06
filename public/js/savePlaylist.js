const playlistInfo = require('./generate.js')

const saveButtonHandler = async (event) => {
  event.preventDefault();

  const name = playlistInfo.title;
  const genre = "random"
  const track_list = playlistInfo.tracks;
  const reqDur = 20000;
  const realDur = playlistInfo.totalDuration;


  if (tracklist) {
    const response = await fetch(`/api/playlist/`, {
      method: 'POST',
      body: JSON.stringify({ name, genre,track_list,reqDur,realDur }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to create project');
    }
  }
};

document
  .querySelector('.save_playlist')
  .addEventListener('click', saveButtonHandler);