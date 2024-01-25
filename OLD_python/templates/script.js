// script.js

// Function to navigate to a specific page
function navigate(page) {
  window.location.href = page.toLowerCase() + '.html';
}

// Function to go back to the previous page
function goBack() {
  window.history.back();
}

// Function to add a book to the library
function addBook() {
  // Add logic to add a new book to the library
  alert('Book added to library!');
}

// Function to navigate to the next page in the book
function nextPage() {
  // Add logic to go to the next page in the book
  alert('Next page');
}
// script.js

// ... existing code ...

// Function to update brightness value
function updateBrightness(value) {
  document.getElementById('brightnessValue').innerText = value;
  // Apply brightness changes (this is just a placeholder, you may need to implement platform-specific brightness adjustment)
  adjustBrightness(value);
}

// Function to update smell value
function updateSmell(value) {
  document.getElementById('smellValue').innerText = value;
  // Apply smell changes (this is just a placeholder, you may need to implement platform-specific smell adjustment)
  adjustSmell(value);
}

// Function to update sound value
function updateSound(value) {
  document.getElementById('soundValue').innerText = value;
  // Apply sound changes (this is just a placeholder, you may need to implement platform-specific sound adjustment)
  adjustSound(value);
}

// Placeholder functions for applying changes
function adjustBrightness(value) {
  // Implement logic to adjust brightness in your VR environment
  console.log('Brightness adjusted to:', value);
}

function adjustSmell(value) {
  // Implement logic to adjust smell in your VR environment
  console.log('Smell adjusted to:', value);
}

function adjustSound(value) {
  // Implement logic to adjust sound in your VR environment
  console.log('Sound adjusted to:', value);
}

// script.js

document.addEventListener('DOMContentLoaded', function () {
  // Add your initialization logic here if needed
});

function goBack() {
  window.history.back();
}

// script.js

document.addEventListener('DOMContentLoaded', function () {
  // Add your initialization logic here if needed
});

function goBack() {
  window.history.back();
}

AFRAME.registerComponent('cursor-listener', {
  init: function () {
    var el = this.el;
    el.addEventListener('click', function () {
      // Handle button click event here
      alert('Button clicked!');
    });
  }
});
