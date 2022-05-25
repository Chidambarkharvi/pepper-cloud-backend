const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  data:{type:Array},
});


const UserData = mongoose.model("USERDATA", userSchema);
module.exports = UserData;

