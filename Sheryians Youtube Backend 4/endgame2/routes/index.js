var express = require('express');
var router = express.Router();

const userModel = require("./users");
const passport = require("passport");
const localStratergy = require("passport-local");

passport.use(new localStratergy(userModel.authenticate()));

router.get("/", function(req, res) {
  res.render("index");
});



// Flash-Message
// router.get('/', function(req, res) {
//   res.render('index');
// });

// router.get("/failed", function(req, res) {
//   req.flash("age", 24);
//   req.flash("name", "varun");
//   res.send("Bangaya");
// });

// router.get("/checkkaro", function(req, res) {
//   console.log(req.flash("age"), req.flash("name"));
//   res.send("check karlo backend ke terminal pe");
// });



// router.get("/create", async function(req, res) {
//   let userdata = await userModel.create({
//     username:"shreyash",
//     nickname: "motakahinka",
//     description: "a 24 year old guy whose selfish dumb and thinks hes intellegent but dumb for real",
//     categories: ["pubg", "ipl", "pharmacy"],
//   });
//   res.send(userdata);
//   // res.send("Hi");
// });

//case insensitive search
// router.get("/find", async function(req, res) {
//   var regex = new RegExp("^varun$", "i");
//   let user = await userModel.find({username: regex});
//   res.send(user);
// });


//find docs where an array field contains all the set of values
// router.get("/find", async function(req, res) {
//   let user = await userModel.find({categories: {$all: ["javascript", "java"]}});
//   res.send(user);
// });


//search for docs with a specific date range in a Mongoose
// router.get("/find", async function(req, res) {
//   var date1 = new Date("2024-04-01");
//   var date2 = new Date("2024-04-03");
//   let user = await userModel.find({datecreated: {$gte: date1, $lte: date2}});
//   res.send(user);
// });




//Filter documents based on the existence of a field in Mongoose
// router.get("/find", async function(req, res) {
//   let user = await userModel.find({categories: {$exists: true}});
//   res.send(user);
// });



//Filter documents based on a secific field's length in Mongoose
// router.get("/find", async function(req, res) {
//   let user = await userModel.find( {
//     $expr: {
//       $and: [
//         {$gte: [{$strLenCP: "$nickname"}, 0]},
//         {$lte: [{$strLenCP: "$nickname"}, 12]}
//       ]
//     }
//   });
//   res.send(user);
// });



// router.get("/allusers", async function(req, res) {
//   var allusers = await userModel.find();
//   res.send(allusers);
// });


router.get("/profile", isLoggedIn, function(req, res) {
  res.render("profile");
});



router.post("/register", function(req, res) {
  var userdata = new userModel({
    username: req.body.username,
    secret: req.body.secret,
  });

  userModel.register(userdata, req.body.password)
    .then(function(registereducer) {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/profile");
      })
    })
});


router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/",
}), function(req, res){});


router.get("/logout", function(req, res, next) {
  req.logout(function(err) {
    if(err) return next(err);
    res.redirect("/");
  });
});


function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};




module.exports = router;