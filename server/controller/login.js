const users = require('../schema/model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


exports.loginUserDetails = async (req, res) => {
    console.log("User Not Found")

    try {
        const user = await users.findOne({email:req.body.email})
        if(user) {
            const isMatch = await bcrypt.compare(req.body.password,user.password)
            console.log(isMatch, 'is')

            if(isMatch){

                const token = jwt.sign({_id: user._id}, 'thisistoken')
                // user.token = user.token.concat({token})
                // await user.save()
                res.status(200).send(token)
            }
            else
            console.log('Password is not matching')
        }
        // res.status(200).send(user)
        // console.log("User Found")
    }
    catch (e) { 
        res.status(400).send();
        console.log("User Not Found", e)

    }
}