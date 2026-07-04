const createApp = require('./app');
const config = require('./config');

const app = createApp();

const PORT = process.env.PORT || config.port || 4000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`AeroTwin backend running on port${PORT}`);
});
