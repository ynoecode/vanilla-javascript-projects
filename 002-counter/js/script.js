// Set initial value
let count = 0;

// Select value and buttons
const value = document.querySelector('.counter__number--current');
const btnDecrease = document.querySelector('#btn-decrease');
const btnReset = document.querySelector('#btn-reset');
const btnIncrease = document.querySelector('#btn-increase');
const modeButton = document.querySelector('#mode-button');
const body = document.querySelector('body');

btnDecrease.addEventListener('click', function() {
    count--;
    updateValueColor();
});

btnReset.addEventListener('click', function() {
  count = 0;
  if (body.classList.contains('light-mode')) {
      value.style.color = 'white';
  } else {
      value.style.color = 'black';
  }
  value.textContent = count;
});

btnIncrease.addEventListener('click', function() {
    count++;
    updateValueColor();
});

function updateValueColor() {
    if (count > 0) {
        value.style.color = 'green';
    } else if (count < 0) {
        value.style.color = 'red';
    } else {
        if (body.classList.contains('light-mode')) {
          value.style.color = 'white';
      } else {
          value.style.color = 'black';
      }
    }
    value.textContent = count;
}

modeButton.addEventListener('click', function() {
  if (body.classList.contains('light-mode')) {
    body.classList.remove('light-mode');
    modeButton.textContent = 'Light 🌞';
  } else {
    body.classList.add('light-mode');
    modeButton.textContent = 'Dark 🌚';
  }
  if (body.classList.contains('light-mode')) {
    value.style.color = '#ffffff';
  } else {
    updateValueColor();
  }
});
