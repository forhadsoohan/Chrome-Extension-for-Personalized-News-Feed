import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

const zip = new JSZip();

function addFolderToZip(folderPath, zip) {
  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isFile()) {
      const fileContent = fs.readFileSync(filePath);
      zip.file(file, fileContent);
    } else if (stats.isDirectory()) {
      const subFolder = zip.folder(file);
      addFolderToZip(filePath, subFolder);
    }
  }
}

addFolderToZip('dist', zip);

zip.generateAsync({ type: 'nodebuffer' })
  .then(function(content) {
    fs.writeFileSync('extension.zip', content);
    console.log('Extension package created: extension.zip');
  })
  .catch(function(error) {
    console.error('Error creating extension package:', error);
  });