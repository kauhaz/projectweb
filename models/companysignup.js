const   mongoose = require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose');

        let CompanySignupSchema = new mongoose.Schema({
            username:String,
            email:String,
            password:String,
            Contactname:String,
            CompanyName:String,
            industry:String,
            BusinessTypes:String,
            ContactSurname:String,
            ContactTelephoneNo:String,
            CompanyTelephoneNo:String,
            Province:String,
            District:String,
            SubDistrict:String,
            Address:String,
            Country:String,
            ZipCode:String,
        });

        CompanySignupSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('companysignup', CompanySignupSchema);