const path = require('path');
const fs = require('fs').promises;

const writeJsonData = async (filePath, newFile) => {
  await fs.writeFile(path.resolve(__dirname, filePath), JSON.stringify(newFile));
  return newFile[newFile.length - 1];
};

module.exports = writeJsonData;