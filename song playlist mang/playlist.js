// playlist.js
document.addEventListener('DOMContentLoaded', () => {
    const newPlaylistForm = document.getElementById('newPlaylistForm');
    const playlistNameInput = document.getElementById('playlistName');
    const selectPlaylist = document.getElementById('selectPlaylist');
    const songForm = document.getElementById('songForm');
    const searchInput = document.getElementById('search');
    const filterGenre = document.getElementById('filterGenre');
    const sortOptions = document.getElementById('sortOptions');
    const playlistTable = document.getElementById('playlistTable').getElementsByTagName('tbody')[0];
  
    let playlists = JSON.parse(localStorage.getItem('playlists')) || { default: [] };
    let currentPlaylist = 'default';
  
    function savePlaylists() {
      localStorage.setItem('playlists', JSON.stringify(playlists));
    }
  
    function loadPlaylists() {
      selectPlaylist.innerHTML = '';
      Object.keys(playlists).forEach(playlist => {
        const option = document.createElement('option');
        option.value = playlist;
        option.textContent = playlist;
        selectPlaylist.appendChild(option);
      });
      selectPlaylist.value = currentPlaylist;
    }
  
    function renderPlaylist() {
      playlistTable.innerHTML = '';
      const searchTerm = searchInput.value.toLowerCase();
      const selectedGenre = filterGenre.value;
      const sortBy = sortOptions.value;
  
      let songs = playlists[currentPlaylist];
  
      if (searchTerm) {
        songs = songs.filter(song => song.title.toLowerCase().includes(searchTerm) || song.artist.toLowerCase().includes(searchTerm));
      }
  
      if (selectedGenre) {
        songs = songs.filter(song => song.genre === selectedGenre);
      }
  
      songs.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
      });
  
      songs.forEach((song, index) => {
        const row = playlistTable.insertRow();
        row.innerHTML = `
          <td>${song.title}</td>
          <td>${song.artist}</td>
          <td>${song.duration}</td>
          <td>${song.genre}</td>
          <td class="actions">
            <button onclick="editSong(${index})">Edit</button>
            <button onclick="deleteSong(${index})">Delete</button>
          </td>
        `;
      });
    }
  
    function addSong(event) {
      event.preventDefault();
      const title = document.getElementById('title').value;
      const artist = document.getElementById('artist').value;
      const duration = document.getElementById('duration').value;
      const genre = document.getElementById('genre').value;
  
      playlists[currentPlaylist].push({ title, artist, duration, genre });
      savePlaylists();
      renderPlaylist();
      songForm.reset();
    }
  
    function editSong(index) {
      const song = playlists[currentPlaylist][index];
      document.getElementById('title').value = song.title;
      document.getElementById('artist').value = song.artist;
      document.getElementById('duration').value = song.duration;
      document.getElementById('genre').value = song.genre;
  
      songForm.removeEventListener('submit', addSong);
      songForm.addEventListener('submit', function updateSong(event) {
        event.preventDefault();
        playlists[currentPlaylist][index] = {
          title: document.getElementById('title').value,
          artist: document.getElementById('artist').value,
          duration: document.getElementById('duration').value,
          genre: document.getElementById('genre').value
        };
        savePlaylists();
        renderPlaylist();
        songForm.reset();
        songForm.removeEventListener('submit', updateSong);
        songForm.addEventListener('submit', addSong);
      });
    }
  
    function deleteSong(index) {
      playlists[currentPlaylist].splice(index, 1);
      savePlaylists();
      renderPlaylist();
    }
  
    function createPlaylist(event) {
      event.preventDefault();
      const playlistName = playlistNameInput.value.trim();
      if (playlistName && !playlists[playlistName]) {
        playlists[playlistName] = [];
        currentPlaylist = playlistName;
        savePlaylists();
        loadPlaylists();
        renderPlaylist();
        playlistNameInput.value = '';
      }
    }
  
    function switchPlaylist() {
      currentPlaylist = selectPlaylist.value;
      renderPlaylist();
    }
  
    newPlaylistForm.addEventListener('submit', createPlaylist);
    selectPlaylist.addEventListener('change', switchPlaylist);
    songForm.addEventListener('submit', addSong);
    searchInput.addEventListener('input', renderPlaylist);
    filterGenre.addEventListener('change', renderPlaylist);
    sortOptions.addEventListener('change', renderPlaylist);
  
    loadPlaylists();
    renderPlaylist();
  });
  