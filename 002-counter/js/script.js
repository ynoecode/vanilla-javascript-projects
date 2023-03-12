// Initialize count variable to zero
let count = 0;

// Select the HTML element that displays the current count
const value = document.querySelector('.counter__number--current');

// Select all buttons that can modify the count
const buttons = document.querySelectorAll('.counter__buttons--btn');

// Select the mode button and the body element
const modeButton = document.querySelector('#mode-button');
const body = document.body;

// Define the class name used for the light mode
const lightModeClass = 'light-mode';

// Loop through each button and add an event listener
buttons.forEach(button => {
  button.addEventListener('click', function() {
    // Modify the count depending on which button was clicked
    switch (button.id) {
      case 'btn-decrease':
        count--;
        break;
      case 'btn-increase':
        count++;
        break;
      case 'btn-reset':
        count = 0;
        // If in light mode, set the text color to white, else set it to black
        value.style.color = body.classList.contains(lightModeClass) ? '#fff' : '#000';
        break;
      default:
        break;
    }
    // Update the count text color and value
    updateValueColor();
  });
});

// Function to update the count text color and value
function updateValueColor() {
  switch (Math.sign(count)) {
    // If count is negative, set the text color to red
    case -1:
      value.style.color = 'red';
      break;
    // If count is zero, set the text color to white or black depending on the mode
    case 0:
      value.style.color = body.classList.contains(lightModeClass) ? '#fff' : '#000';
      break;
    // If count is positive, set the text color to green
    case 1:
      value.style.color = 'green';
      break;
    default:
      break;
  }
  // Update the count value
  value.textContent = count;
}

// Add an event listener to the mode button
modeButton.addEventListener('click', function() {
  // Toggle the light mode class on the body element
  body.classList.toggle(lightModeClass);
  // Change the text of the mode button depending on the mode
  modeButton.textContent = body.classList.contains(lightModeClass) ? 'Light 🌞' : 'Dark 🌚';
  // Update the count text color and value
  updateValueColor();
});