const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/moveFile', (req, res) => {
  const { fileName, sourceFolder } = req.body;

  const sourcePath = path.join(__dirname, sourceFolder, fileName);
  const destinationPath = path.join(__dirname, 'folderB', fileName);

  // Check if the file exists before moving
  if (fs.existsSync(sourcePath)) {
    // Move file
    fs.rename(sourcePath, destinationPath, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error moving file', details: err.message });
      } else {
        console.log(`File moved: ${fileName}`);
        res.status(200).send('File moved successfully');
      }
    });
  } else {
    res.status(404).json({ error: 'File not found', details: `File ${fileName} not found in ${sourceFolder}` });
  }
});


app.get('/', (req, res) => {
  const folderAPath = path.join(__dirname, 'folderA');
  const filesInFolderA = fs.readdirSync(folderAPath);

  const folderBPath = path.join(__dirname, 'folderB');
  const filesInFolderB = fs.readdirSync(folderBPath);

  const folderAButtons = generateFileButtons(filesInFolderA, 'folderA');
  const folderBList = generateFileList(filesInFolderB);

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>File Mover</title>
      <style>
        /* Add your styles here */
      </style>
    </head>
    <body>
      <div id="folderA">
        <h2>Folder A</h2>
        ${folderAButtons}
      </div>
      <div id="folderB">
        <h2>Folder B</h2>
        ${folderBList}
      </div>
      <script src="/script.js"></script>
    </body>
    </html>
  `);
});

function generateFileButtons(fileList, folderName) {
  return fileList.map(fileName => `
    <button onclick="moveFile('${fileName}', '${folderName}')">${fileName}</button>
  `).join('');
}

function generateFileList(fileList) {
  return fileList.map(fileName => `
    <p>${fileName}</p>
  `).join('');
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
