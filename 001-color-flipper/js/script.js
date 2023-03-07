// Get the elements to be updated
const bgTitleEl = document.querySelector('.bg-title');
const bgColorEl = document.querySelector('.bg-color');

// Add an event listener to the button
document.querySelector('#btn').addEventListener('click', () => {
  // Generate a random hex color code for the background
  const hexColor = getRandomHexColor();
  // Set the background color of the content container
  document.body.style.backgroundColor = hexColor;
  // Set the text color of the content container based on the background color
  document.body.style.color = isDarkColor(hexColor) ? 'white' : 'black';
  // Update the background color title and text
  bgTitleEl.textContent = `Background Color: ${hexColor}`;
  bgColorEl.textContent = hexColor;
});

// Helper function to generate a random hex color code
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// Helper function to determine if a hex color code is dark or light
function isDarkColor(hexColor) {
  const rgb = hexToRgb(hexColor);
  const brightness = ((rgb.r * 299) + (rgb.g * 587) + (rgb.b * 114)) / 1000;
  return brightness < 128;
}

// Helper function to convert a hex color code to an RGB object
function hexToRgb(hexColor) {
  const hex = hexColor.replace('#', '');
  return {
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16),
  };
}