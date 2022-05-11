const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const URI_DB = process.env.URI_DB;

const db = mongoose.connect(URI_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => console.log('Connected to DB'));

mongoose.connection.on('error', err => console.log(`Connection error: ${err}`));

mongoose.connection.on('disconnected', () =>
  console.log('Disconnected from DB'),
);

process.on('SIGINT', async () => {
  mongoose.connection.close(() => process.exit(1));
});

module.exports = db;
