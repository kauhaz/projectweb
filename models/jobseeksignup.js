const   mongoose = require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose');

        
let JobseekerSignup = new mongoose.Schema({
 
    username:{
        type : String , unique : true
    },
    email:{
        type : String , unique : true
    },
    password:String,
    Name:String,
    Surname:String,
    IDCard:String,
    TelephoneNo:String,
    DateofBirth:Date,
    Province:String,
    District:String,
    SubDistrict:String,
    Height:String,
    Weight:String,
    Gender:String,
    Nationality:String,
    SubDistrict:String,
    Religion:String,
    Address:String,
    Country:String,
    ZipCode:String,
    image:String,
    resume : String
});



JobseekerSignup.plugin(passportLocalMongoose);

module.exports = mongoose.model('jobseekersignup', JobseekerSignup);
