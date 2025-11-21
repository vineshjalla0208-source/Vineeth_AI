// DOM Elements
const welcomeScreen = document.getElementById("welcomeScreen");
const chatContainer = document.getElementById("chatContainer");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const menuItems = document.querySelectorAll(".menu-item");

let hasMessages = false;
let isLoading = false;

// Sidebar menu item click handlers
menuItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    menuItems.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
  });
});

// Hide welcome screen and show chat container
function hideWelcomeScreen() {
  if (!hasMessages) {
    welcomeScreen.classList.add("fade-out");
    setTimeout(() => {
      welcomeScreen.style.display = "none";
      chatContainer.style.display = "flex";
      hasMessages = true;
    }, 400);
  }
}

// Create loading dots animation
function showLoadingDots() {
  const loadingDiv = document.createElement("div");
  loadingDiv.className = "message bot loading";
  loadingDiv.id = "loading-dots";
  loadingDiv.innerHTML = `
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  `;
  chatContainer.appendChild(loadingDiv);
  chatContainer.scrollTo({
    top: chatContainer.scrollHeight,
    behavior: "smooth",
  });
}

// Remove loading dots
function hideLoadingDots() {
  const loadingDots = document.getElementById("loading-dots");
  if (loadingDots) {
    loadingDots.remove();
  }
}

// Add message to chat container
function addMessage(sender, message) {
  hideWelcomeScreen();
  hideLoadingDots();

  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}`;
  messageDiv.textContent = message;

  chatContainer.appendChild(messageDiv);

  // Smooth scroll to bottom
  chatContainer.scrollTo({
    top: chatContainer.scrollHeight,
    behavior: "smooth",
  });
}

// Send message function
async function sendMessage() {
  const message = userInput.value.trim();
  if (!message || isLoading) return;

  // Add user message
  addMessage("user", message);
  userInput.value = "";

  // Disable input while waiting for response
  isLoading = true;
  userInput.disabled = true;
  sendBtn.disabled = true;

  // Show loading animation
  showLoadingDots();

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: message }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    // Add bot response
    addMessage("bot", data.reply);
  } catch (error) {
    console.error("Error:", error);
    addMessage("bot", "Sorry, I encountered an error. Please try again.");
  } finally {
    // Re-enable input
    isLoading = false;
    userInput.disabled = false;
    sendBtn.disabled = false;
    userInput.focus();
  }
}

// Event Listeners
sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Focus input on load
window.addEventListener("load", () => {
  userInput.focus();
});
