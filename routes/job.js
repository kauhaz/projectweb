const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      companysignup = require('../models/companysignup'),
      Job = require('../models/postjob'),
      jobseekersignup = require('../models/jobseeksignup'),
      applyjob = require('../models/applyjob'),
     resumejob = require('../models/resumejob')
      multer = require('multer')
    
      router.get('/findjob', function(req,res){
        
          Job.find({},(err,job)=>{
              if(err)
              console.log(err)
              else{                 
                res.render('findjob',{job:job});
              }
          })
     
    });
    router.get('/jobapplication', function(req,res){
        companysignup({_id:req.user._id},(err,result)=>{
            if(err)
            console.log(err)
            else{
                Job.find({CompanyName:result.CompanyName}).populate('jobresume').exec((err,ok)=>{
                    if(err)
                    console.log(err)
                    else{
                        res.render('historyresume',{job:ok})
                    }
                })
            }
        })
    });
    router.get('/findjob/search', function(req,res){
        Job.find({
            $or:[
                {JobCategories: {$regex: req.query.JobCategories }},
                {CompanyName :{$regex:req.query.JobTilesOrCompanyname}},
                {JobPosition: {$regex: req.query.JobTilesOrCompanyname}},
                {MinimumSalary:{$regex:req.query.MinimumSalary} },
                {MaximumSalary:{$regex: req.query.MaximumSalary}} ,
                {Degree : {$regex: req.query.Degree}},
                {Province:{$regex: req.query.Province}}
            ]
        },function(error,jobshow){
            if(error){
                console.log("Error!");
            } else {
                console.log(jobshow)
                res.render('findjobafter',{jobshow:jobshow});
            }
        })
    });

router.get('/new', function(req,res){
    companysignup.findById({_id:req.user._id},function(error, upload){
        if(error){
            console.log("Error!");
        } else {
           
            res.render('postjob',{Comload:upload});
        }
    })
    
});
router.post('/apply/:id/delete', function(req,res){
    jobseekersignup.findById({_id:req.user._id},(err,result)=>{
        if(err)
        console.log(err)
        else{
            result.jobapply.pull({_id : req.params.id})
            result.save((err,ok)=>{
                if(err)
                console.log(err)
                else{
                    res.redirect('/jobseeker/applyjob')
                }
            })
        }
    })
    
});
router.get('/:id/remove', function(req,res){
    
    Job.remove({_id:req.params.id},(err,result)=>{
        if(err)
        console.log(err)
        else 
        {
            console.log(result)
            res.redirect("/job/joblist")
            
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
    companysignup.findById({_id:req.user._id},function(error, upload){
        if(error){
            console.log("Error!");
        } else {  
    Job.findById({_id:req.params.id},function(error, jobedit){
        if(error){
            console.log("Error!");
        } else {
            res.render('updateJob',{jobedit:jobedit,comshow:upload});
        }
    }) 
}
    })
})


 router.post('/:id/edit', function(req,res){

            let JobCategories = req.body.JobCategories;
            let JobPosition = req.body.JobPosition;
            let MinimumSalary  = req.body.MinimumSalary;
            let MaximumSalary  = req.body.MaximumSalary;
            let Degree = req.body.Degree;
            let Welfare = req.body.Welfare;
            let Qualificationsofjobapplicants = req.body.Qualificationsofjobapplicants;
           
            let Enddate = req.body.Enddate;
            let Contact = req.body.Contact; 
            let JobDescription = req.body.JobDescription;
            let Howtogocompany = req.body.Howtogocompany;
            let Province = req.body.Province;
            let Address = req.body.Address;
            companysignup.findById({_id:req.user._id},(err,ok)=>{
                if(err)
                console.log(err)
                else{
                    Job.updateMany({_id:req.params.id},{$set : {JobCategories :JobCategories,JobPosition:JobPosition
                        ,MinimumSalary:MinimumSalary, MaximumSalary: MaximumSalary,Degree:Degree
                        ,Welfare:Welfare,Province:Province,Qualificationsofjobapplicants:Qualificationsofjobapplicants
                        ,Enddate:Enddate,Contact:Contact,JobDescription:JobDescription,Howtogocompany:Howtogocompany,Address:Address,image:ok.image,CompanyName:ok.CompanyName
            ,Editdate:req.body.Editdate}} ,function(error, job){
                        if(error){
                            console.log(error);
                        } else {
                            res.redirect('/job/'+ req.params.id)
                            
                            }
                        }
                    );
                }

            })
});

router.post('/apply/:id',(req,res)=>{
    Job.findById({_id:req.params.id},(err,job)=>{
        if(err)
        console.log(err)
        else{
            jobseekersignup.findById({_id:req.user._id},(err,user)=>{
                if(err)
                res.redirect('/jobseeker/login')
                else{
                    if(user.resume==undefined)
                    {
                        req.flash('error','You must upload resume File to apply job');
                        res.redirect('/jobseeker/resume')
                    }
                    else{  
                    job.jobresume.addToSet(user)
                    job.save((err,data)=>{
                        if(err)
                        console.log(err)
                       
                    });
                    user.jobapply.addToSet(job)
                    user.save((err,data)=>{
                        if(err)
                        console.log(err)
                        else
                        {  
                       res.redirect('/jobseeker/applyjob')
                        }

                    });
                }

                }
            })
        }

    })
    })



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