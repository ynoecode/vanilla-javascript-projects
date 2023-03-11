// Get a list of all the color elements on the page
const colorsEl = document.querySelectorAll('.color');

// Get the button element
const buttonEl = document.querySelector('#btn');

// Get the dark mode button element
const buttonDarkModeEl = document.querySelector('#dark-mode-button');

// Get the body element
const bodyEl = document.querySelector('body');

// Get the toast container element
const toastContainerEl = document.querySelector('.toast-container');

// Keep track of the previous color so we don't generate duplicates
let previousColor;

// Call the updateBackgroundColor function to generate the initial colors
updateBackgroundColor();

// Add an event listener to the "Change Color" button
buttonEl.addEventListener('click', updateBackgroundColor);

// Add an event listener to the dark mode button
buttonDarkModeEl.addEventListener('click', toggleDarkMode);

// Add a click event listener to each color element
colorsEl.forEach((color) => {
  color.addEventListener('click', () => {
    // Get the hex code for the clicked color
    const hex = color.querySelector('.hex').textContent;

    // Copy the hex code to the user's clipboard
    copyToClipboard(hex);

    // Create a toast message with the hex code
    createToast(hex);
  });
});

// This function generates random hex colors and sets the background color of each color element
function updateBackgroundColor() {
  colorsEl.forEach((color) => {
    // Generate a random hex color
    let hexColor = getRandomHexColor();

    // Check that the color isn't a duplicate
    while (hexColor === previousColor) {
      hexColor = getRandomHexColor();
    }

    // Keep track of the previous color
    previousColor = hexColor;

    // Determine if the color is dark or light
    const isDark = isDarkColor(hexColor);

    // Set the background color of the color element
    color.style.backgroundColor = hexColor;

    // Set the text color of the color element
    color.style.color = isDark ? 'white' : 'black';

    // Set the hex code of the color element
    const hexEl = color.querySelector('.hex');
    hexEl.textContent = hexColor;
  });
}

// This function generates a random hex color
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

// This function determines if a color is dark or light
function isDarkColor(hexColor) {
  const { r, g, b } = hexToRgb(hexColor);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 128;
}

// This function converts a hex color to an RGB object
function hexToRgb(hexColor) {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return { r, g, b };
}

// This function copies text to the user's clipboard
function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
}

// This function creates a toast message with the given hex code
function createToast(hexCode) {
  // Create a new toast element
  const toastEl = document.createElement('div');
  toastEl.classList.add('toast');
  toastEl.style.setProperty('--bg-color', hexCode);

  // Create a new toast text element
  const toastTextEl = document.createElement('div');
  toastTextEl.classList.add('toast-text');
  toastTextEl.textContent = 'Copied to Clipboard';
  toastEl.appendChild(toastTextEl);

  // Determine if the toast text is too bright or too dark
  const isTooBright = isBrightColor(hexCode);
  toastTextEl.style.color = isTooBright ? 'black' : 'white';

  // Insert the toast element into the toast container
  toastContainerEl.insertBefore(toastEl, toastContainerEl.firstChild);

  // Remove the toast element after 3 seconds
  setTimeout(() => {
    toastEl.classList.remove('show');
    setTimeout(() => {
      toastEl.remove();
    }, 200);
  }, 3000);

  // Add the "show" class to the toast element to make it appear
  setTimeout(() => {
    toastEl.classList.add('show');
  }, 100);
}

// This function determines if a color is too bright
function isBrightColor(hexColor) {
  const { r, g, b } = hexToRgb(hexColor);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness >= 200;
}

// This function toggles between light and dark mode
function toggleDarkMode() {
  bodyEl.classList.toggle('dark-mode');
  const isDarkMode = bodyEl.classList.contains('dark-mode');
  buttonDarkModeEl.textContent = isDarkMode ? 'Light 🌞' : 'Dark 🌚';
}