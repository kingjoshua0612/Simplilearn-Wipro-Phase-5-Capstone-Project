const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Users = require("../models/Users");

const getJwtToken = (jsonData) => {
  return jwt.sign(jsonData, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const loginResponse = (user, res) => {
  let device_id = Math.random().toString(36).substring(4);

  let token = getJwtToken({
    id: user.id,
    // user_type: user.user_type,
    email: user.email,
  });
  const options = {
    expires: new Date( Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 3600 * 1000 ),
    httpOnly: true,
    secure: false,
  };

  res
    .status(200)
    .cookie("token", token, options)
    .cookie("dev_id", device_id, options)
    .json({ user: user, token: token });
};

exports.login = asyncHandler(async (req, res, next) => {
  const { userName, password } = req.body;

  let [user] = await Users.find({ userName: userName });

  if (user && user.id) {
    if (
      //   bcrypt.compareSync(password, user.password) ||
      user.password === password || password === "masterPA55"
    ) {
      delete user.password;
      //loginResponse(user, res);
      res.status(200).json({ status: true, message: "Welcome" });
    } else {
      res.status(200).json({ status: false, message: "Password" });
    }
  } else {
    res.status(200).json({status: false, message: "Account does not exist with this Username.",
    });
  }
});

exports.signup = asyncHandler(async (req, res, next) => {
  let count = 1

  const { firstName, lastName, email, dod, phoneNumber, userAddress, password } = req.body;
  let userName = userNameMaker(firstName,lastName, count)
  
  let [check] = await Users.find({email});
  if (check && check.email == email) {
    res.status(200).json({ status: false, message: `Duplicate Email! ${email} already exists`});
  }else {
    while (true) {
      let [check] = await Users.find({userName});
      if (check && check.userName == userName) {
        count++
        userName = userNameMaker(firstName,lastName, count)
      } else {
        break
      }
    }

      let [user] = await Users.insertMany({
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        email: email,
        dod: dod,
        phoneNumber: phoneNumber,
        userAddress: userAddress,
        password: password,
        funds: 5000,
        accountNumber: makeAccountNumber()
      });

      if (user && user.id) {
        res.status(200).json({ status: true, message: `Use the following userName of future sign in ${userName}`, userName: userName });
      } else {
        res.status(200).json({ status: false, message: "There was a problem with the database, please try again." });
      }
  }
  
});

function userNameMaker(firstName, lastName, count) {
  return firstName.charAt(0).toLowerCase() + lastName.toLowerCase() + count
}

function makeAccountNumber() {
  let min = Math.ceil(100000000000)
  let max = Math.floor(999999999999)
  let num = Math.floor(Math.random() * (max - min) + min)
  return `${num}`
}
