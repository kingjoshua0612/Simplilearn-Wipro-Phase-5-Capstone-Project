const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const User = require("../models/Users")
const path = require('path')

// Edit Profile
exports.updateUser = asyncHandler(async (req, res, next) => {
    console.log(req.body)
    User.findOneAndUpdate({"userName":req.body.userName},{$set:req.body},{multi: true })
    .then(user=>res.status(200).json({status:true,user}))
    .catch(err=>res.status(422).json({status:false,message:`There was an error! -> ${err}`}))
});
exports.getUserByUsername = asyncHandler(async(req,res,next)=>{
  let username = req.params.userName
  User.find({userName:username})
  .then(user=>res.status(200).json({status:true,user,message:"Found User"}))
  .catch(err=>res.status(422).json({status:false,message:`There was an error! => ${err}`}))
})

// Edit Profile
exports.updateUserById = asyncHandler(async (req, res, next) => {
    User.findOneAndUpdate({id: req.params.id}, { $set: req.body }, { new: true })
    .then((user) => 
      res.status(200).json({ user, message: "Success" })
    )
    .catch((err) =>
      res.status(400).json({ status: false, message: `userId ${String(req.params.id)} could not be inserted, Err ${err}`}));
});

exports.updatePassword = asyncHandler(async (req, res, next) => {
  let {userName, password} = req.body
  User.findOneAndUpdate({userName: req.params.id}, { $set: {password:password} }, { new: true })
  .then((user) => 
    res.status(200).json({ status:true,user, message: "Success! Password was changed" })
  )
  .catch((err) =>
    res.status(422).json({ status: false, message: `Error! Password couldn't be changed ==> ${err}`}));
});

exports.addFunds = asyncHandler(async (req,res,next)=>{
  console.log("You are in the addFunds!")
  let username = req.body['userName']
  let fundsAmnt = req.body['funds']
  User.findOneAndUpdate({userName:username},{$inc:{funds:fundsAmnt}},{new:true})
  .then(user=>res.status(200).json({status:true,message:"success",user}))
  .catch(err=>res.status(422).json({status:false,message:`There was an error ==> ${err}`}))
})