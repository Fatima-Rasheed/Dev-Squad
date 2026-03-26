const toggleBtn = document.getElementById("toggleBtn");
const menuIcon = toggleBtn.querySelector("i");
const sidebar = document.getElementById("sidebar");
const closeSidebarBtn = document.querySelector(".closeSidebar");

// Toggle menu button click
toggleBtn.addEventListener("click", function () {
  if (menuIcon.classList.contains("fa-bars")) {
    // Open sidebar
    menuIcon.classList.replace("fa-bars", "fa-xmark");
    sidebar.classList.remove("translate-x-full");
  } else if (menuIcon.classList.contains("fa-xmark")) {
    // Close sidebar
    menuIcon.classList.replace("fa-xmark", "fa-bars");
    sidebar.classList.add("translate-x-full");
  }
});

// Close button click
closeSidebarBtn.addEventListener("click", function () {
  sidebar.classList.add("translate-x-full");
  menuIcon.classList.replace("fa-xmark", "fa-bars"); // Reset icon
});

const sun = document.getElementById("sun");
const moon = document.getElementById("moon");
const sunIcon = sun.querySelector("img");
const moonIcon = moon.querySelector("img");
const themeToggler = document.getElementById("themeToggler");

// Function to set the theme
function setTheme(isDark) {
  if (isDark) {
    document.documentElement.classList.add('dark');
    sunIcon.classList.add("hidden");
    sun.classList.add("otherMode");
    moonIcon.classList.remove("hidden");
    moon.classList.remove("otherMode");
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    sunIcon.classList.remove("hidden");
    sun.classList.remove("otherMode");
    moonIcon.classList.add("hidden");
    moon.classList.add("otherMode");
    localStorage.setItem('theme', 'light');
  }
}

// Check for saved theme in localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  setTheme(true);
} else {
  // Default to light or check system preference if needed, but here we follow current logic
  setTheme(false);
}

themeToggler.addEventListener("click", function () {
  const isDark = document.documentElement.classList.contains('dark');
  setTheme(!isDark);
});



const downloadBtn = document.getElementById('downloadBtn');


