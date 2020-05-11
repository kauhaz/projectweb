const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      jobseekersignup = require('../models/jobseeksignup'),
      Job = require('../models/postjob'),
      multer = require('multer');

      var StorageOfimageprofile = multer.diskStorage(
        {
        destination:function(req,file,cb){
          cb(null,"./public/images/img-profile/");
        },
        filename:function(req,file,cb){
         

          cb(null,file.originalname);
        }

      }); 
      var upload_profile = multer({storage : StorageOfimageprofile});

      var StorageOfresume = multer.diskStorage(
        {
        destination:function(req,file,cb){
          cb(null,"./public/resumefile");
        },
        filename:function(req,file,cb){
          

          cb(null,file.originalname);
        }

      });
      var upload_resume = multer({storage : StorageOfresume});

      router.get('/login', function(req,res){
       
        res.render('joblogin');
    });
    router.post('/login', passport.authenticate("joblocal", 
    {
        successRedirect: "/",
        failureRedirect: "/jobseeker/login",
        successFlash: true,            
        failureFlash: true,
        successFlash: 'You log in successfully',
        failureFlash: 'Invalid username or password.'
    })
);
    
    
    router.get('/resume', function(req,res){
        jobseekersignup.findById({_id:req.user._id},function(error, jobseek){
            if(error){
                console.log("Error!");
            } else {
               
                res.render('resume',{jobseek:jobseek});
            }
        })
    });
    router.get('/applyjob', function(req,res){
        jobseekersignup.findById({_id:req.user._id}).populate('jobapply').exec(function(error, job){
            if(error){
                console.log("Error");
            } else {
                res.render("historyapply",{job:job});
            }
        })
           
    });
    router.get('/applyjob/:id/delete', function(req,res){
        Job.remove({_id:req.params.id},(err,result)=>{
            if(err)
            console.log(err)
            else 
            {
                console.log(result)
                res.redirect("/jobseeker/applyjob")
                
            }
        })
           
    });

    router.post('/resume', upload_resume.single('resume'),function(req,res){
if(req.file){
        let resume = req.file.filename;
        jobseekersignup.updateOne({_id:req.user._id},{resume:resume},(err,ok)=>{
            
            if(err){
                console.log(err);
            } else {
                console.log(ok)
                res.redirect('/jobseeker/profile/new')
                }
        })
    }
    if(!req.file){
        res.redirect('/jobseeker/profile/new')
        }
    });


    router.get('/signup', function(req,res){
        res.render('signupJob');
    });
    router.get('/forgot_pass', function(req,res){
        res.render('jobforgotpass')
    });
    // router.post('/forgot_pass', function(req,res){
    //     jobseekersignup.find({email:req.body.email},function(error, upload){
    //         if(error){
    //             console.log("Error!");
              
    //         } else {
    //             if(upload == null){
    //                 re
    //             }
                
    //         }
    //     })
    // });
    router.get('/newpass', function(req,res){
        res.render('jobforgotpass')
    });
    router.get('/findjob', function(req,res){
        res.render('findjob');
    });
    router.get('/profile', function(req,res){
        jobseekersignup.findById({_id:req.user._id},function(error, jobseek){
            if(error){
                console.log("Error!");
            } else {
               
                res.render('profileJob',{jobseek:jobseek});
            }
        })
       
    });
    router.get('/profile/new', function(req,res){
        jobseekersignup.findById({_id:req.user._id},function(error, upload){
            if(error){
                console.log("Error!");
            } else {
                res.render('updatejobprofile',{jobload:upload});
            }
        })
    });
    router.post('/signup', function(req,res){
        jobseekersignup.register(new jobseekersignup({username:req.body.username,email:req.body.email,image:'no-profile-picture.jpg'}), req.body.password, function(err, user){
            if(err){
                console.log(err);
                req.flash('error','Username or Email had already used');
                return res.redirect('/jobseeker/signup')
            }
            passport.authenticate('joblocal')(req,res,function(){
                req.flash('success','You Signup in successfully');
               res.redirect('/')
            });
        });
    });
   
    router.post('/profile/new',upload_profile.single('image'),function(req,res){
        if(!req.file){
            console.log(req.file)
        let Name = req.body.Name;
        let Surname = req.body.Surname ;
        let IDCard = req.body.IDCard;
        let TelephoneNo = req.body.tel;
        let DateofBirth = req.body.DateofBirth;
        let Province  = req.body.Province;
        let District = req.body.District;
        let SubDistrict = req.body.SubDistrict;
        let Height = req.body.Height;
        let Weight = req.body.Weight;
        let Gender = req.body.Gender;
        let Nationality = req.body.Nationality;
        let Religion = req.body.Religion;
        let Address = req.body.Address;
        let Country = req.body.Country;
        let ZipCode = req.body.ZipCode;
       
        jobseekersignup.updateMany({_id:req.user._id},{$set : {Name:Name,Surname:Surname,IDCard:IDCard,TelephoneNo:TelephoneNo
        ,DateofBirth:DateofBirth,Province:Province,District:District,SubDistrict:SubDistrict,Height:Height
    ,Weight:Weight,Gender:Gender,Nationality:Nationality,Religion:Religion,Address:Address,Country:Country,ZipCode:ZipCode}} ,function(error, idCard){
            if(error){
                console.log(error);
            } else {
                res.redirect('/jobseeker/profile')
                }
            }
        );
    }
    if(req.file){
        let Name = req.body.Name;
        let Surname = req.body.Surname ;
        let IDCard = req.body.IDCard;
        let TelephoneNo = req.body.tel;
        let DateofBirth = req.body.DateofBirth;
        let Province  = req.body.Province;
        let District = req.body.District;
        let SubDistrict = req.body.SubDistrict;
        let Height = req.body.Height;
        let Weight = req.body.Weight;
        let Gender = req.body.Gender;
        let Nationality = req.body.Nationality;
        let Religion = req.body.Religion;
        let Address = req.body.Address;
        let Country = req.body.Country;
        let ZipCode = req.body.ZipCode;
        let image = req.file.filename;
        jobseekersignup.updateMany({_id:req.user._id},{$set : {Name:Name,Surname:Surname,image:image,IDCard:IDCard,TelephoneNo:TelephoneNo
        ,DateofBirth:DateofBirth,Province:Province,District:District,SubDistrict:SubDistrict,Height:Height
    ,Weight:Weight,Gender:Gender,Nationality:Nationality,Religion:Religion,Address:Address,Country:Country,ZipCode:ZipCode}} ,function(error, idCard){
            if(error){
                console.log(error);
            } else {
                res.redirect('/jobseeker/profile')
                }
            }
        );
    }
    });

      module.exports = router;