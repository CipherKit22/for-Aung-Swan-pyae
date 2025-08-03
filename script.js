let password = "1234";
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
    alert("Incorrect password. Please try again.");
    clearInput();
  }
}

function startCountdown() {
  goToScreen("screen-countdown");
  let timeLeft = 3;

  function updateCountdown() {
    document.getElementById("countdownDisplay").innerText = timeLeft ;
    timeLeft--;
    if (timeLeft < 0) {
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