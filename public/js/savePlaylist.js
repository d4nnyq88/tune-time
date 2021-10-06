const saveInfo = require('/generate.js')

const saveButtonHandler = async (event) => {
  event.preventDefault();
  console.log('save button clicked')
  const name = saveInfo[0].name;
  const genre = saveInfo[0].genre;
  const track_list = saveInfo[0].trackList;
  const reqDuration = saveInfo[0].durationMinutes;
  const realDuration = saveInfo[0].duration;

  if (tracklist) {
    const response = await fetch(`/api/playlist/`, {
      method: 'POST',
      body: JSON.stringify({ name, genre,track_list,reqDuration,realDuration }),
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

const saveBtnClick=document.querySelector('#save');
  
saveBtnClick.addEventListener('click', saveButtonHandler());