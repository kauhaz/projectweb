const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      companysignup = require('../models/companysignup');

    router.post('/login', passport.authenticate('companylocal',{
        successRedirect: '/company/postjob',
        failureRedirect: '/company/signup'
    }),function(req, res){
    });
    
    
    
    router.get('/signup', function(req,res){
        res.render('signupCom');
    });
   
    router.get('/profile', function(req,res){
        companysignup.findById({_id:req.user._id},function(error, Company){
            if(error){
                console.log("Error!");
            } else {
               
                res.render('profileCom',{Company:Company});
            }
        })
    });
    router.get('/postjob', function(req,res){
        res.render('postjob');
    });
    router.get('/postjob/edit', function(req,res){
        res.render('updateJob');
    });
    router.get('/profile/new', function(req,res){
        res.render('updatecomprofile');
    });
    router.post('/signup', function(req,res){
        companysignup.register(new companysignup({username:req.body.username,
            email:req.body.email, 
            companyName:req.body.company,
            industry:req.body.industry,
            contactPerson:req.body.contact,
            telephoneNo:req.body.telephone}), req.body.password, function(err, user){
            if(err){
                console.log(err);
                return res.render('signupCom');
            }
            passport.authenticate('companylocal')(req,res,function(){
                res.redirect('/');
            });
        });
    });
    router.post('/profile/new', function(req,res){
        let Contactname = req.body.Contactname;
         let  CompanyName = req.body.CompanyName;
        let BusinessTypes  = req.body.BusinessTypes;
        let ContactSurname  = req.body.ContactSurname;
        let ContactTelephoneNo = req.body.ContactTelephoneNo;
        let CompanyTelephoneNo = req.body.CompanyTelephoneNo;
        let Province  = req.body.Province;
        let District = req.body.District;
        let SubDistrict = req.body.SubDistrict; 
        let Address = req.body.Address;
        let Country = req.body.Country;
        let ZipCode = req.body.ZipCode;
    
        companysignup.updateMany({_id:req.user._id},{$set : {Contactname :Contactname,CompanyName:CompanyName
            ,BusinessTypes:BusinessTypes,ContactSurname:ContactSurname,ContactTelephoneNo:ContactTelephoneNo
        ,CompanyTelephoneNo:CompanyTelephoneNo,Province:Province,District:District,SubDistrict:SubDistrict,Address:Address
    ,Country:Country,ZipCode:ZipCode}} ,function(error, idCard){
            if(error){
                console.log(error);
            } else {
                res.redirect('/company/profile')
                
                }
            }
        );
    });
    

      module.exports = router;