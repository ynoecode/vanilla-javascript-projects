// Get the elements to be updated
const bgTitleEl = document.querySelector('.bg-title');
const bgColorEl = document.querySelector('.bg-color');
const buttonEl = document.querySelector('#btn');

// Add an event listener to the button that calls updateBackgroundColor when clicked
buttonEl.addEventListener('click', updateBackgroundColor);

// Updates the background color and text when the button is clicked
function updateBackgroundColor() {
  // Generate a random hex color code
  const hexColor = getRandomHexColor();
  // Determine whether the background color is dark or light
  const isDark = isDarkColor(hexColor);

  // Set the background color of the page
  document.body.style.backgroundColor = hexColor;
  // Set the text color of the page based on the background color
  document.body.style.color = isDark ? 'white' : 'black';
  // Update the background color title and text
  bgTitleEl.textContent = `Background Color: ${hexColor}`;
  bgColorEl.textContent = hexColor;
}

// Generates a random hex color code
function getRandomHexColor() {
  // Generate a random number between 0 and 16777215 (decimal equivalent of FFFFFF)
  const randomColor = Math.floor(Math.random() * 16777215);
  // Convert the decimal number to a hexadecimal string and prepend '#' character
  return `#${randomColor.toString(16).padStart(6, '0')}`;
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
