const audioPlayer = document.getElementById("audio-player");
const progressBar = document.getElementById("progress");
const songTitle = document.getElementById("song-title");
const image = document.getElementById("img");
const currenttime = document.getElementById("current");
const totaltime = document.getElementById("total-time");

const songs = [
  "./songs/Agar Ho Tum - Mr. And Mrs. Mahi .mp3",
  "./songs/Ishq Mein - Nadaaniyan.mp3",
  "./songs/Tu Hai Champion - Chandu Champion .mp3 ",
  "./songs/128-Rabba Mereya - B Praak 128 Kbps.mp3",
  "./songs/wavy.mp3",
  "./songs/128-Jo Tum Mere Ho - Anuv Jain 128 Kbps.mp3",
  "./songs/128-Suniyan Suniyan - Juss 128 Kbps.mp3",
  "./songs/128-Ve Haaniyaan - Avvy Sra 128 Kbps.mp3",
  "./songs/We_Rollin_1.mp3",
  "./songs/Routine.mp3",
  "./songs/Fell_For_You.mp3",
  "./songs/52_Bars_1.mp3",
 
];

const images = [
    "./images/agarhotum.jpg",
    "./images/ishqmainnadaniiyan.jpg",
    "./images/tuhainchampion.jpg",
    "./images/rabbamerya.jpg",
    "./images/wavy.jpg",
    "./images/anuvjain.jpg",
    "./images/Suniyan Suniyan - Juss.jpg",
    "./images/Ve Haaniyaan - Avvy Sra.jpg",
    "./images/rollin.jpg",
    "./images/Routinr.jpg",
    "./images/fellforyou.jpg",
    "./images/52-Bars-1.jpg",
    
];

let currentSongIndex = 0;

// Load Song
function loadSong(index) {
  audioPlayer.src = songs[index];
  songTitle.innerText = songs[index].split("/").pop().split(".mp3")[0];
  image.src = images[index];
  progressBar.value = 0; // Reset progress bar
  currenttime.innerHTML = "0:00"; // Reset current time
}

// Play or Pause
function playPause() {
  let btn = document.getElementById("button");

  if (audioPlayer.paused) {
    audioPlayer.play();
    btn.classList.remove("fa-play");
    btn.classList.add("fa-pause");
    image.classList.remove("pauseclass");
    image.classList.add("music-img");
  } else {
    audioPlayer.pause();
    btn.classList.remove("fa-pause");
    btn.classList.add("fa-play");
    image.classList.remove("music-img");
    image.classList.add("pauseclass");
  }
}

// Generate Random Color
function colorgenerator() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Play Next Song
function nextSong() {
  audioPlayer.pause();
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  audioPlayer.play(); // Auto-play next song

  // Change background gradient
  let first_color = colorgenerator();
  let second_color = colorgenerator();
  document.body.style.background = `linear-gradient(to right, ${first_color}, ${second_color})`;

  // Update play/pause button state
  let btn = document.getElementById("button");
  btn.classList.remove("fa-play");
  btn.classList.add("fa-pause");
  image.classList.add("music-img");
}

// Play Previous Song
function prevSong() {
  audioPlayer.pause();
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  audioPlayer.play(); // Auto-play previous song

  // Change background gradient
  let first_color = colorgenerator();
  let second_color = colorgenerator();
  document.body.style.background = `linear-gradient(to right, ${first_color}, ${second_color})`;

  // Update play/pause button state
  let btn = document.getElementById("button");
  btn.classList.remove("fa-play");
  btn.classList.add("fa-pause");
  image.classList.add("music-img");
}

// Update progress bar
audioPlayer.addEventListener("timeupdate", () => {
  if (!isNaN(audioPlayer.duration)) {
    progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    let currentMin = Math.floor(audioPlayer.currentTime / 60);
    let currentSec = Math.floor(audioPlayer.currentTime % 60);
    currenttime.innerHTML = `${currentMin}:${currentSec < 10 ? "0" : ""}${currentSec}`;
  }
});

// Wait for metadata to load
audioPlayer.addEventListener("loadedmetadata", () => {
  if (!isNaN(audioPlayer.duration)) {
    let totalMin = Math.floor(audioPlayer.duration / 60);
    let totalSec = Math.floor(audioPlayer.duration % 60);
    totaltime.innerText = `${totalMin}:${totalSec < 10 ? '0' : ''}${totalSec}`;
  }
});

// Adjust song time when progress bar is moved
progressBar.addEventListener("input", () => {
  audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
});

// Load the first song
loadSong(currentSongIndex);
