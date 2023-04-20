const path = require('path');
const fs = require('fs').promises;

const readJsonData = async (filePath) => {
  try {
    const response = await fs.readFile(path.resolve(__dirname, filePath), 'utf8');
    const data = await JSON.parse(response);
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = readJsonData;