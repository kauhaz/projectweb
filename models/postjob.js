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
            Enddate: Date,
            CompanyName:String,
            Qualificationsofjobapplicants: String,
            image:String,
            jobseekapply : [
                {
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"jobseekersignup"
                }
            ]

        });

       

module.exports = mongoose.model('Postjob', postjob);