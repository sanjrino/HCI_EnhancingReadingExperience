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

// Endpoint to get the list of books in Library and Store
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

// Endpoint to move a specific book from one folder to another
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

// Endpoint to move all files from StoreBooks to LibraryBooks
app.post('/move_files_to_library', (req, res) => {
  const sourceFolder = 'StoreBooks';
  const destinationFolder = 'LibraryBooks';

  try {
    const sourcePath = path.join(__dirname, 'public', sourceFolder);
    const destinationPath = path.join(__dirname, 'public', destinationFolder);

    // Get a list of files in the source folder
    const filesToMove = fs.readdirSync(sourcePath);

    // Move each file to the destination folder
    filesToMove.forEach(file => {
      const sourceFilePath = path.join(sourcePath, file);
      const destinationFilePath = path.join(destinationPath, file);

      // Check if the file exists before moving
      if (fs.existsSync(sourceFilePath)) {
        fs.renameSync(sourceFilePath, destinationFilePath);
        console.log(`File moved: ${file}`);
      }
    });

    res.json({ success: true, message: 'Files moved successfully' });
  } catch (error) {
    console.error('Error moving files:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error', details: error.message });
  }
});

// Serve the Main.html page on the root endpoint
app.get('/', (req, res) => {
  const mainPagePath = path.join(__dirname, 'public', 'Main.html');
  const mainPageContent = fs.readFileSync(mainPagePath, 'utf8');
  res.send(mainPageContent);
});

// Set up server to listen on a specific IP and port
const networkIP = '192.168.0.79'; // Change this to your local network IP
const networkPort = 3000;

app.listen(networkPort, networkIP, () => {
  console.log(`Server is running on http://${networkIP}:${networkPort}`);
});
