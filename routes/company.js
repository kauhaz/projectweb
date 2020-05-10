const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      companysignup = require('../models/companysignup'),
      multer = require('multer');
      
      var StorageOfimageprofile = multer.diskStorage(
        {
        destination:function(req,file,cb){
          cb(null,"./public/images/img-Comprofile/");
        },
        filename:function(req,file,cb){
          //เก็บชื่อรูปต้นฉบับลงโฟลเดอร์

          cb(null,Date.now() + ".jpg");
        }

      });
      var upload_profile = multer({storage : StorageOfimageprofile});

    router.post('/login', passport.authenticate('companylocal',{  
        successRedirect: "/company/profile/new",
        failureRedirect: "/company/login",
        successFlash: true,            
        failureFlash: true,
        successFlash: 'You log in successfully',
        failureFlash: 'Invalid username or password.'
    }),function(req, res){
    });
    
    router.get('/login', function(req,res){
        res.render('comlogin');
    });
    router.get('/forgot_pass', function(req,res){
        res.render('comforgotpass');
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
   
   
    router.get('/profile/new', function(req,res){
       companysignup.findById({_id:req.user._id},function(error, upload){
            if(error){
                console.log("Error!");
            } else {
                res.render('updatecomprofile',{Comload:upload});
            }
        })
    });
    router.post('/signup', function(req,res){
        companysignup.register(new companysignup({username:req.body.username,
            email:req.body.email, 
            companyName:req.body.company,
            industry:req.body.industry,
            contactPerson:req.body.contact,
            telephoneNo:req.body.telephone,image:'no-profile-picture.jpg'}), req.body.password, function(err, user){
            if(err){
                console.log(err);
                req.flash('error','Username or Email had already used');
                return res.redirect('/company/signup');
            }
            passport.authenticate('companylocal')(req,res,function(){
                req.flash('success','You Signup in successfully');
                res.redirect('/');
            });
        });
    });
    router.post('/profile/new',upload_profile.single('image'), function(req,res){
        if(req.file){
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
        let image = req.file.filename;
        companysignup.updateMany({_id:req.user._id},{$set : {Contactname :Contactname,image:image,CompanyName:CompanyName
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
        }
        if(!req.file){
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
            }
    });
    

      module.exports = router;