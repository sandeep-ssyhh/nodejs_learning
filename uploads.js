let express = require('express');
var multer = require('multer');
var mongoose = require('mongoose');
const path = require("path"); 

const app = express();


app.use(express.static(path.join(__dirname, "uploads"))); 


var bodyParser = require('body-parser');

const taskSchemaTable = require('./server/schema/taskSchema');
/////////////////////////

mongoose.connect('mongodb://localhost:27017/gym_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false // To deprecATE the 
});

var fs = require("fs");
var data = '';

// Create a readable stream

console.log("Program Ended");
var storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,'uploads/')
    },
    filename: function(req,file,cb){

        cb(null,Date.now()+ file.originalname)
    }
})

var upload = multer({storage: storage})

// app.post("/upload",upload.single('jfile'), (req, res, next) => {
    
//     // var fileinfo = req.files;
//     console.log("File uploded")
//     req.send('File has been uploaded')

   
//     });

    // try{
    //     var file = require('../gym_managment/uploads/1589820003947THERM0001.json');    
    //     // var file = cat('./uploads/1589820003947THERM0001'); 
    //     // use testdb                        # db name
    //     var o = JSON.parse(file);  
    //     console.log(o);
    //     // # convert string to JSON
    //     // db.taskSchemaTable.insert(o)  

    //     // await taskSchemaTable.create(taskTable)
    //     // // const token = user.generateAuthToken()
    //     // res.status(201).send({ message:'Task table created'})
    // }
    // catch(err)  {
    //     console.log(err)
    // }
// app.get(/getXLSX,async())

app.post('/uploadJsondata', async(req,res) => {
    console.log('Hieee Ab')
    var readerStream = fs.createReadStream('./uploads/temp THERM0001.json');

// Set the encoding to be utf8. 
readerStream.setEncoding('UTF8');

// Handle stream events --> data, end, and error
readerStream.on('data', function(chunk) {


    data += chunk;  
    

});

readerStream.on('end',async function() {

    const dbData = JSON.parse(data)
    console.log('Processing',dbData.length)
    await taskSchemaTable.insertMany(dbData)
    // console.log(data.length,'File',)
    
    



});

readerStream.on('error', function(err) {
   console.log(err.stack);
});


});

// route.post('/',insertDetails); 
// var insertDetails = async(req,res)=> {
    app.listen(3000, () => {
        console.log("Post started");
    })
        
