// Keep track of the previously generated color to avoid duplicates
let previousColor;

// Get the elements to be updated
const bgTitleEl = document.querySelector('.bg-title');
const bgColorEl = document.querySelector('.bg-color');
const buttonEl = document.querySelector('#btn');
const colorsEL = document.querySelectorAll('.color');
const toastEl = document.querySelector('.toast');
const toastContainerEl = document.querySelector('.toast-container');

// Add an event listener to the button that calls updateBackgroundColor when clicked
buttonEl.addEventListener('click', updateBackgroundColor);

// Updates the background color and text of each color element when the button is clicked
function updateBackgroundColor() {
  let hexColor;
  colorsEL.forEach(color => {
    // Generate a random hex color code
    hexColor = getRandomHexColor();

    // Set the background color of the current element to the generated hex color
    color.style.backgroundColor = hexColor;

    // Determine whether the background color is dark or light
    const isDark = isDarkColor(hexColor);

    // Set the text color of the current element to white if the background color is dark, otherwise black
    color.style.color = isDark ? 'white' : 'black';

    // Get the element with class "hex" inside the current element
    const hexEl = color.querySelector('.hex');

    // Set the text content of the "hex" element to the generated hex color
    hexEl.textContent = hexColor;

    // Add an event listener to each color element that calls copyHexCode when clicked
    color.addEventListener('click', copyHexCode);
    color.style.cursor = 'pointer';
  });
}

// Generates a random hex color code
function getRandomHexColor() {
  let hexColor;
    do {
      // Generate a random hex color code
      const randomColor = Math.floor(Math.random() * 16777215);
      hexColor = `#${randomColor.toString(16).padStart(6, '0')}`;
    } while (hexColor === previousColor);
    previousColor = hexColor;
    return hexColor;
}

// Determines whether a hex color code is dark or light
function isDarkColor(hexColor) {
  // Convert the hex color code to an RGB object
  const { r, g, b } = hexToRgb(hexColor);

  // Calculate the brightness of the color using the formula for relative luminance
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return true if the brightness is less than 128, indicating a dark color
  return brightness < 128;
}

// Converts a hex color code to an RGB object
function hexToRgb(hexColor) {
  // Remove the '#' character from the hex color code
  const hex = hexColor.replace('#', '');

  // Convert the red, green, and blue values from hexadecimal to decimal
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Return an object with the red, green, and blue values
  return { r, g, b };
}

// Copies the hex code inside the clicked color element to the clipboard
function copyHexCode(event) {
  const hexEl = event.currentTarget.querySelector('.hex');
  const hexCode = hexEl.textContent;
  navigator.clipboard.writeText(hexCode);
}

// Add an event listener to each color element that shows the color hex code in a toast message when clicked
colorsEL.forEach(color => {
  color.addEventListener('click', event => {
    // Get the hex code of the clicked color
    const hexEl = event.currentTarget.querySelector('.hex');
    const hexCode = hexEl.textContent;

    // Create a toast element with the hex code
    createToast(hexCode);

    // Copy the hex code to the clipboard
    navigator.clipboard.writeText(hexCode);
  });
});

function createToast(hexCode) {
  // Create the toast element
  const toastEl = document.createElement('div');
  toastEl.classList.add('toast');
  toastEl.style.setProperty('--bg-color', hexCode);

  // Create the toast text element
  const toastTextEl = document.createElement('div');
  toastTextEl.classList.add('toast-text');
  toastTextEl.textContent = `Copied on Clipboard`;

  // Determine whether the background color is too bright
  const isTooBright = isBrightColor(hexCode);

  // Set the text color to black if the background color is too bright
  toastTextEl.style.color = isTooBright ? 'black' : 'white';

  // Append the toast text element to the toast element
  toastEl.appendChild(toastTextEl);

  // Append the toast element as the first child of the toast container
  const toastContainerEl = document.querySelector('.toast-container');
  toastContainerEl.insertBefore(toastEl, toastContainerEl.firstChild);

  // Hide the toast after 3 seconds
  setTimeout(() => {
    toastEl.classList.remove('show');
    setTimeout(() => {
      toastEl.remove();
    }, 200);
  }, 3000);

  // Show the toast
  setTimeout(() => {
    toastEl.classList.add('show');
  }, 100);
}

// Determines whether a hex color code is too bright
function isBrightColor(hexColor) {
  // Convert the hex color code to an RGB object
  const { r, g, b } = hexToRgb(hexColor);

  // Calculate the brightness of the color using the formula for relative luminance
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return true if the brightness is greater than or equal to 200, indicating a bright color
  return brightness >= 200;
}

// Call the function to update the colors on page load
updateBackgroundColor();