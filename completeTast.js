const fs = require('fs');
const mongoose = require('mongoose');
const JSONStream = require('JSONStream');
const User = require('./src/models/User');
const config = require('./config.json');

mongoose.connect(config.MONGODB_URI, { poolSize: config.DB_POOL_SIZE });
mongoose.Promise = global.Promise;

const db = mongoose.connection;
let arrayOfUsers = [];

db.on('open', () => {
  console.log('Connected to mongo server.\n');
  process.stdout.write('Processing.');
  const dataStreamFromFile = fs.createReadStream(`${__dirname}/THERM0001.json`);
  dataStreamFromFile.pipe(JSONStream.parse('*')).on('data', async (userData) => {
    arrayOfUsers.push(userData);
    if (arrayOfUsers.length === 99) {
      dataStreamFromFile.pause();
      await User.insertMany(arrayOfUsers);
      arrayOfUsers = [];
      process.stdout.write('.');
      dataStreamFromFile.resume();
    }
  });

  dataStreamFromFile.on('end', async () => {
    await User.insertMany(arrayOfUsers); // left over data
    console.log('\nImport complete, closing connection...');
    db.close();
    process.exit(0);
  });
});

db.on('error', (err) => {
  console.error('MongoDB connection error: ', err);
  process.exit(-1);
});