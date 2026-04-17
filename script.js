const CLIENT_ID = "e8a964df";
let audio = new Audio();
let songs = [];
let allSongs

let currentIndex = 0;
async function main() {
  const res = await fetch(
    `https://api.jamendo.com/v3.0/tracks/?client_id=${CLIENT_ID}&limit=50`
  );

  const data = await res.json();
  console.log(data);

  const favlist = document.querySelector(".favlist");
  allSongs = data.results;
songs = allSongs; // default: show all

  // CREATE FAVS
  data.results.forEach((song, index) => {
    
    let div = document.createElement("div");

    div.classList.add("fav");

    // store audio inside fav
    div.dataset.audio = song.audio;
    div.dataset.index = index;
    div.dataset.artist_name=song.artist_name

    div.innerHTML = `
      <img src="music-note-circle-svgrepo-com.svg" width="30">
      ${song.name}
      <div>
        play now
        <img src="play-circle-svgrepo-com.svg" width="30">
      </div>
    `;

    favlist.appendChild(div); 
  });
  function renderFavList(songArray) {
  const favlist = document.querySelector(".favlist");
  favlist.innerHTML = ""; // clear old list

  songArray.forEach((song, index) => {
    let div = document.createElement("div");
    div.classList.add("fav");

    div.dataset.index = index;
    div.dataset.audio = song.audio;
    div.dataset.artist_name=song.artist_name

    div.innerHTML = `
      <img src="music-note-circle-svgrepo-com.svg" width="30">
      ${song.name}
      <div>
        play now
        <img src="play-circle-svgrepo-com.svg" width="30">
      </div>
    `;

    favlist.appendChild(div);
  });
}

  if (data.results.length > 0) {
    audio.src = data.results[0].audio;
  }

  songs = data.results;

  favlist.addEventListener("click", (e) => {
    const fav = e.target.closest(".fav");
    const songUrl = fav.dataset.audio;

    const index = Number(fav.dataset.index);

    currentIndex = index;
    activeFav = fav;

    audio.src = songUrl;
    audio.play();
     document.querySelector(".play img").src = "pause-circle-svgrepo-com.svg";

  });
  document.querySelector(".play").addEventListener("click", (e) => {
    console.log("hi");
    if (audio.paused) {
      audio.play();
      document.querySelector(".play img").src = "pause-circle-svgrepo-com.svg";
    } else {
      audio.pause();
      document.querySelector(".play img").src = "play-circle-svgrepo-com.svg";
     
    }
  });
  setInterval(() => {
    let totalSeconds = Math.floor(audio.currentTime);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    document.querySelector(".time").innerHTML = `${minutes}:${seconds}`;
  }, 500);
  setInterval(() => {
    let totalSeconds = Math.floor(audio.duration);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    document.querySelector(".duration").innerHTML = `${minutes}:${seconds}`;
  }, 500);
  audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;

    const percent = (audio.currentTime / audio.duration) * 100;
    document.querySelector(".circle").style.left = percent + "%";
  });
  document.querySelector(".sickbar").addEventListener("click", (e) => {
    const bar = e.currentTarget;
    console.log(bar);
    const clickX = e.offsetX;
    console.log(clickX);
    const percent = clickX / bar.offsetWidth;

    audio.currentTime = percent * audio.duration;
  });
  document.querySelector(".next").addEventListener("click", (e) => {
    if (currentIndex < songs.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    audio.src = songs[currentIndex].audio;
    audio.play();
  });
  document.querySelector(".previous").addEventListener("click", (e) => {
    if (currentIndex > 0) {
      currentIndex--;
    } 
    audio.src = songs[currentIndex].audio;
    audio.play();
  });
  document.querySelector(".card").addEventListener("click", () => {
  songs = allSongs.filter(song => song.artist_name === "TriFace");

  currentIndex = 0;          // reset index
  renderFavList(songs);      // re-render fav list

  if (songs.length > 0) {
    audio.src = songs[0].audio; // load first song
  }
});
document.querySelector(".card2").addEventListener("click", () => {
  songs = allSongs.filter(song => song.artist_name === "Skaut");

  currentIndex = 0;          // reset index
  renderFavList(songs);      // re-render fav list

  if (songs.length > 0) {
    audio.src = songs[0].audio; // load first song
  }
});
document.querySelector(".card3").addEventListener("click", () => {
  songs = allSongs.filter(song => song.artist_name === "David TMX");

  currentIndex = 0;          // reset index
  renderFavList(songs);      // re-render fav list

  if (songs.length > 0) {
    audio.src = songs[0].audio; // load first song
  }
});
document.querySelector(".card4").addEventListener("click", () => {
  songs = allSongs.filter(song => song.artist_name === "Various Artists");

  currentIndex = 0;          // reset index
  renderFavList(songs);      // re-render fav list

  if (songs.length > 0) {
    audio.src = songs[0].audio; // load first song
  }
});



}

main();
