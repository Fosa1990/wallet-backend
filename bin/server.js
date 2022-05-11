const { mkdir } = require('fs/promises');
const app = require('../app');
const db = require('../src/db');

const { PORT } = require('../src/helpers/constants');

db.then(() => {
  app.listen(PORT, async () => {
    await mkdir(process.env.UPLOAD_FOLDER, { recursive: true });
    console.log(`Server running at port: ${PORT}`);
  });
}).catch(error => {
  console.error(`Server not running. Error message: ${error.message}`);
  process.exit(1);
});
