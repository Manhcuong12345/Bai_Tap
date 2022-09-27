const jwt = require("jsonwebtoken");
const _ = require("lodash");
const User = require("../models/User");
const {
  loginValidation,
  registerValidation,
} = require("../middleware/validationUser");

class Authscontroller {
  static async reg(req, res) {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //check if user is exist in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exist");

    const { firstname, password, email, lastname, username, phone, address } =
      req.body;
    const user = new User({
      firstname,
      password,
      email,
      lastname,
      username,
      phone,
      address,
      role: "admin",
    });
    await user.generatePassword();
    await user.save();
    if (!user) return res.status(400).send({ message: "Not save data" });
    res.send(_.pick(user, ["email", "username", "address", "_id"]));
  }

  static async login(req, res) {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ message: "Email is not found" });
    const isValid =
      (await user.login(req.body.password)) && user.role === "admin";
    if (!isValid)
      return res.status(400).send({ message: "Invalid username or password" });
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.TOKEN_SECRET
    );
    res
      .header("x-auth-token", token)
      .send({ _id: user._id, lastname: user.lastname });
  }

  // static async token(req, res) {
  //      res.send(req.user)
  // }

  static async deleteAdmin(req, res) {
    const admin = await User.findByIdAndDelete(req.params.id);
    if (!admin) return res.status(400).send({ message: "Do not delete Admin" });
    res.send(admin);
  }

  static async updateAdmin(req, res) {
    const admin = await User.findByIdAndUpdate(req.params.id, req.body);
    if (!admin) return res.status(400).send({ message: "Do not update" });
    res.send(admin);
  }

  static async getAll(req, res) {
    const admin = await User.find({});
    if (!admin)
      return res.status(400).send({ message: "Admin is not database" });
    res.send(admin);
  }
}

module.exports.Authscontroller = Authscontroller;
