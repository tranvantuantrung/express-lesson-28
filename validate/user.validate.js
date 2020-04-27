const User = require("../models/user.model.js");

module.exports.create = async (req, res, next) => {
  let errors = [];

  if (!req.body.name) {
    errors.push("Name is required.");
  }

  if (req.body.name.split("").length > 30) {
    errors.push("Name must be less than 30 characters.");
  }

  if (!req.body.email) {
    errors.push("Email is required.");
  }

  let user = await User.findOne({ email: req.body.email });

  if (user) {
    errors.push("User already exists.");
  }

  if (!req.body.password) {
    errors.push("Password is required.");
  }

  if (errors.length) {
    res.render("users/index", {
      users: await User.find(),
      errors,
      values: req.body
    });

    return;
  }

  next();
};
