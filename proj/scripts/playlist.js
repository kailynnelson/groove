const spotifyApi = 'https://api.spotify.com/v1/';

const form = document.getElementById('formGetPlaylist');

// when id received, show 'showPlaylist'
// action="/get-playlist" 

form.addEventListener('submit', function(event) {
    // console.log('func worked! funky');
    event.preventDefault();

    let playlistId = form.elements['playlistIdInput'];
    playlistId = playlistId.value;

    if (playlistId != '' && playlistId != null) {
        console.log('playlist id:', playlistId);
        document.getElementById('showPlaylist').style.display = 'block';
        document.getElementById('playlistIdDisplay').innerText = playlistId;
        document.getElementById('playlistNameDisplay').innerText = 'name here';
    } else {
        alert('give us a playlist id, you rat!');
    }
});

form.addEventListener('reset', function() {
    document.getElementById('showPlaylist').style.display = 'none';
});