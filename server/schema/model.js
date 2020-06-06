var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const validator = require('validator');

var userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true

    },
    age: {
        type: Number,
        default: 0
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid")
            }
        }
    },

    number: {
        type: Number,
        required: true
    }
    ,
    bloodGroup: { type: String }
    ,
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value){
           if(value.includes('password')){
               throw new Error("Password should not contain password!!                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         ")
           }
        }

    }
});

// C


userSchema.pre('save', async function (next) {

    const users = this
    if (users.isModified('password')) {
        users.password = await bcrypt.hash(users.password, 8)
    }
    next()
})

userSchema.pre('findOneAndUpdate', function (next) {
    const users = this;
    if (users.password) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                 return next(err); 
                }
            bcrypt.hash(users.password, salt, (err, hash) => {
                if (err) { 
                    return next(err);
                 }
                users.password = hash;
                next();
            });
        });
    }
    else {
        return next();
    }
});

userSchema.methods.generateAuthToken = async function () {

    const user = this
    const token = jwt.sign({ _id: user._id }, 'thisistoken')
    user.token = user.token.concat({ token })
    await user.save()
    return token

}
userSchema.statics.findByCredentials = async (email, password) => {


    const user = await this.findOne({ email })
    console.log(user);

    if (!user) {
        throw new Error('Unable to login');

    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login');
    }
    return user
}
module.exports = mongoose.model('UserRegistration', userSchema);