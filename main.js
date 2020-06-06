var express = require('express');
var app = express();
var port = 3000;
var indexRoute = require('./server/route/index'); // Importing index file of route
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

app.use(bodyParser.json());


// var users = require('./server/schema/model'); we used it at controller page

mongoose.connect('mongodb://localhost:27017/gym_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false // To deprecATE the 
});
app.use('/api', indexRoute);

app.listen(port);


console.log('Port is running on ', port);
// const jwt = require('jsonwebtoken')
// const myfunc = async()=> {

// const token = jwt.sign({_id:'abc@123'},'thisismynaeme')
// console.log(token);
// const temp = jwt.verify(token,'thisismyname');
// console.log(temp);
// }

// myfunc()