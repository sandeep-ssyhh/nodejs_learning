
// importing the model or schema

const users = require('../schema/model');

// var router = express.Router();

// router.get('/register', 
exports.getUserDetails = async(req,res)=> {
try{
const details =  await users.find({})
res.status(200).send(details)
}
catch(e){
    console.log(e)
}


}
//**********This ia also  right ********8 */
// exports.getUserDetails = (req, res) => {
//     users.find().then((data) => {
//         if (data.length != 0) {
//             res.send(data)
//         }
//         else {
//             res.send({ message: "Data not found" });
//         }
//     }).catch((err) => {
//         console.log(err)
//         res.status(500).send()
//     })
// }


exports.getUserDetailsById = (req, res) => {
    users.findById(req.params.id).then((data) => {
        if (data) {
            res.send(data)
        }
        else {
            res.status(404).send({ message: "Data not found" });
        }
    }).catch((err) => {
        console.log(err)
    })
}

// router.put('/register/:id',

exports.updateUserDetails = (req, res) => {
    users.findByIdAndUpdate(req.params.id,req.body, {new:true, runValidators:true }).then((data) => {
        if (data != 0) {
            res.send(data)
        }
        else {  
            res.status(404).send({ message: "Data not found" });
        }
    }).catch((err) => {
        console.log(err)
    })
}

// router.post('/register', 
exports.insertUserDetails =async (req, res) => {

    console.log(req);
   
    // users.create(user).then((created) => {
    //     res.status(201).send({ message: 'created' })
    // })

    try{
        // var user = {
        //     name: req.body.name,
        //     age: req.body.age,
        //     bloodGroup: req.body.bloodGroup,
        //     password: req.body.password,
        //     number: req.body.number,
        //     email: req.body.email
        // }
        // await users.create(user)
        // // const token = user.generateAuthToken()
        // res.status(201).send({ message:'user created'})
    }
    catch(err)  {
        console.log(err)
    }

    
    // res.status(201).send({ message: 'token also created' })
}


// router.delete('/register/:id', 

exports.deleteUserDetails = (req, res) => {
    users.findByIdAndRemove(req.params.id).then((data) => {
        if (data) {
            res.send({ message: "Data has been deleted" ,data})
        }
        else {
            res.send({ message: "Data not found" });
        }
    }).catch((err) => { 
        console.log(err)
    })
}

