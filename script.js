let password = "472021";
let inputString = "";
let countdownTimer;

// Add event listeners after DOM is loaded
window.onload = function () {
  // Always show password screen on load
  goToScreen("screen-password");
  clearInput();
};

function press(num) {
  if (inputString.length < 8) { // Limit input length if needed
    inputString += num;
    document.getElementById("pwd").value = "*".repeat(inputString.length);
  }
}

function clearInput() {
  inputString = "";
  document.getElementById("pwd").value = "";
}

function confirmInput() {
  if (inputString === password) {
    playBackgroundMusic();
    startCountdown();
  } else {
    showCuteError();
    clearInput();
  }
}

function playBackgroundMusic() {
  const music = document.getElementById('backgroundMusic');
  if (music) {
    // Set volume to a comfortable level
    music.volume = 0.3;
    
    // Try to play the music
    music.play().then(() => {
      console.log('Background music started playing');
    }).catch((error) => {
      console.log('Could not play background music:', error);
      // If audio file doesn't exist, create a simple tone using Web Audio API
      createSimpleBackgroundTone();
    });
  }
}

function createSimpleBackgroundTone() {
  // Create a simple pleasant background tone using Web Audio API
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create a gentle, romantic melody
    const playNote = (frequency, startTime, duration) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, startTime);
      oscillator.type = 'sine';
      
      // Gentle fade in and out
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.1, startTime + 0.1);
      gainNode.gain.linearRampToValueAtTime(0.05, startTime + duration - 0.1);
      gainNode.gain.linearRampToValueAtTime(0, startTime + duration);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    };
    
    // Simple romantic melody (C major scale)
    const melody = [
      {note: 523.25, duration: 0.8}, // C5
      {note: 587.33, duration: 0.8}, // D5
      {note: 659.25, duration: 0.8}, // E5
      {note: 698.46, duration: 1.2}, // F5
      {note: 659.25, duration: 0.8}, // E5
      {note: 587.33, duration: 0.8}, // D5
      {note: 523.25, duration: 1.6}, // C5
    ];
    
    let currentTime = audioContext.currentTime;
    
    // Play the melody once
    melody.forEach(({note, duration}) => {
      playNote(note, currentTime, duration);
      currentTime += duration + 0.2; // Small pause between notes
    });
    
    console.log('Simple background tone created');
  } catch (error) {
    console.log('Web Audio API not supported:', error);
  }
}

function showCuteError() {
  // Create error message element
  const errorDiv = document.createElement('div');
  errorDiv.className = 'cute-error';
  errorDiv.innerHTML = `
    <div class="error-content">
      <div class="error-icon">😔</div>
      <h3>Oops! Wrong password</h3>
      <p>Try again, my love! 💕</p>
      <button onclick="closeCuteError()" class="error-button">OK</button>
    </div>
  `;
  
  document.body.appendChild(errorDiv);
  
  // Animate in
  setTimeout(() => {
    errorDiv.classList.add('show');
  }, 10);
}

function closeCuteError() {
  const errorDiv = document.querySelector('.cute-error');
  if (errorDiv) {
    errorDiv.classList.remove('show');
    setTimeout(() => {
      errorDiv.remove();
    }, 300);
  }
}

function startCountdown() {
  goToScreen("screen-countdown");
  let timeLeft = 3;
  const cuteMessages = [
    "3",
    "2", 
    "1",
    "Ready!"
  ];

  function updateCountdown() {
    if (timeLeft >= 0) {
      document.getElementById("countdownDisplay").innerText = cuteMessages[3 - timeLeft];
    }
    timeLeft--;
    if (timeLeft < -1) {
      clearInterval(countdownTimer);
      goToScreen("screen-greeting");
    }
  }

  updateCountdown();
  countdownTimer = setInterval(updateCountdown, 1000);
}

function goToScreen(screenId) {
  const screens = document.querySelectorAll(".screen");
  screens.forEach(screen => {
    screen.classList.remove("active");
  });
  const activeScreen = document.getElementById(screenId);
  if (activeScreen) {
    activeScreen.classList.add("active");
  }
}

// New code for the options screen
function openEnvelope() {
  const lid = document.getElementById("lid");
  const letter = document.getElementById("letter");
  lid.classList.add("open");
  setTimeout(() => {
    letter.classList.add("pop");
  }, 900); // Wait for lid animation
}

function showLetter() {
  const letterContent = document.getElementById("letterContent");
  letterContent.classList.add("show");

  // After 20 seconds, fly away the letter and hide envelope, then show photos
  setTimeout(() => {
    letterContent.classList.add("fly-away");
    document.querySelector('.envelope').classList.add('hide');
    setTimeout(showPhotos, 1200); // Wait for fly-away animation
  }, 20000);
}

function showPhotos() {
  // Add your photo URLs here
  const photoUrls = [
    "photo_1_2025-08-03_23-20-32.jpg", "photo_3_2025-08-03_23-20-32.jpg", "photo_4_2025-08-03_23-20-32.jpg",
     "photo_2_2025-08-03_23-20-32.jpg", "photo_7_2025-08-03_23-20-32.jpg",
    "photo_5_2025-08-03_23-20-32.jpg", "photo_6_2025-08-03_23-20-32.jpg", "photo_8_2025-08-03_23-20-32.jpg", 
    "", ""
  ];

  const gallery = document.createElement('div');
  gallery.className = 'photo-gallery';
  document.body.appendChild(gallery);

  photoUrls.forEach((url, i) => {
    const img = document.createElement('img');
    img.src = url;
    gallery.appendChild(img);
    setTimeout(() => {
      img.classList.add('show');
    }, 400 * i); // Stagger each photo
  });
}