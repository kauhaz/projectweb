const express = require('express'),
      router = express.Router();
      passport = require('passport'),

      companysignup = require('../models/companysignup'),
      Job = require('../models/postjob'),
      jobseekersignup = require('../models/jobseeksignup'),



      router.get('/',(req,res)=>{
          companysignup.find({},(err,result)=>{
            if(err)
            console.log(err)
            else{
                Job.find({},(err,result2)=>{
                    if(err)
                    console.log(err)
                    else{
                        jobseekersignup.find({},(err,result3)=>{
                            res.render('admin',{userjob:result3,usercom:result,job:result2})
                        })
                    }
                })
            }
          })
      })

      module.exports = router;