// script.js

function moveFile(fileName, sourceFolder) {
  return new Promise((resolve, reject) => {
    fetch('/moveFile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileName, sourceFolder }),
    })
    .then(response => {
      if (response.ok) {
        // Reload the page after successful move
        location.reload();
        resolve();
      } else {
        console.error('Error moving file:', response.statusText);
        reject(response.statusText);
      }
    })
    .catch(error => {
      console.error('Error:', error.message);
      reject(error.message);
    });
  });
}

function updateFolders() {
  return new Promise((resolve, reject) => {
    fetch('/')
    .then(response => response.text())
    .then(htmlContent => {
      document.documentElement.innerHTML = htmlContent;
      resolve();
    })
    .catch(error => {
      console.error('Error updating folders:', error.message);
      reject(error.message);
    });
  });
}

function moveFileAndUpdate(fileName, sourceFolder) {
  moveFile(fileName, sourceFolder)
    .then(updateFolders)
    .catch(error => {
      // Handle error if needed
      console.error('Error:', error);
    });
}
