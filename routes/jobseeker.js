const express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  jobseekersignup = require("../models/jobseeksignup"),
  Job = require("../models/postjob"),
  applyjob = require("../models/applyjob"),
  resumejob = require("../models/resumejob"),
  multer = require("multer"),
   cloudinary = require('cloudinary').v2,
 { CloudinaryStorage } = require('multer-storage-cloudinary');

 cloudinary.config({ 
  cloud_name: 'smilejob', 
  api_key: '679157124947351', 
  api_secret: 'XVbYKJ7_xwyIMw_IOvqKqbT5Sqo' 
});

var storage = new  CloudinaryStorage({ 
    cloudinary: cloudinary,
    params: {
      format: async (req, file) => 'jpeg',
      public_id: (req, file) => file.originalname,
      path : (req, file) =>  `https://res.cloudinary.com/smilejob/image/upload/v159290293/${file.originalname}`,
    }
  })
  const parser = multer({ storage: storage });
 
  var storage2 = new  CloudinaryStorage({ 
    cloudinary: cloudinary,
    params: {
      format: async (req, file) => 'pdf', // supports promises as well
      public_id: (req, file) => file.originalname,
      path : (req, file) =>  `https://res.cloudinary.com/smilejob/image/upload/v159290293/${file.originalname}`
    }
  })
  const parser2 = multer({ storage: storage2 });


// var StorageOfimageprofile = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/images/img-profile/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// var upload_profile = multer({ storage: StorageOfimageprofile });

var StorageOfresume = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/resumefile");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload_resume = multer({ storage: StorageOfresume });
router.get("/login", function (req, res) {
  res.render("joblogin");
});
router.post(
  "/login",
  passport.authenticate("joblocal", {
    successRedirect: "/jobseeker/profile",
    failureRedirect: "/jobseeker/login",
    successFlash: true,
    failureFlash: true,
    successFlash: "You log in successfully",
    failureFlash: "Invalid username or password.",
  })
);

router.get("/resume", function (req, res) {
  jobseekersignup.findById({ _id: req.user._id }, function (error, jobseek) {
    if (error) {
      console.log("Error!");
    } else {
      res.render("resume", { jobseek: jobseek });
    }
  });
});
router.get("/applyjob", function (req, res) {
  jobseekersignup
    .findById({ _id: req.user._id })
    .populate("jobapply")
    .exec((err, ok) => {
      if (err) console.log(err);
      else {
        res.render("historyapply", { user: ok });
      }
    });
});

router.post("/resume", upload_resume.single("resume"), function (req, res) {
  if (req.file) {
    console.log(req.file)
    let resume = req.file.filename;
    jobseekersignup.updateOne(
      { _id: req.user._id },
      { resume: resume },
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          jobseekersignup.findById({ _id: req.user._id }, (err, ok) => {
            if (ok.Name && ok.Surname === "?") {
              req.flash("error", "You must fill the profile");
              res.redirect("/jobseeker/profile/" + ok._id + "/edit");
            } else {
              console.log(result);
              res.redirect("/job/findjob");
            }
          });
        }
      }
    );
  }

  if (!req.file) {
    jobseekersignup.findById({ _id: req.user._id }, (err, result2) => {
      if (err) console.log(err);
      else {
        if (result2.Name && result2.Surname === "?") {
          req.flash("error", "You must fill the profile");
          res.redirect("/jobseeker/profile/" + result2._id + "/edit");
        } else {
          console.log(result2);
          res.redirect("/job/findjob");
        }
      }
    });
  }
});
router.get("/signup", function (req, res) {
  res.render("signupJob");
});
router.get("/forgot_pass", function (req, res) {
  res.render("jobforgotpass");
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
router.get("/newpass", function (req, res) {
  res.render("jobforgotpass");
});
router.get("/findjob", function (req, res) {
  res.render("findjob");
});
router.get("/profile", function (req, res) {
  jobseekersignup.findById({ _id: req.user._id }, function (error, jobseek) {
    if (error) {
      console.log("Error!");
    } else {
      res.render("profileJob", { jobseek: jobseek });
    }
  });
});
router.get("/profile/:id/edit", function (req, res) {
  jobseekersignup.findById({ _id: req.user._id }, function (error, upload) {
    if (error) {
      console.log("Error!");
    } else {
      res.render("updatejobprofile", { jobload: upload });
    }
  });
});
router.post("/signup", function (req, res) {
  jobseekersignup.register(
    new jobseekersignup({
      username: req.body.username,
      email: req.body.email,
      image: "no-profile-picture.jpg",
      Name: "?",
      Surname: "?",
      Address: "?",
      Country: "?",
      DateofBirth: "",
      District: "?",
      Gender: "?",
      Height: "?",
      IDCard: "?",
      Nationality: "?",
      Province: "?",
      Religion: "?",
      SubDistrict: "?",
      TelephoneNo: "?",
      Weight: "?",
      ZipCode: "?",
    }),
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        req.flash("error", "Username or Email had already used");
        return res.redirect("/jobseeker/signup");
      }
      passport.authenticate("joblocal")(req, res, function () {
        req.flash("success", "You Signup in successfully");
        res.redirect("/jobseeker/profile");
      });
    }
  );
});

router.post("/profile/:id/edit", parser.single("image"), function (
  req,
  res
) {
  if (!req.file) {
    console.log(req.file);
    let Name = req.body.Name;
    let Surname = req.body.Surname;
    let IDCard = req.body.IDCard;
    let TelephoneNo = req.body.tel;
    let DateofBirth = req.body.DateofBirth;
    let Province = req.body.Province;
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

    jobseekersignup.updateMany(
      { _id: req.user._id },
      {
        $set: {
          Name: Name,
          Surname: Surname,
          IDCard: IDCard,
          TelephoneNo: TelephoneNo,
          DateofBirth: DateofBirth,
          Province: Province,
          District: District,
          SubDistrict: SubDistrict,
          Height: Height,
          Weight: Weight,
          Gender: Gender,
          Nationality: Nationality,
          Religion: Religion,
          Address: Address,
          Country: Country,
          ZipCode: ZipCode,
        },
      },
      function (error, idCard) {
        if (error) {
          console.log(error);
        } else {
          res.redirect("/jobseeker/profile");
        }
      }
    );
  }
  if (req.file) {
    console.log(req.file)
    let Name = req.body.Name;
    let Surname = req.body.Surname;
    let IDCard = req.body.IDCard;
    let TelephoneNo = req.body.tel;
    let DateofBirth = req.body.DateofBirth;
    let Province = req.body.Province;
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
    jobseekersignup.updateMany(
      { _id: req.user._id },
      {
        $set: {
          Name: Name,
          Surname: Surname,
          image: image,
          IDCard: IDCard,
          TelephoneNo: TelephoneNo,
          DateofBirth: DateofBirth,
          Province: Province,
          District: District,
          SubDistrict: SubDistrict,
          Height: Height,
          Weight: Weight,
          Gender: Gender,
          Nationality: Nationality,
          Religion: Religion,
          Address: Address,
          Country: Country,
          ZipCode: ZipCode,
        },
      },
      function (error, idCard) {
        if (error) {
          console.log(error);
        } else {
          res.redirect("/jobseeker/profile");
        }
      }
    );
  }
});

module.exports = router;
