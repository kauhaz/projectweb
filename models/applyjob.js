const   mongoose = require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose');

        let applyjob = new mongoose.Schema({
            JobCategories:String,
            JobPosition:String,
            MinimumSalary:String,
            MaximumSalary:String,
            Province:String,
            Publicdate : Date,
            CompanyName:String,
            image:String,
            Degree:String,
        });

       

module.exports = mongoose.model('applyjob', applyjob);