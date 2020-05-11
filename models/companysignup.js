const   mongoose = require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose');

        let CompanySignupSchema = new mongoose.Schema({
            username:{
                type : String , unique : true
            },
            email:{
                type : String , unique : true
            },
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
            image:String,
            postjobs : [
                {
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Postjob"
                }
            ]
        });

        CompanySignupSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('companysignup', CompanySignupSchema);