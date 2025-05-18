const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const {
  generateToken,
} = require("../utils/tokenGenerator");

exports.register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists", error: true });
    }
    const hashedPassword = bcryptjs.hashSync(password, 12);
    const newUser = new User({ email, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({
      message: "User registered successfully",
      error: false,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, error: true });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid Credentials", error: true });
    }
    const checkPassword = await bcryptjs.compareSync(password, user.password);
    if (!checkPassword) {
      return res
        .status(400)
        .json({ message: "Invalid Credentials", error: true });
    }

    const tokenDetails = generateToken(user);

    return res
      .cookie("token", tokenDetails.token, tokenDetails.cookieOptions)
      .status(200)
      .json({
        message: "Login Successfully",
        success: true,
        token: tokenDetails.token,
      });
  } catch (error) {
    res.status(500).json({ error: error.message, error: true });
  }
};


exports.isLoggedIn = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-__v -createdAt -updatedAt");
    if (!user) {
      return res.status(401).json({ message: "User not found", error: true });
    }
    return res.status(200).json({ message: "User is logged in", error: false });
  } catch (error) {
    return res.status(500).json({ message: error.message, error: true });
  }
}
