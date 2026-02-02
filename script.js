const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const container = document.getElementById("container");
const result = document.getElementById("result");
const warning = document.querySelector(".warning");

// --------------------
// MOVE NO ANYWHERE
// --------------------
function moveNoButton() {
  const padding = 20;

  // Add 'moving' class to switch to fixed positioning
  if (!noBtn.classList.contains("moving")) {
    noBtn.classList.add("moving");
  }

  const maxX = window.innerWidth - noBtn.offsetWidth - padding;
  const maxY = window.innerHeight - noBtn.offsetHeight - padding;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
}

// Move when close (desktop)
document.addEventListener("mousemove", (e) => {
  const rect = noBtn.getBoundingClientRect();

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const distance = Math.hypot(
    e.clientX - centerX,
    e.clientY - centerY
  );

  if (distance < 120) {
    moveNoButton();
  }
});

// Move when tapped (mobile)
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
});

// --------------------
// YES BUTTON GROWS
// --------------------
container.addEventListener("mousemove", (e) => {
  const rect = yesBtn.getBoundingClientRect();

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const distance = Math.hypot(
    e.clientX - centerX,
    e.clientY - centerY
  );

  const maxDistance = 250;
  const scale = Math.max(1, 1.6 - distance / maxDistance);

  yesBtn.style.transform = `scale(${scale})`;
});

// Mobile YES grow
container.addEventListener("touchmove", (e) => {
  const touch = e.touches[0];
  const rect = yesBtn.getBoundingClientRect();

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const distance = Math.hypot(
    touch.clientX - centerX,
    touch.clientY - centerY
  );

  const maxDistance = 250;
  const scale = Math.max(1, 1.6 - distance / maxDistance);

  yesBtn.style.transform = `scale(${scale})`;
});

// --------------------
// YES CLICK → YAY
// --------------------
yesBtn.addEventListener("click", () => {
  container.style.display = "none";
  warning.style.display = "none"; // Hide the warning text
  result.style.display = "block";
});