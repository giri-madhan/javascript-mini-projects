const toggleBtn = document.getElementById("toggle-btn");
const closeBtn = document.getElementById("close-modal");
const openBtn = document.getElementById("open-modal");
const modal = document.getElementById("modal");

// Toggle Nav
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("show-nav");
});

// Show modal
openBtn.addEventListener("click", () => modal.classList.add("show-modal"));

// Hide modal
closeBtn.addEventListener("click", () => modal.classList.remove("show-modal"));

// Hide modal on outside click
window.addEventListener("click", (e) =>
  e.target === modal ? modal.classList.remove("show-modal") : false
);
