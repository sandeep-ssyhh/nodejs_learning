let express = require('express');
var fs = require("fs");
const JSONStream = require('JSONStream');
var mongoose = require('mongoose');
const path = require("path"); 
var bodyParser = require('body-parser');

const taskSchemaTable = require('./userModel');

const app = express();


app.use(express.static(path.join(__dirname, "uploads"))); 

// Database connection

mongoose.connect('mongodb://localhost:27017/userDb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false // To deprecATE the 
});

var arrayOfUsers=[];

// Post method API calling
app.post('/uploadJsondata', (req,res) => {	
    
    var total = 0;
    var count = 0;
    var readerStream = fs.createReadStream('./uploads/THERM0001.json');

    console.log("File has been read");

// Using Stream and reading records from the array and inserting it ito the db

    readerStream.pipe(JSONStream.parse('*')).on('data', async (userData) => {

        arrayOfUsers.push(userData);

        console.log(arrayOfUsers.length,'array la length')

        if (arrayOfUsers.length === 99) {
            readerStream.pause();
          await taskSchemaTable.insertMany(arrayOfUsers);
          arrayOfUsers = [];
          readerStream.resume();
          total = total + 1 ;
          console.log('Its resumed', total);

        }
      });

    // Here we are inserting the last remaining data to the database

      readerStream.on('end', async () => {
        await taskSchemaTable.insertMany(arrayOfUsers); // left over data
        console.log('\nImport complete, closing connection...');
       
    });

      


    app.listen(3000, () => {
        console.log("Post started");
    });



