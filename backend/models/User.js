const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({ // create user schema
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator); // 2 users can't have the same email

module.exports = mongoose.model("User", userSchema); // export mongoose model as User