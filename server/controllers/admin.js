const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../models/admin");

exports.login = asyncHandler(async (req, res, next) => {
    console.log("here")
    console.log(req.body)
    const { adminID, password } = req.body;
  
    let [admin] = await Admin.find({adminID: adminID});

    console.log("Admin: ")
    console.log(admin)
  
    if (admin && admin.id) {
      if (
        admin.password === password
      ) {
        delete admin.password;
        res.status(200).json({ status: true, message: "Admin Welcome" });
      } else {
        res.status(200).json({ status: false, message: "Admin Password" });
      }
    } else {
      res.status(200).json({status: false, message: "Account does not exist with this Admin Account.",
      });
    }
});

exports.getAdmins = asyncHandler(async (req,res,next)=>{
  // console.log("in admin retrieve")
  // Admin.find({},(error,result)=>{
  //     if(!error){
  //         res.send(result)
  //     }else{
  //         res.send("Nothing")
  //     }
  // })

  Admin.find({})
  .then(admin => res.status(200).json({ status: true, admin }))
  .catch(err => res.status(422).json({ status: false, message: `There was an error in fecthign the data. Err: ${err}` }));

})

exports.postAdmin = asyncHandler(async (req,res,next)=>{
  let [check] = await Admin.insertMany(req.body);

  console.log(check)
  if (check){
    res.status(200).json({status: true, message: "Admin Added", admin: check})
  }else{
    res.status(422).json({status: false, message: `Error in Req, please check the input`})
  }
})