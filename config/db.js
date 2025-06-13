// db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const placeConnection = mongoose.createConnection(process.env.MONGO_URI_PLACES, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userConnection = mongoose.createConnection(process.env.MONGO_URI_USERS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const archiveConnection = mongoose.createConnection(process.env.MONGO_URI_ARCHIVES, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = { placeConnection, userConnection, archiveConnection };
