const express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  companysignup = require("../models/companysignup"),
  multer = require("multer");
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
    path : (req, file) =>  `https://res.cloudinary.com/smilejob/image/upload/v159290293/smilejob/${file.originalname}`,
  }
})

const parser = multer({ storage: storage });
// var StorageOfimageprofile = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/images/img-Comprofile/");
//   },
//   filename: function (req, file, cb) {
//     //เก็บชื่อรูปต้นฉบับลงโฟลเดอร์

//     cb(null, file.originalname);
//   },
// });
// var upload_profile = multer({ storage: StorageOfimageprofile });

router.post(
  "/login",
  passport.authenticate("companylocal", {
    successRedirect: "/company/profile",
    failureRedirect: "/company/login",
    successFlash: true,
    failureFlash: true,
    successFlash: "You log in successfully",
    failureFlash: "Invalid username or password.",
  }),
  function (req, res) {}
);

router.get("/login", function (req, res) {
  res.render("comlogin");
});

router.get("/signup", function (req, res) {
  res.render("signupCom");
});

router.get("/profile", function (req, res) {
  companysignup.findById({ _id: req.user._id }, function (error, Company) {
    if (error) {
      console.log("Error!");
    } else {
      res.render("profileCom", { Company: Company });
    }
  });
});

router.get("/profile/:id/edit", function (req, res) {
  companysignup.findById({ _id: req.user._id }, function (error, upload) {
    if (error) {
      console.log("Error!");
    } else {
      res.render("updatecomprofile", { Comload: upload });
    }
  });
});
router.post("/signup", function (req, res) {
  companysignup.register(
    new companysignup({
      username: req.body.username,
      email: req.body.email,
      CompanyName: req.body.CompanyName,
      image: "no-profile-picture.jpg",
    }),
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        req.flash("error", "Username or Email had already used");
        return res.redirect("/company/signup");
      }
      passport.authenticate("companylocal")(req, res, function () {
        console.log(user);
        req.flash("success", "You Signup in successfully");
        res.redirect("/company/profile");
      });
    }
  );
});
router.post("/profile/:id/edit",parser.single("image"), function (
  req,
  res
) {
  if (req.file) {
    
    let Contactname = req.body.Contactname;
    let CompanyName = req.body.CompanyName;
    let BusinessTypes = req.body.BusinessTypes;
    let ContactSurname = req.body.ContactSurname;
    let ContactTelephoneNo = req.body.ContactTelephoneNo;
    let CompanyTelephoneNo = req.body.CompanyTelephoneNo;
    let Province = req.body.Province;
    let District = req.body.District;
    let SubDistrict = req.body.SubDistrict;
    let Address = req.body.Address;
    let Country = req.body.Country;
    let ZipCode = req.body.ZipCode;
    let image = req.file.filename;
    companysignup.updateMany(
      { _id: req.user._id },
      {
        $set: {
          Contactname: Contactname,
          image: image,
          CompanyName: CompanyName,
          BusinessTypes: BusinessTypes,
          ContactSurname: ContactSurname,
          ContactTelephoneNo: ContactTelephoneNo,
          CompanyTelephoneNo: CompanyTelephoneNo,
          Province: Province,
          District: District,
          SubDistrict: SubDistrict,
          Address: Address,
          Country: Country,
          ZipCode: ZipCode,
        },
      },
      function (error, idCard) {
        if (error) {
          console.log(error);
        } else {
          res.redirect("/company/profile");
        }
      }
    );
  }
  if (!req.file) {
    let Contactname = req.body.Contactname;
    let CompanyName = req.body.CompanyName;
    let BusinessTypes = req.body.BusinessTypes;
    let ContactSurname = req.body.ContactSurname;
    let ContactTelephoneNo = req.body.ContactTelephoneNo;
    let CompanyTelephoneNo = req.body.CompanyTelephoneNo;
    let Province = req.body.Province;
    let District = req.body.District;
    let SubDistrict = req.body.SubDistrict;
    let Address = req.body.Address;
    let Country = req.body.Country;
    let ZipCode = req.body.ZipCode;

    companysignup.updateMany(
      { _id: req.user._id },
      {
        $set: {
          Contactname: Contactname,
          CompanyName: CompanyName,
          BusinessTypes: BusinessTypes,
          ContactSurname: ContactSurname,
          ContactTelephoneNo: ContactTelephoneNo,
          CompanyTelephoneNo: CompanyTelephoneNo,
          Province: Province,
          District: District,
          SubDistrict: SubDistrict,
          Address: Address,
          Country: Country,
          ZipCode: ZipCode,
        },
      },
      function (error, idCard) {
        if (error) {
          console.log(error);
        } else {
          res.redirect("/company/profile");
        }
      }
    );
  }
});

module.exports = router;
