const   mongoose = require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose');

        let resumejob = new mongoose.Schema({
            JobPosition:String,
            Name:String,
            Surname:String,
            resume : String,
            image:String
        });

       

module.exports = mongoose.model('resumejob', resumejob);