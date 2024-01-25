// script.js

function navigate(page) {
  window.location.href = page.toLowerCase() + '.html';
}

document.addEventListener('DOMContentLoaded', function () {
  addBookButtons();
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

// Function to dynamically add book buttons to the library
function addBookButtons() {
  fetch('/get_books')
    .then(response => response.json())
    .then(data => {
      const storeButtonsContainer = document.getElementById('storeButtons');
      const noBooksMessage = document.getElementById('noBooksMessage');

      // Clear existing buttons
      storeButtonsContainer.innerHTML = '';

      // Check if there are books in the store
      if (data.booksInStore && data.booksInStore.length > 0) {
        // Add a button for each book in the store
        data.booksInStore.forEach(bookName => {
          const button = document.createElement('button');
          button.innerText = bookName;
          button.onclick = function () {
            moveBook('StoreBooks', 'LibraryBooks', bookName);
          };
          storeButtonsContainer.appendChild(button);
        });

        // Hide the no books message
        noBooksMessage.style.display = 'none';
      } else {
        // If there are no books in the store, display the message
        noBooksMessage.style.display = 'block';
      }
    })
    .catch(error => console.error('Error:', error));
}

// Function to move a book
function moveBook(sourceFolder, destinationFolder, bookName) {
  fetch(`/move_book/${sourceFolder}/${destinationFolder}/${bookName}`)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert(data.message);
        // Refresh the page or update book buttons after moving
        addBookButtons();
      } else {
        alert(`Error: ${data.message}`);
      }
    })
    .catch(error => console.error('Error:', error));
}

// Add a function to handle adding books (if needed)
function addBook() {
  // Add your logic to handle adding books
  alert('Add Book function triggered');
}
