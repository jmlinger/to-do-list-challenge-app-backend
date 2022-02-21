const mongoose = require('mongoose');
require('dotenv').config();

const DB_NAME = 'To_Do_List';
const MONGO_DB_URL = `mongodb://${ process.env.HOST || 'mongodb' }:27017/${ DB_NAME }`;
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let connection = null;

module.exports = () => {
  try {
    if (connection) return connection;
    connection = mongoose.connect(MONGO_DB_URL, OPTIONS);
    return connection;
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
