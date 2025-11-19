const chatBox = document.getElementById("chatBox");
const welcomeScreen = document.getElementById("welcomeScreen");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

let hasMessages = false;

// Load theme from localStorage on page load
const savedTheme = localStorage.getItem('theme') || 'dark-mode';
body.classList.add(savedTheme);
themeToggle.textContent = savedTheme === 'dark-mode' ? '🌙' : '☀️';

// Theme Toggle Functionality with localStorage
themeToggle.addEventListener("click", () => {
  if (body.classList.contains("dark-mode")) {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    themeToggle.textContent = "☀️";
    localStorage.setItem('theme', 'light-mode');
  } else {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    themeToggle.textContent = "🌙";
    localStorage.setItem('theme', 'dark-mode');
  }
});

// Sidebar menu item click handlers
document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    // Remove active class from all items
    document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
    // Add active class to clicked item
    item.classList.add('active');
  });
});

function hideWelcomeScreen() {
  if (!hasMessages) {
    welcomeScreen.classList.add('fade-out');
    setTimeout(() => {
      welcomeScreen.style.display = 'none';
      chatBox.style.display = 'flex';
    }, 500);
    hasMessages = true;
  }
}

function addMessage(text, sender) {
  hideWelcomeScreen();
  
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

const API_URL = "/api/chat";

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage(message, "user");
  userInput.value = "";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }
    addMessage(data.reply, "bot");
  } catch (error) {
    addMessage("Error: Could not connect to server. Please try again later.", "bot");
    console.error("Error:", error);
  }
}
