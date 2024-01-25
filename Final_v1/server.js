const express = require('express');
const fs = require('fs');
const https = require('https');
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

const networkIP = '192.168.0.79'; // Change this to your local network IP
const networkPort = 3000;

// Load the SSL certificate files (replace 'key.pem' and 'cert.pem' with your actual files)
const privateKey = fs.readFileSync('key.pem', 'utf8');
const certificate = fs.readFileSync('cert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(networkPort, networkIP, () => {
  console.log(`Server is running on https://${networkIP}:${networkPort}`);
});
