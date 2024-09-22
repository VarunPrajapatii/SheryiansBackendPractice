var express = require('express');
var router = express.Router();
const userModel = require("./users");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/create', async function(req, res) {
  let createduser = await userModel.create({
    username: "varunpjp",
    age: 24,
    name: "Varun",
  });  //this is asynchronous line means iske baad wala code baad mein chalega aur ye code pehle chalega which is a problem. so we use await
  res.send(createduser);
});

router.get("/allusers", async function(req, res) {
  let allusers = await userModel.find();
  res.send(allusers);
});

router.get("/delete", async function(req, res) {
  let deletedUser = await userModel.findOneAndDelete({
    username:"varunpjp"
  });
  res.send(deletedUser);
});

router.get("/ban", function(req,res) {
  req.session.ban = true;
  res.render("index");
});

router.get("/checkban", function(req, res) {
  if(req.session.ban == true) {
    res.send("you are banned..");
  } else {
    res.send("You are not banned");
  }
})

router.get("/removeban", function(req,res) {
  req.session.destroy(function(err) {
    if(err) throw err;
    res.send("ban removed..")
  })
});

router.get("/cookiedemo", function(req,res) {
  res.cookie("age", 24);
  res.render("index");
});

router.get("/cookieread", function(req, res) {
  console.log(req.cookie.age);
  res.send("check");
});

router.get("/cookiedelete", function(req, res) {
  res.clearCookie(age);
  res.send("Clear hogayi");
});

module.exports = router;
