const createApp = require('./app');
const config = require('./config');

const app = createApp();

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`AeroTwin backend listening on http://localhost:${config.port}`);
});
