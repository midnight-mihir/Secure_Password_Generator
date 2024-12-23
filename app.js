const toggleButton = document.getElementById('theme-toggle-button');
const passwordInput = document.getElementById("password");
const passwordStrength = document.getElementById("password-strength");
const lengthValue = document.getElementById("length-value");
const lengthSlider = document.getElementById("password-length");
const decreaseLength = document.getElementById("decrease-length");
const increaseLength = document.getElementById("increase-length");
const regenerateButton = document.getElementById("regenerate");
const copyToClipboardButton = document.getElementById("copy-to-clipboard");
const body = document.body;
const messageElement = document.getElementById("message");

// Check and apply the saved theme from localStorage
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark-mode") {
        body.classList.add("dark-mode");
        toggleButton.innerHTML = '<i class="fa-regular fa-lightbulb" style="color: #ffffff;"></i>';
    } else {
        toggleButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
});

// Toggle dark/light theme and save preference
toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    toggleButton.innerHTML = isDarkMode 
        ? '<i class="fa-regular fa-lightbulb" style="color: #ffffff;"></i>' 
        : '<i class="fa-solid fa-moon"></i>';
    localStorage.setItem("theme", isDarkMode ? "dark-mode" : "light-mode");
});

// Password characters
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

// Generate password function
function generatePassword(length) {
    let password = "";
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
}

// Update password strength
function updateStrength(password) {
    const length = password.length;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*()]/.test(password);

    if (length < 8 || !hasUpperCase || !hasNumbers || !hasSpecialChars) {
        passwordStrength.textContent = "Weak";
        passwordStrength.style.color = "red";
    } else if (length < 16) {
        passwordStrength.textContent = "Moderate";
        passwordStrength.style.color = "orange";
    } else {
        passwordStrength.textContent = "Strong";
        passwordStrength.style.color = "green";
    }
}

// Update password length
function updateLength(value) {
    lengthValue.textContent = value;
    passwordInput.value = generatePassword(value);
    updateStrength(passwordInput.value);
}

// Display message for a few seconds
function displayMessage(text, duration = 2000) {
    messageElement.textContent = text;
    setTimeout(() => {
        messageElement.textContent = "";
    }, duration);
}

// Initial setup
updateLength(lengthSlider.value);

// Event listeners
lengthSlider.addEventListener("input", () => updateLength(lengthSlider.value));

decreaseLength.addEventListener("click", () => {
    if (lengthSlider.value > 4) {
        lengthSlider.value--;
        updateLength(lengthSlider.value);
    }
});

increaseLength.addEventListener("click", () => {
    if (lengthSlider.value < 32) {
        lengthSlider.value++;
        updateLength(lengthSlider.value);
    }
});

regenerateButton.addEventListener("click", () => {
    passwordInput.value = generatePassword(lengthSlider.value);
    updateStrength(passwordInput.value);
});

copyToClipboardButton.addEventListener("click", () => {
    navigator.clipboard.writeText(passwordInput.value).then(() => {
        displayMessage("Password copied!");
    }).catch(err => {
        displayMessage("Failed to copy password", 3000);
        console.error(err);
    });
});
