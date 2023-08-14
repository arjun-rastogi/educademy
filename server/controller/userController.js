const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.status(500).json({ msg: "Email already used", status: false });
    }
    let hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      name,
      password: hashedPassword,
    });
    delete user.password;

    let token = jwt.sign({ id: user._id, name: name }, "your-secret-key", {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "User created.", token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to sign up." });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(500)
        .json({ msg: "Incorrect Name or Password", status: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(500)
        .json({ msg: "Incorrect Name or Password", status: false });
    }
    delete user.password;
    let token = jwt.sign({ id: user._id, name: user.name }, "your-secret-key", {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "User login", token: token });
  } catch (error) {
    next(error);
    res.status(500).json({ message: "Unable to sign in." });
  }
};
