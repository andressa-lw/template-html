const chokidar = require('chokidar');
const fs = require('fs-extra');
const path = require('path');

const srcPath = 'src/img';
const distPath = 'dist/img';

const watcher = chokidar.watch(srcPath, { ignored: /^\./, persistent: true });

console.log(`Watching ${srcPath} for new images...`);

watcher.on('add', async (filePath) => {
  const fileName = path.basename(filePath);
  const distFilePath = path.join(distPath, fileName);

  try {
    await fs.ensureDir(distPath); // Create the distPath directory if it doesn't exist
    await fs.copy(filePath, distFilePath);
  } catch (err) {
    console.error(`Error copying ${fileName}:`, err);
  }
});
