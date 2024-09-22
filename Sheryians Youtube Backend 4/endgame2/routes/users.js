const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/testingendgame2");

// const userSchema = mongoose.Schema({
//   username: String,
//   nickname: String,
//   description: String,
//   categories: {
//     type: Array,
//     default: [],
//   },
//   datecreated: {
//     type: Date,
//     default: Date.now(),
//   },
// });

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  secret: String
});

userSchema.plugin(plm);
console.log(module);


module.exports = mongoose.model("user", userSchema);