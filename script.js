// =========================
// File: script.js
// =========================

// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// Contact form validation
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const formMessage = document.getElementById("formMessage");

    if (!name || !email || !message) {
      formMessage.textContent = "Please fill in all fields.";
      return;
    }

    formMessage.textContent = "Thank you. Your message has been sent.";
    contactForm.reset();
  });
}
document.addEventListener("DOMContentLoaded", () => {
  fetch("navigation.html")
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to load navigation");
      }
      return response.text();
    })
    .then(data => {
      document.getElementById("navigationbar").innerHTML = data;

      // Mobile menu toggle
      const toggle = document.getElementById("menuToggle");
      const navLinks = document.querySelector(".nav-links");

      if (toggle && navLinks) {
        toggle.addEventListener("click", () => {
          navLinks.classList.toggle("active");
        });
      }
    })
    .catch(error => console.error(error));
});