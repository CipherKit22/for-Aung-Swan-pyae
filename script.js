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
    startCountdown();
  } else {
    showCuteError();
    clearInput();
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