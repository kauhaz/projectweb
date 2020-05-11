const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      companysignup = require('../models/companysignup'),
      Job = require('../models/postjob'),
      multer = require('multer')
    


router.get('/new', function(req,res){
    companysignup.findById({_id:req.user._id},function(error, upload){
        if(error){
            console.log("Error!");
        } else {
           
            res.render('postjob',{Comload:upload});
        }
    })
    
});

router.post('/:id/remove', function(req,res){

    Job.findById({_id:req.params.id},(err,result)=>{
        if(err)
        console.log(err)
        else 
        {
            console.log(result)
            result.remove();
        }
    })
     
 
 });

router.get('/joblist', function(req,res){
    companysignup.findById(req.user._id).populate('postjobs').exec(function(error, job){
        if(error){
            console.log("Error");
        } else {
            res.render("joblist",{job:job});
        }
    });
});
router.get('/:id/edit', function(req,res){
    Job.findById({_id:req.params.id},function(error, jobedit){
        if(error){
            console.log("Error!");
        } else {
            res.render('updateJob',{jobedit:jobedit});
        }
    })
    
});
router.get('/:id/edit', function(req,res){
    Job.findById({_id:req.params.id},function(error, jobedit){
        if(error){
            console.log("Error!");
        } else {
            res.render('updateJob',{jobedit:jobedit});
        }
    })
    
});

 router.post('/:id/edit', function(req,res){

            let JobCategories = req.body.JobCategories;
            let JobPosition = req.body.JobPosition;
            let MinimumSalary  = req.body.MinimumSalary;
            let MaximumSalsary  = req.body.MinimumSalsary;
            let Degree = req.body.Degree;
            let Welfare = req.body.Welfare;
            let Qualificationsofjobapplicants = req.body.Qualificationsofjobapplicants;
            let Publicdate  = req.body.Publicdate;
            let Enddate = req.body.Enddate;
            let Contact = req.body.Contact; 
            let JobDescription = req.body.JobDescription;
            let Howtogocompany = req.body.Howtogocompany;
            let Province = req.body.Province;
            let Address = req.body.Address;
            
            Job.updateMany({_id:req.params.id},{$set : {JobCategories :JobCategories,JobPosition:JobPosition
                ,MinimumSalary:MinimumSalary, MaximumSalsary: MaximumSalsary,Degree:Degree
                ,Welfare:Welfare,Province:Province,Qualificationsofjobapplicants:Qualificationsofjobapplicants
                ,Publicdate:Publicdate,Enddate:Enddate
        ,Contact:Contact,JobDescription:JobDescription,Howtogocompany:Howtogocompany,Address:Address}} ,function(error, job){
                if(error){
                    console.log(error);
                } else {
                    res.redirect('/job/'+ req.params.id)
                    
                    }
                }
            );
            
    
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
    ,Address:req.body.Address,Province:req.body.Province,Publicdate:req.body.Publicdate,Enddate:req.body.Enddate,CompanyName:job.CompanyName
    ,Qualificationsofjobapplicants:req.body.Qualificationsofjobapplicants,image:job.image}, function(err,addjob){
                if(err){
                    console.log(err);
                } else {
                   
                    job.postjobs.push(addjob);
                    job.save((err,data)=>{
                        if(err)
                        console.log(err)
                       
                    });
                    
                res.redirect('/job/'+ addjob._id);
                   
                    
                }
            });
        }
    });
});




module.exports = router;