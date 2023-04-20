const expressAsyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const Admin = require("../Models/AdminModel");

require("dotenv").config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password, phone, city, pic } = req.body;

  if (!name || !email || !password || !phone || !city) {
    res.status(400);
    throw new Error("Please fill in all the Fields");
  }
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let confirmationCode = "";
  for (let i = 0; i < 25; i++) {
    confirmationCode +=
      characters[Math.floor(Math.random() * characters.length)];
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password: bcrypt.hashSync(password, 8),
    phone,
    city,
    pic,
    confirmationCode,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      confirmationCode: user.confirmationCode,
    });
    let mailOptions = {
      from: process.env.MAIL_USERNAME,
      to: user.email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
      <h2>Hello ${user.name}</h2>
      <p>Thank you for signing up to Elixir. Please confirm your email by clicking on the following link</p>
      <a href=https://elixir.cyclic.app.com/auth/${user.confirmationCode}> Click here</a>
      </div>`,
    };
    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Email sent successfully");
      }
    });
    res.redirect("/login");
  } else {
    throw new Error("Failed to create user");
  }
});

const verifyUser = expressAsyncHandler(async (req, res) => {
  User.findOne({ confirmationCode: req.params.confirmationCode })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      user.status = "Active";
      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
      });
    })
    .catch((e) => console.log("error", e));
});

const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill in all the Fields");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    if (user.status != "Active") {
      res.status(401).send({
        message: "Pending Account. Please Verify Your Email!",
      });
    } else {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        status: "Active",
        token: generateToken(user._id),
      });
    }
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const registerAdmin = expressAsyncHandler(async (req, res) => {
  const { name, email, password, phone, title, location } = req.body;

  if (!name || !email || !password || !phone || !title || !location) {
    res.status(400);
    throw new Error("Please fill in all the Fields");
  }
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let confirmationCode = "";
  for (let i = 0; i < 25; i++) {
    confirmationCode +=
      characters[Math.floor(Math.random() * characters.length)];
  }
  const userExists = await Admin.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("AdminUser already exists");
  }
  const user = await Admin.create({
    name,
    email: email.toLowerCase(),
    isAdmin: true,
    phone,
    title,
    location,
    password: bcrypt.hashSync(password, 8),
    confirmationCode,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      title: user.title,
      phone: user.phone,
      location: user.location,
      email: user.email,
      password: user.password,
      confirmationCode: user.confirmationCode,
      isAdmin: user.isAdmin,
    });

    let mailOptions = {
      from: process.env.MAIL_USERNAME,
      to: user.email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
    <h2>Hello ${user.name}</h2>
    <p>Please confirm your Elixir staff email by clicking on the following link</p>
    <a href=https://elixiradmin.cyclic.app.com/auth/${user.confirmationCode}> Click here</a>
    </div>`,
    };
    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Email sent successfully");
      }
    });
    res.redirect("/");
  } else {
    throw new Error("Failed to create admin user");
  }
});
const userArr = [];
const verifyAdmin = expressAsyncHandler(async (req, res) => {
  Admin.findOne({ confirmationCode: req.params.confirmationCode })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      user.status = "Active";
      userArr.push(user);
      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
      });
    })
    .catch((e) => console.log("error", e));
});

const LoginAdmin = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill in all the Fields");
  }
  await Admin.findOne({ email: email.toLowerCase() })
    .then(async (user) => {
      if (await bcrypt.compare(password, user.password)) {
        if (user.status != "Active") {
          res.status(401).send({
            message: "Pending Account. Please Verify Your Email!",
          });
        } else {
          res.status(201).json({
            _id: user._id,
            email: user.email,
            name: user.name,
            token: generateToken(user._id),
          });
        }
      } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
      }
    })
    .catch((err) => console.log(err));
});

module.exports = {
  registerUser,
  verifyUser,
  authUser,
  registerAdmin,
  verifyAdmin,
  LoginAdmin,
  userArr,
};
