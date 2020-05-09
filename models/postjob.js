const   mongoose = require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose');

        let postjob = new mongoose.Schema({
            JobCategories:String,
            JobPosition:String,
            MinimumSalary:String,
            MaximumSalary:String,
            Degree:String,
            JobDescription:String,
            Welfare:String,
            Contact:String,
            Howtogocompany:String,
            Address:String,
            Province:String,
            Publicdate : Date,
            Enddate: Date
           
        });

       

module.exports = mongoose.model('Postjob', postjob);