const chokidar = require('chokidar');
const fs = require('fs-extra');

const srcPath = 'src/img';
const distPath = 'dist/img';

const watcher = chokidar.watch(srcPath, { ignored: /^\./, persistent: true });

console.log(`Watching ${srcPath} for new images...`);

watcher.on('add', async (path) => {
  const fileName = path.split('/').pop();
  const distFilePath = `${distPath}/${fileName}`;
  
  try {
    await fs.copy(path, distFilePath);
  } catch (err) {
    console.error(`Error copying ${fileName}:`, err);
  }
});
