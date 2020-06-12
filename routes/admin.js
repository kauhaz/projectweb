const express = require("express"),
  router = express.Router();
(passport = require("passport")),
  (companysignup = require("../models/companysignup")),
  (Job = require("../models/postjob")),
  (jobseekersignup = require("../models/jobseeksignup")),
  router.get("/jobseeker/:id", (req, res) => {
    jobseekersignup.findById({ _id: req.params.id }, function (error, jobseek) {
      if (error) {
        console.log("Error!");
      } else {
        res.render("seejobseek", { jobseek: jobseek });
      }
    });
  });
router.post("/jobseeker/:id/delete", (req, res) => {
  jobseekersignup.remove({ _id: req.params.id }, function (error, jobseek) {
    if (error) {
      console.log("Error!");
    } else {
      res.redirect("/admin101631");
    }
  });
});
router.post("/company/:id/delete", (req, res) => {
  companysignup.remove({ _id: req.params.id }, function (error, jobseek) {
    if (error) {
      console.log("Error!");
    } else {
      res.redirect("/admin101631");
    }
  });
});
router.post("/job/:id/delete", (req, res) => {
  Job.remove({ _id: req.params.id }, function (error, jobseek) {
    if (error) {
      console.log("Error!");
    } else {
      res.redirect("/admin101631");
    }
  });
});
router.get("/company/:id", (req, res) => {
  companysignup.findById({ _id: req.params.id }, function (error, Company) {
    if (error) {
      console.log("Error!");
    } else {
      res.render("seecompany", { Company: Company });
    }
  });
});
router.get("/job/:id", (req, res) => {
  Job.findById({ _id: req.params.id }, function (error, showjob) {
    if (error) {
      console.log("Error!");
    } else {
      res.render("seejob", { showjob: showjob });
    }
  });
});

router.get("/", (req, res) => {
  companysignup.find({}, (err, result) => {
    if (err) console.log(err);
    else {
      Job.find({}, (err, result2) => {
        if (err) console.log(err);
        else {
          jobseekersignup.find({}, (err, result3) => {
            res.render("admin", {
              userjob: result3,
              usercom: result,
              job: result2,
            });
          });
        }
      });
    }
  });
});

module.exports = router;
