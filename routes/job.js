const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      companysignup = require('../models/companysignup'),
      Job = require('../models/postjob'),
      multer = require('multer');

router.get('/new', function(req,res){
    companysignup.findById({_id:req.user._id},function(error, upload){
        if(error){
            console.log("Error!");
        } else {
            
            res.render('postjob',{Comload:upload});
        }
    })
    
});

router.get('/joblist', function(req,res){
   res.render('joblist')
});
router.get('/:id', function(req,res){
    Job.findById({_id:req.params.id},function(error,jobshow){
        if(error){
            console.log("Error!");
        } else {
            res.render('showjob',{showjob:jobshow});
        }
    })
 });
 

router.post('/:id', function(req,res){
    companysignup.findById({_id:req.user._id}, function(err, job){
        if(err){
            console.log(err);
        } else {
            Job.create({JobCategories:req.body.JobCategories,JobPosition:req.body.JobPosition,MinimumSalary:req.body.MinimumSalary
            ,MaximumSalary:req.body.MaximumSalary,Degree:req.body.Degree,JobDescription:req.body.JobDescription
        ,Welfare:req.body.Welfare,Contact :req.body.Contact,Howtogocompany:req.body.Howtogocompany
    ,Address:req.body.Address,Province:req.body.Province,Publicdate:req.body.Publicdate,Enddate:req.body.Enddate,CompanyName:req.body.CompanyName
    ,Qualificationsofjobapplicants:req.body.Qualificationsofjobapplicants}, function(err,addjob){
                if(err){
                    console.log(err);
                } else {
                    job.postjobs.push(addjob);
                    job.save((err,data)=>{
                        if(err)
                        console.log(err)
                        else
                        console.log(data)
                    });
                   
                res.redirect('/job/'+ addjob._id);
                   
                    
                }
            });
        }
    });
});


module.exports = router;