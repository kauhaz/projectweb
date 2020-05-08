const express = require('express'),
      router = express.Router();
      passport = require('passport')
      middleware = require('../middleware');
      
      router.get('/',function(req,res){
        res.render('index');
    });
    router.get('/contactus',function(req,res){
        res.render('contactus');
    });
    router.get('/logout', function(req,res){
        req.logout();
        res.redirect('/');
    });
  module.exports = router;