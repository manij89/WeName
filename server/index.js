const app = require('./app');
const port = process.env.PORT || 4002;
const db = require('./models/index');

(async function bootstrap () {
  await db.sequelize.sync(); // force:true makes the sync drop the previous table (if it was already there) and create a new one. Check Drive --> Database II for more info
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port} 💅🏻💃🏻`); // eslint-disable-line no-console
  });
})();

db.sequelize.authenticate();