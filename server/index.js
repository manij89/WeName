const express = require('express');
const router = require('./router');
const cors = require('cors');
const db = require('./models/index');
const {port} = require('./config');
const PORT = port || 4002;
const morgan = require('morgan');
const app = express();
const compression = require('compression');

app.use(morgan('tiny'));

app.use(cors());
app.use(express.json());
app.use(router);

(async function bootstrap () {
  await db.sequelize.sync(); // force:true makes the sync drop the previous table (if it was already there) and create a new one. Check Drive --> Database II for more info
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT} 💅🏻💃🏻`); // eslint-disable-line no-console
  });
})();

db.sequelize.authenticate();