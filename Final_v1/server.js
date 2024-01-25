const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Serve static files from the 'LibraryBooks' directory within the 'public' directory
app.use('/LibraryBooks', express.static(path.join(__dirname, 'public', 'LibraryBooks')));

app.use(express.json());

app.get('/get_books', (req, res) => {
  try {
    const libraryPath = path.join(__dirname, 'public', 'LibraryBooks');
    const storePath = path.join(__dirname, 'public', 'StoreBooks');

    const booksInLibrary = fs.readdirSync(libraryPath);
    const booksInStore = fs.readdirSync(storePath);

    res.json({ booksInLibrary, booksInStore });
  } catch (error) {
    console.error('Error getting books:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error', details: error.message });
  }
});



// Handle POST request to move a book
app.post('/move_book/:folderName/:bookName', (req, res) => {
  const { folderName, bookName } = req.params;

  const sourcePath = path.join(__dirname, folderName, bookName);
  const destinationFolder = folderName === 'LibraryBooks' ? 'StoreBooks' : 'LibraryBooks';
  const destinationPath = path.join(__dirname, destinationFolder, bookName);

  // Check if the file exists before moving
  if (fs.existsSync(sourcePath)) {
    // Move file
    fs.rename(sourcePath, destinationPath, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error moving book', details: err.message });
      } else {
        console.log(`Book moved: ${bookName}`);
        res.status(200).json({ success: true, message: 'Book moved successfully' });
      }
    });
  } else {
    res.status(404).json({ success: false, message: 'Book not found', details: `Book ${bookName} not found in ${folderName}` });
  }
});

// Serve the Main.html page on the root endpoint
app.get('/', (req, res) => {
  const mainPagePath = path.join(__dirname, 'public', 'Main.html');
  const mainPageContent = fs.readFileSync(mainPagePath, 'utf8');
  res.send(mainPageContent);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
